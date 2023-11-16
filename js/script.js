//creamos las constantes con los elementos del Html que vamos a necesitar


const prePage = document.getElementById('pre-page');
const nextPage = document.getElementById('next-page');
const page = 1
//creamos la función para mostrar el contenido de cada personaje en la página principal
let url = `https://rickandmortyapi.com/api/character/?page=${page}`

fetch(`${url}`)
.then((response) => {
    if (!response.ok) {
        throw new Error('En estos momento no funcion');
      }
      return response.json();
    })
  .then((data) => {
    console.log(data)
    const listaPersonajes = document.getElementById('character-list')

    data.results.forEach((persona)=>{
        let templatePersoanjes =`
        <li>
            <img src=${persona.image}>
            <h4>Nombre: ${persona.name}</h4>
            <h4>Especie: ${persona.species}</h4>
    </li>`   
    listaPersonajes.innerHTML +=templatePersoanjes
    })
    })
  