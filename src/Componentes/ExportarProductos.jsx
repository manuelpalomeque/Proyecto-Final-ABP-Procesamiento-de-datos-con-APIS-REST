import React from "react";

const ExportarProductos = ({ format, setFormat, manejarExportacion }) => (
  <div className="mb-4 ml-35">

    <select 
    onChange={ (e) => setFormat(e.target.value)} value={format}
    className="bg-sky-500 hover:bg-sky-400 text-white py-2 px-4 rounded py-2 px-4 rounded border w-64"
    >
      <option value="">Seleccionar formato</option>
      <option value="json">JSON</option>
      <option value="csv">CSV</option>
    </select>
    <button 
    onClick={manejarExportacion}
    className="bg-sky-500 hover:bg-sky-400 text-white py-2 px-4 rounded"
    >Exportar archivo</button>
  </div>
);

export default ExportarProductos;