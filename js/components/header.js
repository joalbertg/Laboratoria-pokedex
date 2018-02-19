// se encapsula la funcionalidad
const HEADER = ((window, document) => {
  const header = () => {
    const $header = $('<header class="flex-container"></header>');
    const $title = $('<h1>Pokédex</h1>');

    $header.append($title);

    return $header;
  };

  // se retorna lo necesario a publicar
  return { header: header };
})(window, document);
