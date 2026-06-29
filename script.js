 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/script.js b/script.js
new file mode 100644
index 0000000000000000000000000000000000000000..c6c6a3134acd4a4e59032334fd1aae4009f9da32
--- /dev/null
+++ b/script.js
@@ -0,0 +1,241 @@
+const slotSelect = document.querySelector('#appointmentSlot');
+const slotGrid = document.querySelector('#slotGrid');
+const form = document.querySelector('#appointmentForm');
+const formMessage = document.querySelector('#formMessage');
+const appointmentsList = document.querySelector('#appointmentsList');
+const emptyState = document.querySelector('#emptyState');
+const clearBookingsButton = document.querySelector('#clearBookings');
+const year = document.querySelector('#year');
+const toast = document.querySelector('#toast');
+const availableCount = document.querySelector('#availableCount');
+const bookedCount = document.querySelector('#bookedCount');
+const availabilityBar = document.querySelector('#availabilityBar');
+const filterButtons = document.querySelectorAll('.filter-chip');
+const revealElements = document.querySelectorAll('.reveal');
+
+const STORAGE_KEY = 'careSlotAppointments';
+const slotRanges = [
+  { period: 'morning', startHour: 10, endHour: 14 },
+  { period: 'evening', startHour: 15, endHour: 19 }
+];
+
+let activeFilter = 'all';
+let toastTimer;
+
+function padTime(value) {
+  return String(value).padStart(2, '0');
+}
+
+function formatSlot(totalMinutes) {
+  const hours24 = Math.floor(totalMinutes / 60);
+  const minutes = totalMinutes % 60;
+  const suffix = hours24 >= 12 ? 'PM' : 'AM';
+  const hours12 = hours24 % 12 || 12;
+  return `${hours12}:${padTime(minutes)} ${suffix}`;
+}
+
+function buildSlots() {
+  return slotRanges.flatMap((range) => {
+    const slots = [];
+    const startMinutes = range.startHour * 60;
+    const endMinutes = range.endHour * 60;
+
+    for (let minutes = startMinutes; minutes < endMinutes; minutes += 15) {
+      slots.push({ label: formatSlot(minutes), period: range.period, minutes });
+    }
+
+    return slots;
+  });
+}
+
+function getAppointments() {
+  try {
+    const appointments = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
+    return Array.isArray(appointments) ? appointments : [];
+  } catch (error) {
+    return [];
+  }
+}
+
+function saveAppointments(appointments) {
+  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
+}
+
+function sanitizeText(value) {
+  const element = document.createElement('div');
+  element.textContent = String(value).trim();
+  return element.textContent;
+}
+
+function setMessage(message, type) {
+  formMessage.textContent = message;
+  formMessage.className = `form-message ${type}`;
+}
+
+function showToast(message) {
+  toast.textContent = message;
+  toast.classList.add('show');
+  clearTimeout(toastTimer);
+  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
+}
+
+function updateStats() {
+  const totalSlots = buildSlots().length;
+  const bookedTotal = getAppointments().length;
+  const availableTotal = totalSlots - bookedTotal;
+  const availablePercent = Math.max(0, (availableTotal / totalSlots) * 100);
+
+  availableCount.textContent = availableTotal;
+  bookedCount.textContent = bookedTotal;
+  availabilityBar.style.width = `${availablePercent}%`;
+}
+
+function renderSlots() {
+  const appointments = getAppointments();
+  const bookedSlots = appointments.map((appointment) => appointment.slot);
+  const currentValue = slotSelect.value;
+
+  slotSelect.innerHTML = '<option value="">Choose a 15-minute slot</option>';
+  slotGrid.innerHTML = '';
+
+  buildSlots().forEach((slot) => {
+    const isBooked = bookedSlots.includes(slot.label);
+    const isHidden = activeFilter !== 'all' && activeFilter !== slot.period;
+
+    const option = document.createElement('option');
+    option.value = slot.label;
+    option.textContent = isBooked ? `${slot.label} - already booked` : slot.label;
+    option.disabled = isBooked;
+    slotSelect.appendChild(option);
+
+    const button = document.createElement('button');
+    button.type = 'button';
+    button.className = `slot-chip${isBooked ? ' booked' : ''}${isHidden ? ' hidden' : ''}`;
+    button.dataset.slot = slot.label;
+    button.dataset.period = slot.period;
+    button.textContent = slot.label;
+    button.disabled = isBooked;
+    button.setAttribute('aria-label', isBooked ? `${slot.label} already booked` : `Select ${slot.label}`);
+
+    if (slot.label === currentValue) {
+      button.classList.add('selected');
+    }
+
+    slotGrid.appendChild(button);
+  });
+
+  if (currentValue && !bookedSlots.includes(currentValue)) {
+    slotSelect.value = currentValue;
+  }
+
+  updateStats();
+}
+
+function renderAppointments() {
+  const appointments = getAppointments();
+  appointmentsList.innerHTML = '';
+  emptyState.hidden = appointments.length > 0;
+
+  appointments.forEach((appointment) => {
+    const item = document.createElement('li');
+    const name = document.createElement('strong');
+    const slot = document.createElement('span');
+    const contact = document.createElement('span');
+
+    name.textContent = appointment.name;
+    slot.textContent = `Slot: ${appointment.slot}`;
+    contact.textContent = `Contact: ${appointment.contact}`;
+
+    item.append(name, slot, contact);
+    appointmentsList.appendChild(item);
+  });
+}
+
+function refreshPageData() {
+  renderSlots();
+  renderAppointments();
+}
+
+function selectSlot(slot) {
+  slotSelect.value = slot;
+  document.querySelectorAll('.slot-chip').forEach((chip) => {
+    chip.classList.toggle('selected', chip.dataset.slot === slot);
+  });
+  setMessage(`Selected ${slot}. Add patient details to confirm.`, 'success');
+}
+
+slotGrid.addEventListener('click', (event) => {
+  const button = event.target.closest('.slot-chip:not(.booked)');
+  if (!button) return;
+  selectSlot(button.dataset.slot);
+  document.querySelector('#appointment').scrollIntoView({ behavior: 'smooth', block: 'start' });
+});
+
+slotSelect.addEventListener('change', () => {
+  if (slotSelect.value) {
+    selectSlot(slotSelect.value);
+  }
+});
+
+filterButtons.forEach((button) => {
+  button.addEventListener('click', () => {
+    activeFilter = button.dataset.filter;
+    filterButtons.forEach((filterButton) => filterButton.classList.toggle('active', filterButton === button));
+    renderSlots();
+  });
+});
+
+form.addEventListener('submit', (event) => {
+  event.preventDefault();
+
+  if (!form.checkValidity()) {
+    setMessage('Please complete all fields with valid information.', 'error');
+    form.reportValidity();
+    return;
+  }
+
+  const formData = new FormData(form);
+  const name = sanitizeText(formData.get('patientName'));
+  const contact = sanitizeText(formData.get('contactNumber'));
+  const slot = sanitizeText(formData.get('appointmentSlot'));
+  const appointments = getAppointments();
+  const allSlots = buildSlots();
+
+  if (appointments.some((appointment) => appointment.slot === slot)) {
+    setMessage('That slot was already booked in this browser. Please choose another slot.', 'error');
+    refreshPageData();
+    return;
+  }
+
+  appointments.push({ name, contact, slot });
+  appointments.sort((first, second) => {
+    return allSlots.findIndex((item) => item.label === first.slot) - allSlots.findIndex((item) => item.label === second.slot);
+  });
+
+  saveAppointments(appointments);
+  form.reset();
+  setMessage('Appointment confirmed in this browser demo.', 'success');
+  showToast(`Appointment booked for ${name} at ${slot}.`);
+  refreshPageData();
+});
+
+clearBookingsButton.addEventListener('click', () => {
+  localStorage.removeItem(STORAGE_KEY);
+  form.reset();
+  setMessage('Local demo bookings were cleared.', 'success');
+  showToast('All browser-only demo bookings were cleared.');
+  refreshPageData();
+});
+
+const observer = new IntersectionObserver((entries) => {
+  entries.forEach((entry) => {
+    if (entry.isIntersecting) {
+      entry.target.classList.add('visible');
+      observer.unobserve(entry.target);
+    }
+  });
+}, { threshold: 0.15 });
+
+revealElements.forEach((element) => observer.observe(element));
+year.textContent = new Date().getFullYear();
+refreshPageData();
 
EOF
)
