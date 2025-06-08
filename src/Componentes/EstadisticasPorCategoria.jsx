function EstadisticasPorCategoria(props) {
  return (
    <section className="text-gray-600 body-font">
      <div>
        <br/>
        <h1 className="text-3xl text-blue-600 font-bold">Estadísticas por Categorías</h1>
        <br/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Recorre el objeto estadisticasPorCategoria y genera una tarjeta por cada categoría */}
        {Object.entries(props.estadisticasPorCategoria).map(([categoria, estadisticas]) => (
          <div
            key={categoria}
            className="border-2 border-gray-800 px-4 py-6 rounded-lg items-center bg-white shadow flex flex-col"
          >
            <h3 className="text-lg font-semibold mb-2 text-blue-700">{categoria}</h3>
            <ul className="text-base text-gray-700">
              <li><strong>Cantidad de productos:</strong> {estadisticas.cantidad}</li>
              <li><strong>Precio promedio:</strong> ${estadisticas.precioPromedio}</li>
              <li><strong>Precio mínimo:</strong> ${estadisticas.precioMin}</li>
              <li><strong>Precio máximo:</strong> ${estadisticas.precioMax}</li>
              <li><strong>Rating promedio:</strong> {estadisticas.ratingPromedio}</li>
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EstadisticasPorCategoria;