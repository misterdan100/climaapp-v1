import { useState } from "react";
import useClima from "../hooks/useClima";

const Formulario = () => {
  const [alerta, setAlerta] = useState("");
  const { busqueda, datosBusqueda, consultarClima, countries, cities } =
    useClima();
  const { ciudad, pais } = busqueda;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(busqueda).includes("")) {
      setAlerta("Todos los campos son obligatorios");
      return;
    }

    consultarClima(busqueda);

    setAlerta("");
  };

  console.log(cities)

  return (
    <div className="contenedor">
      {alerta && <p>{alerta}</p>}
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="pais">Pais</label>
          <select name="pais" id="pais" onChange={datosBusqueda} value={pais}>
            <option value="">Seleccione un pais</option>
            {countries?.map((country) => (
              <option key={country.iso2} value={country.iso2}>
                {country.country}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label htmlFor="ciudad">Ciudad</label>
          {/* <input
            type="text"
            id="ciudad"
            name="ciudad"
            onChange={datosBusqueda}
            value={ciudad}
          /> */}

          <select name="ciudad" id="ciudad" onChange={datosBusqueda} value={ciudad}>
            <option value="">Seleccione una ciudad</option>
            {cities?.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <input type="submit" value="Consultar Clima" />
      </form>
    </div>
  );
};

export default Formulario;
