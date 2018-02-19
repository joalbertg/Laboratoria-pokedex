// se encapsula la funcionalidad de la petición ajax
const AJAX = ((window, document) => {
  const XHR = new XMLHttpRequest();

  // para poder tener una referencia del cb y uri
  let callback = null;
  let uri = null;
  
  const successCallback = () => {
    if (XHR.status === 200)
      callback(XHR.response, null);
  };

  const errorCallback = () => {
    // se llama al cb con el response: null y error: new Error()
    callback(null, new Error(`Error loading JSON from ${uri} (${XHR.status})`));
  };

  const getJSON = (url, cb) => {
    // se pasa la referencia de cb y url
    callback = cb;
    uri = url;

    XHR.open('GET', url);
    XHR.onload = successCallback;
    XHR.onerror = errorCallback;
    XHR.responseType = 'json';

    XHR.send();
  };

  return { getJSON: getJSON };
})(window, document);
