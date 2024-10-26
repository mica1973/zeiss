import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* Create unordered list */
  const ul = document.createElement('ul');
  ul.classList.add('cards'); // Fügt der Liste die "cards"-Klasse hinzu
  
  /* Process each row in the block */
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('cards-card'); // Fügt jedem Element die "cards-card"-Klasse hinzu

    // Process each cell in the row
    [...row.children].forEach((cell) => {
      if (cell.querySelector('picture')) {
        // Bildcontainer
        cell.className = 'cards-card-image';
      } else {
        // Textcontainer
        cell.className = 'cards-card-body';
        // Textstruktur erstellen
        const name = cell.querySelector('h3');
        if (name) name.classList.add('cards-card-name');

        const position = cell.querySelector('p.position');
        if (position) position.classList.add('position');

        const contact = cell.querySelectorAll('a');
        contact.forEach((link) => link.classList.add('contact'));

        const role = cell.querySelector('p.role');
        if (role) role.classList.add('role');

        const description = cell.querySelector('p.description');
        if (description) description.classList.add('description');
      }
      li.append(cell);
    });

    ul.append(li);
  });

  // Optimierte Bilder ersetzen
  ul.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])
    );
  });

  // Clear existing content and append the new structure
  block.textContent = '';
  block.append(ul);
}
