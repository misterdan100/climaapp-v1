import { createContext, useEffect, useState } from "react";
import axios from "axios";

const ClimaContext = createContext();

const ClimaProvider = ({ children }) => {
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);
  const [noResultado, setNoResultado] = useState("");
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([])

  const datosBusqueda = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  const consultarClima = async (datos) => {
    setCargando(true);
    setNoResultado(false);
    try {
      const { ciudad, pais } = datos;

      const appId = import.meta.env.VITE_API_KEY;

      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`;

      const { data } = await axios(url);
      const { lat, lon } = data[0];

      const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

      const { data: clima } = await axios(urlClima);
      setResultado(clima);
    } catch (error) {
      setNoResultado("No hay resultados!");
    } finally {
      setCargando(false);
    }
  };

  const getCities = async country => {


    const ApiUrlCities = `https://api.countrystatecity.in/v1/countries/${country}/cities`
    const options = {
      headers: {
        'X-CSCAPI-KEY': import.meta.env.VITE_COUNTRY_API
      }
    }

    if(country === '') return

    try {
      const responseCities = await axios(ApiUrlCities, options)

      setCities(responseCities.data)
    } catch(error) {
      console.log('DAN Error', error)
    }
  }

  useEffect(() => {
    getCities(busqueda.pais)
  }, [busqueda])


  //! country states cities api----------------
  const getApiInfo = async () => {

    const ApiUrl = 'https://api.countrystatecity.in/v1/countries'
    
    const options = {
      headers: {
        'X-CSCAPI-KEY': import.meta.env.VITE_COUNTRY_API
      }
    }
    try {
      const response = await axios(ApiUrl, options)
      setCountries(response.data)
    } catch(error) {
      console.log('DAN Error', error)
    }

  }

  useEffect(() => {
    getApiInfo()
  }, [])

  return (
    <ClimaContext.Provider
      value={{
        busqueda,
        setBusqueda,
        datosBusqueda,
        consultarClima,
        resultado,
        cargando,
        setCargando,
        noResultado,
        countries,
        cities
      }}
    >
      {children}
    </ClimaContext.Provider>
  );
};

export { ClimaProvider };

export default ClimaContext;
