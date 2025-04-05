import React, { useState } from "react";
import logo from "../../assets/logo_gc.png";
import "./registroVehiculo.css";

const AgregarRegistro = () => {
  const [paso, setPaso] = useState(1);
  const [formData, setFormData] = useState({
    //  Paso 1: Detalles del Registro
    folio: "",
    fecha: "",
    hora: "",
    recogido: "",
    autoridad: "",
    motivo: "",
    tipoAuto: "",
    kilometraje: "",
    maniobras: [],
    marca: "",
    modelo: "",
    color: "",
    placas: "",
    estado: "",
    infraccion: "",
    unidad: "",
    agente: "",
    no_serie: "",
    llaves: "",
    placas_frente: "",
    placas_atras: "",
  });
  const [total, setTotal] = useState(0);

  //    DATOS DE PRUEBA -> Estos datos vendrán de la BD
  const preciosManiobras = {
    arrastre: 500,
    carga: 700,
    descarga: 600,
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleManiobraChange = (e) => {
    const nuevaManiobra = e.target.value;
    if (!nuevaManiobra) return;

    if (!formData.maniobras.some((m) => m.nombre === nuevaManiobra)) {
      const nuevaLista = [
        ...formData.maniobras,
        { nombre: nuevaManiobra, precio: preciosManiobras[nuevaManiobra] },
      ];
      setFormData({ ...formData, maniobras: nuevaLista });

      const nuevoTotal = nuevaLista.reduce((acc, m) => acc + m.precio, 0);
      setTotal(nuevoTotal);
    }
  };

  const handleRemoveManiobra = (nombre) => {
    const nuevaLista = formData.maniobras.filter((m) => m.nombre !== nombre);
    setFormData({ ...formData, maniobras: nuevaLista });

    const nuevoTotal = nuevaLista.reduce((acc, m) => acc + m.precio, 0);
    setTotal(nuevoTotal);
  };

  const siguientePaso = () => setPaso((prev) => Math.min(prev + 1, 4));
  const pasoAnterior = () => setPaso((prev) => Math.max(prev - 1, 1));

  return (
    <div className="form-container">
      {paso === 1 && (
        <div className="step">
          <label className="label-paso">Detalles del Registro</label>
          <label>Folio</label>
          <input
            type="text"
            name="folio"
            value={formData.folio}
            onChange={handleChange}
          />

          <label>Fecha</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
          />

          <label>Hora</label>
          <input
            type="time"
            name="hora"
            value={formData.hora}
            onChange={handleChange}
          />

          <label>Recogido en:</label>
          <input
            type="text"
            name="recogido"
            value={formData.recogido}
            onChange={handleChange}
          />

          <label>Autoridad</label>
          <input
            type="text"
            name="autoridad"
            value={formData.autoridad}
            onChange={handleChange}
          />

          <label>Motivo</label>
          <input
            type="text"
            name="motivo"
            value={formData.motivo}
            onChange={handleChange}
          />

          <label>Tipo de auto</label>
          <select
            name="tipoAuto"
            value={formData.tipoAuto}
            onChange={handleChange}
          >
            <option value="">Selecciona tipo</option>
            <option value="vehiculo">Vehículo</option>
            <option value="trailer">Tráiler</option>
          </select>

          {formData.tipoAuto && (
            <>
              <label>Selecciona maniobra</label>
              <select onChange={handleManiobraChange}>
                <option value="">Selecciona maniobra</option>
                <option value="arrastre">Arrastre ($500)</option>
                <option value="carga">Carga ($700)</option>
                <option value="descarga">Descarga ($600)</option>
              </select>

              {formData.maniobras.length > 0 && (
                <table className="maniobras-table">
                  <thead>
                    <tr>
                      <th>Maniobra</th>
                      <th>Precio</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.maniobras.map((m, index) => (
                      <tr key={index}>
                        <td>{m.nombre}</td>
                        <td>${m.precio}</td>
                        <td>
                          <button
                            className="icon-delete"
                            onClick={() => handleRemoveManiobra(m.nombre)}
                          >
                            ❌
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <br />
              <strong>Total maniobras: ${total}</strong>
              <br />
            </>
          )}

          <label>Kilometraje</label>
          <input
            type="number"
            name="kilometraje"
            value={formData.kilometraje}
            onChange={handleChange}
          />
        </div>
      )}

      {paso === 2 && (
        <div className="step">
          <label className="label-paso">Datos del Vehículo:</label>
          <label htmlFor="marca">Marca</label>
          <input
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
          />
          <label htmlFor="modelo">Modelo</label>
          <input
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
          />
          <label htmlFor="color">Color</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
          <label htmlFor="placas">Placas</label>
          <input
            type="text"
            name="placas"
            value={formData.placas}
            onChange={handleChange}
          />
          <label htmlFor="estado">Estado</label>
          <input
            type="text"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
          />
          <label htmlFor="infraccion">Infracción</label>
          <input
            type="text"
            name="infraccion"
            value={formData.infraccion}
            onChange={handleChange}
          />
          <label htmlFor="unidad">Unidad</label>
          <input
            type="text"
            name="unidad"
            value={formData.unidad}
            onChange={handleChange}
          />
          <label htmlFor="agente">Agente</label>
          <input
            type="text"
            name="agente"
            value={formData.agente}
            onChange={handleChange}
          />
        </div>
      )}

      {paso === 3 && (
        <div className="step">
          <label className="label-paso">Interior del Vehículo:</label>
          {[
            "Tablero",
            "Volante",
            "Radio/Estéreo",
            "Eq. Sonido",
            "Reloj",
            "Encendedor",
            "Espejos",
            "Asientos",
            "Tapetes",
            "Bocinas",
            "Luces",
            "Aire Acond.",
            "Compresor",
            "Antena",
            "Copas Rines",
          ].map((item) => (
            <div key={item} className="radio-group">
              <span>{item}</span>
              <label>
                <input
                  type="radio"
                  name={item}
                  value="bien"
                  checked={formData[item] === "bien"}
                  onChange={handleRadioChange}
                />{" "}
                Bien
              </label>
              <label>
                <input
                  type="radio"
                  name={item}
                  value="mal"
                  checked={formData[item] === "mal"}
                  onChange={handleRadioChange}
                />{" "}
                Mal
              </label>
              <label>
                <input
                  type="radio"
                  name={item}
                  value="no"
                  checked={formData[item] === "no"}
                  onChange={handleRadioChange}
                />{" "}
                No
              </label>
            </div>
          ))}

          <label className="label-paso">Motor:</label>
          {["Gasolina", "Motor", "Ventilador", "Numerador", "Bomba/Agua"].map(
            (item) => (
              <div key={item} className="radio-group">
                <span>{item}</span>
                <label>
                  <input
                    type="radio"
                    name={item}
                    value="E"
                    checked={formData[item] === "E"}
                    onChange={handleRadioChange}
                  />{" "}
                  E
                </label>
                <label>
                  <input
                    type="radio"
                    name={item}
                    value="M"
                    checked={formData[item] === "M"}
                    onChange={handleRadioChange}
                  />{" "}
                  M
                </label>
                <label>
                  <input
                    type="radio"
                    name={item}
                    value="F"
                    checked={formData[item] === "F"}
                    onChange={handleRadioChange}
                  />{" "}
                  F
                </label>
                <label className="label-paso">Eléctrico:</label>
                {[
                  "Bateria",
                  "Carburador",
                  "Filtro de aire",
                  "Distribuidor",
                  "Bujias Cables",
                  "Bobina",
                ].map((item) => (
                  <div key={item} className="radio-group">
                    <span>{item}</span>
                    <label>
                      <input
                        type="radio"
                        name={item}
                        value="bien_si"
                        checked={formData[item] === "bien_si"}
                        onChange={handleRadioChange}
                      />{" "}
                      Bien Sí
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={item}
                        value="mal_no"
                        checked={formData[item] === "mal_no"}
                        onChange={handleRadioChange}
                      />{" "}
                      Mal No
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={item}
                        value="no"
                        checked={formData[item] === "no"}
                        onChange={handleRadioChange}
                      />{" "}
                      No
                    </label>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      )}

      {paso === 4 && (
        <div className="step">
          <label className="label-paso">Detalles Finales:</label>
          <input
            type="text"
            name="detallesFinales"
            value={formData.detallesFinales}
            onChange={handleChange}
            placeholder="Ej. Observaciones finales"
          />
        </div>
      )}

      <div className="button-container">
        {paso > 1 && (
          <button className="btn btn-back" onClick={pasoAnterior}>
            Atrás
          </button>
        )}
        {paso < 4 ? (
          <button className="btn btn-next" onClick={siguientePaso}>
            Siguiente
          </button>
        ) : (
          <button
            className="btn btn-save"
            onClick={() => console.log("Datos guardados:", formData)}
          >
            Guardar Registro
          </button>
        )}
      </div>
    </div>
  );
};

export default AgregarRegistro;
