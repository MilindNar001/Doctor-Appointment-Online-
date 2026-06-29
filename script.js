-0

:root {
  --bg: #f4f8fb;
  --card: #ffffff;
  --primary: #0f766e;
  --primary-dark: #115e59;
  --accent: #dff7f4;
  --text: #102a43;
  --muted: #60758a;
  --border: #d8e5ee;
  --danger: #b42318;
  --success: #087443;
  --shadow: 0 18px 45px rgba(16, 42, 67, 0.12);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  color: var(--text);
  background: linear-gradient(135deg, #eef9f8 0%, var(--bg) 45%, #ffffff 100%);
  line-height: 1.6;
}

.site-header {
  padding: 24px min(5vw, 64px) 56px;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  max-width: 1120px;
  margin: 0 auto 64px;
}

.logo,
.nav-link {
  color: var(--text);
  text-decoration: none;
  font-weight: 700;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 1.2rem;
}

.logo-mark {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 12px;
  color: white;
  background: var(--primary);
  font-size: 1.6rem;
}

.nav-link:hover,
.nav-link:focus {
  color: var(--primary-dark);
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(280px, 0.8fr);
  gap: 32px;
  align-items: center;
  max-width: 1120px;
  margin: 0 auto;
}

.eyebrow,
.section-label {
  color: var(--primary-dark);
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.8rem;
}

h1,
h2,
p {
  margin-top: 0;
}

h1 {
  max-width: 760px;
  margin-bottom: 18px;
  font-size: clamp(2.4rem, 7vw, 5.25rem);
  line-height: 0.98;
}

h2 {
  margin-bottom: 18px;
  font-size: clamp(1.5rem, 3vw, 2rem);
}

.hero-text {
  max-width: 680px;
  color: var(--muted);
  font-size: 1.12rem;
}

.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 48px;
  padding: 12px 18px;
  border: 0;
  border-radius: 14px;
  font-weight: 800;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.button:hover,
.button:focus {
  transform: translateY(-2px);
}

.button-primary {
  color: #ffffff;
  background: var(--primary);
  box-shadow: 0 12px 22px rgba(15, 118, 110, 0.25);
}

.button-primary:hover,
.button-primary:focus {
  background: var(--primary-dark);
}

.button-secondary {
  width: 100%;
  margin-top: 12px;
  color: var(--primary-dark);
  background: var(--accent);
}

.hero-card,
.panel,
.notice {
  border: 1px solid var(--border);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: var(--shadow);
}

.hero-card {
  padding: 28px;
}

.hero-card ul,
.appointments-list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.hero-card li {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border);
}

.hero-card li:last-child {
  border-bottom: 0;
}

.hero-card span,
.form-group small,
.empty-state {
  color: var(--muted);
}

main {
  max-width: 1120px;
  padding: 0 min(5vw, 64px) 56px;
  margin: 0 auto;
}

.notice {
  padding: 22px 26px;
  margin-bottom: 28px;
  background: #fff8e6;
}

.notice p {
  margin-bottom: 0;
}

.booking-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 0.8fr);
  gap: 28px;
}

.panel {
  padding: 28px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 800;
}

input,
select {
  width: 100%;
  min-height: 50px;
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: 14px;
  color: var(--text);
  background: #ffffff;
  font: inherit;
}

input:focus,
select:focus {
  outline: 3px solid rgba(15, 118, 110, 0.2);
  border-color: var(--primary);
}

.form-message {
  min-height: 28px;
  margin-bottom: 14px;
  font-weight: 800;
}

.form-message.success {
  color: var(--success);
}

.form-message.error {
  color: var(--danger);
}

.appointments-list li {
  padding: 16px;
  margin-bottom: 14px;
  border: 1px solid var(--border);
  border-radius: 18px;
  background: #f8fcff;
}

.appointments-list strong {
  display: block;
  font-size: 1.05rem;
}

.appointments-list span {
  display: block;
  color: var(--muted);
}

.site-footer {
  padding: 28px min(5vw, 64px);
  color: var(--muted);
  text-align: center;
}

@media (max-width: 800px) {
  .hero,
  .booking-grid {
    grid-template-columns: 1fr;
  }

  .nav {
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 40px;
  }

  .site-header {
    padding-bottom: 36px;
  }
}
