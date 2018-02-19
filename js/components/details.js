const DETAILS = ((window, document) => {
  const structureDetail = pokemon => {
    let ability = '', types = '', damages = '';

    const $divContainer = $('<div class="container flex-container"></div>');
    const $modalContent = $('<div class="modal-content flex-container"></div>');
    const $modalHeader = $(`<div class="modal-header"><h2>${pokemon.name}</h2></div>`);
    const $closeModal = $('<a href="#" class="close-modal">&times;</a>');
    const $divData = $('<div class="data flex-container"></div>');
    const $divPokemon = $(`<div class="poke-image">${STATE.pokemonComponent}</div>`);
    const $divDetails = $('<div class="poke-details"></div>');
    const $description = $(`<p>${pokemon.description}</p>`);
    const $features = $('<div class ="features flex-container"></div>');
    const $height = $(`<div><h5>Altura:</h5><p>${pokemon.height / 10} m</p></div>`);
    const $weight = $(`<div><h5>Peso:</h5><p>${pokemon.weight / 10} kg</p></div>`);
    const $genero = $('<div><h5>Sexo:</h5><p>female</p></div>');
    const $category = $(`<div><h5>Categoria:</h5><p>${pokemon.category}</p></div>`);

    pokemon.abilities.forEach(element => ability += `<p>${element}</p>`);

    const $divAbility = $(`<div><h5>Habilidad:</h5>${ability}</div>`);

    pokemon.type.forEach(element => types += `<span class="${element}">${element}</span>`);

    const $type = $(`<div class ="$type"><h4>Tipo:</h4>${types}</div>`);

    pokemon.weakness.forEach(element => damages += `<span class="${element}">${element}</span>`);

    const $weaknessTitle = $('<h4>Debilidad:</h4>');
    const $weakness = $(`<div class ="weakness flex-container">${damages}</div>`);

    return {
      $closeModal,
      $modalHeader,
      $description,
      $height,
      $weight,
      $genero,
      $category,
      $divAbility,
      $features,
      $type,
      $weaknessTitle,
      $weakness,
      $divPokemon,
      $divDetails,
      $divData,
      $modalContent,
      $divContainer
    };
  };

  const buildDetail = structure => {
    // asignacion formato destructuring    
    const {
      $closeModal,
      $modalHeader,
      $description,
      $height,
      $weight,
      $genero,
      $category,
      $divAbility,
      $features,
      $type,
      $weaknessTitle,
      $weakness,
      $divPokemon,
      $divDetails,
      $divData,
      $modalContent,
      $divContainer
    } = structure;

    $modalHeader.append($closeModal);
    $modalContent.append($modalHeader);
    $divDetails.append($description);
    $features.append($height);
    $features.append($weight);
    $features.append($genero);
    $features.append($category);
    $features.append($divAbility);
    $divDetails.append($features);
    $divDetails.append($type);
    $divDetails.append($weaknessTitle);
    $divDetails.append($weakness);
    $divData.append($divPokemon);
    $divData.append($divDetails);
    $modalContent.append($divData);
    $divContainer.append($modalContent);

    $closeModal.on('click', () => {
      $('.modal-pokemon').hide();
    });

    return $divContainer;
  };

  const pokemonDetails = detail => {
    return buildDetail(structureDetail(detail));
  };

  return { pokemonDetails: pokemonDetails };
})(window, document);
