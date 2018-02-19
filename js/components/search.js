const SEARCH = ((window, document) => {
  const defineStructureItem = pokemon => {
    // si el formato es: 0001 -> 0[001], si es: 000721 -> 000[721]
    const idPokemonImg = ('000' + pokemon.entry_number).slice(-3);
    const urlPokemon = STATE.proxy + pokemon.pokemon_species.url;
    const idPokemon = pokemon.entry_number + '/';

    const $divPokemon = $('<div class="pokemon-container"></div>');
    const $figurePokemon = $('<figure class="pokemon-image"></figure>');
    const $imgPokemon = $(`<img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${idPokemonImg}.png" alt="">`);
    const $divBase = $('<div class="base"></div>');
    const $pokeball = $('<img class="icon" src="assets/icon/pokeball_gray.png" alt="$pokeball">');
    const $heartIcon = $('<img class="icon" src="assets/icon/valentines-heart.png" alt="heart icon">');
    const $dataIcon = $('<img class="icon" src="assets/icon/data.png" alt="data icon">');
    const $namePokemon = $(`<div class="pokes">${pokemon.pokemon_species.name}</div>`);

    return {
      idPokemonImg,
      urlPokemon,
      idPokemon,
      $divPokemon,
      $figurePokemon,
      $imgPokemon,
      $divBase,
      $pokeball,
      $heartIcon,
      $dataIcon,
      $namePokemon
    };
  };

  const renderModal = modal => {
    let nameType = [], damages = [];

    // vaciamos el contenido del modal
    modal.empty();
    // recorremos los tipos del poquemon
    STATE.pokemonSelected.arrTypes.forEach(elem => {
      // filtramos en: es
      nameType.push(FILTER.filterLanguage(elem.names)[0].name);
      // agrega damage al array
      elem.damage_relations.double_damage_from.forEach(element => {
        if (damages.indexOf(element.name) === -1) {
          damages.push(element.name);
        }
      });
    });

    // se crea un objeto que se pasara al componente modal
    const objPokemonDetails = {
      name: FILTER.filterLanguage(STATE.pokemonSpecie.names)[0].name,
      description: FILTER.filterLanguage(STATE.pokemonSpecie.flavor_text_entries)[0].flavor_text,
      category: FILTER.filterLanguage(STATE.pokemonSpecie.genera)[0].genus,
      abilities: STATE.pokemonSelected.abilities.map(element => element.ability.name),
      height: STATE.pokemonSelected.height,
      weight: STATE.pokemonSelected.weight,
      type: nameType,
      weakness: damages
    };
  
    modal.append(DETAILS.pokemonDetails(objPokemonDetails));
    modal.show();
  };

  const buildItem = structure => {
    // asignacion formato destructuring
    const { idPokemonImg, urlPokemon, idPokemon, $divPokemon, $figurePokemon, $imgPokemon, $divBase, $pokeball, $heartIcon, $dataIcon, $namePokemon } = structure;

    $figurePokemon.append($imgPokemon);
    $divBase.append($pokeball);
    $divBase.append($heartIcon);
    $divBase.append($dataIcon);
    $figurePokemon.append($divBase);
    $divPokemon.append($figurePokemon);
    $divPokemon.append($namePokemon);

    $divPokemon.on('click', (event) => {
      STATE.pokemonComponent = $figurePokemon[0].outerHTML;
      event.stopPropagation();

      $.getJSON(urlPokemon, response => {
        STATE.pokemonSpecie = response;

        $.getJSON(STATE.proxy + 'https://pokeapi.co/api/v2/pokemon/' + idPokemon, json => {
          STATE.pokemonSelected = json;

          STATE.pokemonSelected.arrTypes = [];
          STATE.pokemonSelected.types.forEach(elem => {
            $.ajax({
              url: elem.type.url,
              dataType: 'json',
              async: false,
              success: function (data) {
                STATE.pokemonSelected.arrTypes.push(data);
              }
            });
          });

          const modalPokemon = $('#modal-pokemon');
          renderModal(modalPokemon);
        });
      });
    });
    return $divPokemon;
  };

  const pokemonItem = pokemon => {
    return buildItem(defineStructureItem(pokemon));
  };

  const render = ($grid, inputValue) => {
    // se vacia el grid
    $grid.empty();
    // filtramos los pokemons segun input
    const filteredPokemons = FILTER.filterByPokemon(STATE.pokemon, inputValue);

    // recorremos todo el array filtrado
    filteredPokemons.forEach(pokemon => {
      // por cada pokemon, creamos el item a mostrar
      $grid.append(pokemonItem(pokemon));
    });
  };

  const defineStructure = () => {
    const $section = $('<section class="search-pokemon"></section>');
    const $formSearch = $('<form class="form-control"></form>');
    const $divSearch = $('<div class="search"></div>');
    const $input = $('<input type="search">');
    const $spanAZ = $('<span class="a-z">A-Z</span>');
    const $iconSearch = $('<a class="fa fa-search" href="#" aria-hidden="true"></a>');
    const $grid = $('<div class="grid-pokemon flex-container"></div>');

    // retorno en formato destructuring
    return {
      $section,
      $formSearch,
      $divSearch,
      $input,
      $spanAZ,
      $iconSearch,
      $grid
    };
  };

  const eventKeyup = ($grid, $input) => {
    $input.on('keyup', () => {
      const inputValue = $input.val();
      render($grid, inputValue);
    });
  };

  const buildSearch = structure => {
    // asignacion formato destructuring
    const { $section, $formSearch, $divSearch, $input, $spanAZ, $iconSearch, $grid } = structure;

    $divSearch.append($input);
    $divSearch.append($spanAZ);
    $divSearch.append($iconSearch);
    $formSearch.append($divSearch);
    $formSearch.append($grid);
    $section.append($formSearch);

    eventKeyup($grid, $input);

    render($grid, '');

    return $section;
  };

  const pokemonSearch = () => {
    return buildSearch(defineStructure());
  };

  return { pokemonSearch: pokemonSearch };
})(window, document);
