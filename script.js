const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

const applyTheme = (mode) => {
  root.dataset.theme = mode;
  if (themeToggle) {
    themeToggle.textContent = mode === 'dark' ? 'Light' : 'Dark';
  }
};

const storedTheme = localStorage.getItem('theme');
const defaultTheme = storedTheme || 'dark';
applyTheme(defaultTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  });
}

menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach((item) => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

const sections = document.querySelectorAll('main section');
const options = { threshold: 0.35 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href='#${id}']`);
    if (link) {
      if (entry.isIntersecting) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
}, options);

sections.forEach((section) => observer.observe(section));
