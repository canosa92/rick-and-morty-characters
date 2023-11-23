//creamos las constantes con los elementos del Html que vamos a necesitar
let listaPersonajes = document.getElementById('character-list')
const prePage = document.getElementById('prev-page');
const nextPage = document.getElementById('next-page');
 let paginaInicial = 'https://rickandmortyapi.com/api/character/?page=1'
let next
let prev
//creamos la función para mostrar el contenido de cada personaje en la página principal

const personajes = (page) =>{
  fetch(page)
  .then((response) => {
    if (!response.ok) {
        throw new Error('En estos momento no funcion');
      }
      return response.json();
    })
  .then((data) => {
    console.log(data)
    next= data.info.next
    prev= data.info.prev
    listaPersonajes.innerHTML=''

    data.results.forEach((personaje)=>{
        let templatePersoanjes =`
        <li>
        <div class="marco">
            <img src=${personaje.image}>
            <h4>Nombre:${personaje.name}</h4>
            <h4>Especie: ${personaje.species}</h4>
          
        </div>
    </li>`   
    listaPersonajes.innerHTML +=templatePersoanjes
    })
    })
}

nextPage.addEventListener('click',function(){
personajes(next);
}
);
prePage.addEventListener('click',function(){
personajes(prev);
}
);

personajes(paginaInicial)