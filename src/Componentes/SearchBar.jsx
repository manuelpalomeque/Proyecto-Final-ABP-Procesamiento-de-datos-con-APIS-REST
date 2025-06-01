function SearchBar(props) {
  return (
    <div className=" body-font overflow-hidden ">
      <input
        type="text"
        placeholder="Buscar Producto"
        value={props.valorabuscar}
        onChange={(e) => props.setBusqueda(e.target.value)}
        className="px-5 py-2 rounded border border-gray-400"
      />
    </div>
  );
}

export default SearchBar;
