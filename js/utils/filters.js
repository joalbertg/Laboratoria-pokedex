const FILTER = ((window, document) => {
  const filterByPokemon = (pokemons, name) => {
    return pokemons.filter(pokemon => pokemon.pokemon_species.name.indexOf(name.toLowerCase()) !== -1);
  };

  const filterLanguage = array => {
    return array.filter(element => element.language.name === 'es');
  };

  return {
    filterByPokemon: filterByPokemon,
    filterLanguage: filterLanguage
  };
})(window, document);
