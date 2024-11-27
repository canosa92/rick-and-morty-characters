let listaPersonajes = document.getElementById('character-list');
const prePage = document.getElementById('prev-page');
const nextPage = document.getElementById('next-page');
const searchInput = document.getElementById('search');
const speciesFilter = document.getElementById('species-filter');
const pageInfo = document.getElementById('page-info');

// URL base
let paginaInicial = 'https://rickandmortyapi.com/api/character/?page=1';
let next, prev, currentPage = 1;

const mostrarPersonajes = (page, nameFilter = '', speciesFilterValue = '') => {
  fetch(`${page}&name=${nameFilter}&species=${speciesFilterValue}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo obtener los personajes.');
      }
      return response.json();
    })
    .then(data => {
      next = data.info.next;
      prev = data.info.prev;
      listaPersonajes.innerHTML = '';
      pageInfo.textContent = `Page ${currentPage}`;
      console.log(data)

      // Mostrar personajes
      data.results.forEach(personaje => {
        let personajeHTML = `
          <li class="personaje" data-id="${personaje.id}">
            <div class="marco">
              <img src="${personaje.image}" alt="${personaje.name}">
              <h4><b>Nombre: </b> ${personaje.name}</h4>
              <h4><b>Especie: </b> ${personaje.species}</h4>
              <h4><b>Status: </b>${personaje.status}</h4>
            </div>
          </li>
        `;
        listaPersonajes.innerHTML += personajeHTML;
      });
    })
    .catch(error => {
      console.error(error);
      alert('Hubo un error al cargar los personajes. Intenta nuevamente.');
    });
};

// Función de búsqueda por nombre
searchInput.addEventListener('input', () => {
  const nameFilter = searchInput.value;
  mostrarPersonajes(paginaInicial, nameFilter);
});

// Función de filtro por especie
speciesFilter.addEventListener('change', () => {
  const speciesFilterValue = speciesFilter.value;
  mostrarPersonajes(paginaInicial, '', speciesFilterValue);
});

// Función de paginación
nextPage.addEventListener('click', () => {
  if (next) {
    currentPage++;
    mostrarPersonajes(next);
  }
});

prePage.addEventListener('click', () => {
  if (prev) {
    currentPage--;
    mostrarPersonajes(prev);
  }
});

// Cargar los personajes al iniciar
mostrarPersonajes(paginaInicial);
