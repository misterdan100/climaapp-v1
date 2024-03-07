import useClima from "../hooks/useClima";

const Formulario = () => {
  const {
    busqueda,
    datosBusqueda,
    consultarClima,
    countries,
    cities,
    alerta,
    setAlerta,
  } = useClima();
  const { ciudad, pais } = busqueda;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(busqueda).includes("")) {
      setAlerta("Verifique que los datos sean correctos");
      return;
    }

    consultarClima(busqueda);
    setAlerta("");
  };

  return (
    <div className="contenedor">
      {alerta && <p>{alerta}</p>}
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="pais">Pais</label>
          <input
            type="text"
            list="pais"
            name="pais"
            placeholder="Seleccione un pais"
            onChange={datosBusqueda}
          />
          <datalist
            name="pais"
            id="pais"
            value={pais}
          >
            {countries?.map((country) => (
              <option
                key={country.iso2}
                name={country.iso2}
                value={country.name}
              >
                {country.name}
              </option>
            ))}
          </datalist>
        </div>

        <div className="campo">
          <label htmlFor="ciudad">Ciudad</label>
          <input
            type="text"
            placeholder="Seleccione una ciudad"
            list="ciudad"
            onChange={datosBusqueda}
          />
          <datalist name="ciudad" id="ciudad" value={ciudad}>
            {cities?.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </datalist>
        </div>

        <input type="submit" value="Consultar Clima" />
      </form>
    </div>
  );
};

export default Formulario;
