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
    console.log(busqueda)
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

  const getCountries = async () => {
    const url = "https://countriesnow.space/api/v0.1/countries";

    try {
      const response = await axios(url);
      // console.log(response.data.data)
      setCountries(response.data.data);
    } catch (error) {
      console.log("Error en getCountries........", error);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  const getCities = async country => {
    const citiesArray = countries.filter(actual => actual.iso2 === country)
    setCities(citiesArray[0].cities)
    // console.log('cities >>>>>>>>>>>', country)
    console.log('cities >>>>>>>>>>>', citiesArray[0].cities)
  }

  useEffect(() => {
    console.log('buscando ......', busqueda.pais)
    getCities(busqueda.pais)
  }, [busqueda])

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
