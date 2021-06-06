import { useMemo, useEffect, useState } from "react";

// Hook para acceder a la API
//
// @param {String} url La URL a la que acceder
// @param {String} token El token de autenticacion si estuviera presente
// @param {Object} fetchParams Un objeto para pasar a fetch con configuración extra
const useApi = (url, token = "", initialParams = {}, performOnMount = true) => {
  // Estado de carga.
  // Lo asignamos a true ya que empezaremos a cargar
  // directamente.
  const [loading, setLoading] = useState(performOnMount);
  // Almacenamos los datos de la petición
  const [data, setData] = useState(null);
  // Posible error
  const [error, setError] = useState(null);
  // Almacenamos los parametros
  const [fetchParams, setFetchParams] = useState(initialParams);
  // Permite que la llamada se haga mas tarde
  const [performRequest, setPerformRequest] = useState(performOnMount);

  // Actualiza los parametros
  const updateParams = (newParams) => {
    setFetchParams(newParams);
  };

  // En el caso en el que la llamada se haga más tarde,
  // se debe de utilizar este método
  const perform = () => {
    setPerformRequest(true);
  };

  // Creamos el objeto de configuración de Fetch
  const config = useMemo(() => {
    const initialConfig = {
      method: "GET",
      // Sobreescribimos los valores por defecto con el operador ...
      ...fetchParams,
    };

    // Comprobamos el token
    if (token && token != "") {
      if (initialConfig.headers == null) {
        initialConfig.headers = {};
      }

      initialConfig.headers["api-token"] = token;
    }

    return initialConfig;
  }, [url, token, fetchParams]);

  // useEffect que llamará al servidor
  useEffect(() => {
    if (performRequest) {
      if (!loading) {
        setLoading(true);
      }

      // Limpiamos los errores
      setError("");

      // Realizamos la llamada al servidor
      fetch(url, config)
        .then((res) => res.json())
        .then((json) => {
          if (json.error != null) {
            setError(json.error);
          } else {
            setData(json);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [url, config, performRequest]);

  return {
    loading,
    data,
    error,
    updateParams,
    perform,
  };
};

export default useApi;
