function Ordenamiento({ ordenarPor, setOrdenarPor, setOrdenAscendente, ordenAscendente }) {
  return (
    
    <div className="mb-4 ml-35 flex gap-2">
        {/* criterio de ordenamiento */}
        <select
          value={ordenarPor}
          onChange={e => setOrdenarPor(e.target.value)}
          className="bg-sky-500 hover:bg-sky-400 text-white py-2 px-4 rounded border"
        >
          <option value="">Ordenar por</option>
          <option value="precio">Precio</option>
          <option value="rating">Rating</option>
        </select>

        {/* Boton para cambiar entre ascendente y descendente */}
        <button
          onClick={() => setOrdenAscendente(!ordenAscendente)}
          className="bg-sky-500 hover:bg-sky-400 text-white py-2 px-4 rounded"
        >
          {ordenAscendente ? "Ascendente" : "Descendente"}
        </button>
      </div>

  );
}

export default Ordenamiento;