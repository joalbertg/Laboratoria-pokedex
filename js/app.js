const STATE = {
  pokemon: null,
  pokemonSelected: null,
  pokemonSpacie: null,
  pokemonComponent: null,
  proxy: 'https://cors-anywhere.herokuapp.com/',
  language: 'es'
};

const render = $root => {
  const $WRAPPER = $('<div class="wrapper"></div>');

  // vaciamos el contenedor principal
  $root.empty();
  // cargamos el componente de cabecera
  $WRAPPER.append(HEADER.header());
  // cargamos el componente de busqueda
  $WRAPPER.append(SEARCH.pokemonSearch());
  // desplegamos en el componente principal
  $root.append($WRAPPER);
};

// funcion autoejecutable en jQuery
$(() => {
  // https://pokeapi.co/api/v2/pokedex/1/ version conocida
  const URLAPI = STATE.proxy + 'https://pokeapi.co/api/v2/pokedex/1/';

  AJAX.getJSON(URLAPI, (json, error) => {
    if (error) return console.log(error.message);

    // referencia al contenedor principal
    const $root = $('#root');

    // se guardan lor pokemones
    STATE.pokemon = json.pokemon_entries;

    // se pintan los componentes
    render($root);
  });
});
