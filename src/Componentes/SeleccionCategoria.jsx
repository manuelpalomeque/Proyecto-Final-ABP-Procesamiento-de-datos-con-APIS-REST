function SeleccionCategoria({ categorias, categoriaSeleccionada, setCategoriaSeleccionada }) {
  return (
    <div className="mb-4 ml-35">

      {/* Desplegable de categorías */}
      <select
        value={categoriaSeleccionada} // Valor actual seleccionado
        onChange={e => setCategoriaSeleccionada(e.target.value)} // Actualiza la categoría seleccionada al cambiar
        className="bg-sky-500 hover:bg-sky-400 text-white py-2 px-4 rounded py-2 px-4 rounded border w-64"
      >
        
        {/* Opción para mostrar todas las categorías */}
        <option value="">Todas las categorías</option>
        {categorias.map((cat, idx) => (
          <option key={idx} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SeleccionCategoria;