const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const dialog = document.querySelector('#interest-dialog');
const dialogPlan = document.querySelector('#dialog-plan');

document.querySelectorAll('.interest-trigger').forEach((button) => {
  button.addEventListener('click', () => {
    const plan = button.dataset.plan;
    dialogPlan.textContent = plan === 'Lista geral'
      ? 'Você demonstrou interesse na abertura do The Cycle Club.'
      : `Seu interesse: plano ${plan}.`;
    dialog.showModal();
  });
});

document.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
document.querySelector('.dialog-ok')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
