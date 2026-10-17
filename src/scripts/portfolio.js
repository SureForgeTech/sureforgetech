import { products } from "../data/portfolio.js";
const grid = document.querySelector('#product-grid');
const dialog = document.querySelector('#product-dialog');
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  const group = button.dataset.filter;
  document.querySelectorAll('.filter').forEach(filter => { const active = filter === button; filter.classList.toggle('active', active); filter.setAttribute('aria-pressed', String(active)); });
  let count = 0;
  document.querySelectorAll('.product-card').forEach(card => { card.hidden = group !== 'all' && card.dataset.group !== group; if (!card.hidden) count++; });
  document.querySelector('#result-count').textContent = `${count} product${count === 1 ? '' : 's'}`;
}));

document.querySelector('main').addEventListener('click', event => {
  const button = event.target.closest('[data-product]');
  if (!button) return;
  const product = products.find(item => item.id === button.dataset.product);
  if (!product) return;
  dialog.querySelector('#detail-title').textContent = product.name;
  dialog.querySelector('.detail-kind').textContent = product.kind;
  dialog.querySelector('.detail-icon').style.setProperty('--icon-x', product.icon);
  dialog.querySelector('.detail-status').textContent = product.status;
  dialog.querySelector('.detail-description').textContent = product.description;
  dialog.querySelector('.detail-platform').textContent = product.platform;
  dialog.querySelector('.detail-availability').textContent = product.availability;
  dialog.querySelector('.detail-note').textContent = product.note;
  dialog.querySelector('.detail-docs').href = `https://sureforgetech.com/docs/${product.docs}/`;
  dialog.querySelector('.detail-page').href = `https://sureforgetech.com/products/${product.id}/`;
  dialog.showModal();
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });

