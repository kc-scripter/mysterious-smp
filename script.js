const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-nav');
const toast = document.querySelector('.toast');
let toastTimer;

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  mobileMenu.hidden = !open;
});

mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileMenu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}));

document.querySelectorAll('.copy-ip').forEach(button => button.addEventListener('click', async () => {
  const value = button.dataset.copy;
  try {
    await navigator.clipboard.writeText(value);
    toast.textContent = 'IP copiado! Nos vemos no servidor.';
  } catch {
    const field = document.createElement('textarea');
    field.value = value;
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.append(field);
    field.select();
    const copied = document.execCommand('copy');
    field.remove();
    toast.textContent = copied ? 'IP copiado! Nos vemos no servidor.' : `Copie o IP: ${value}`;
  }
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3500);
}));
