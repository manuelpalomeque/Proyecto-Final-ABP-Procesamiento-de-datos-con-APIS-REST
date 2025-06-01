function StatsPanel(props) {
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-1 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="text-3xl text-blue-600 font-bold">
            Estádisticas
          </h1>
        </div>

        <div className="flex flex-wrap -m-4 text-center">

          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-800 px-4 py-6 rounded-lg">
            
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 mb-3 inline-block text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                >
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M8 10h8M8 14h6" />
            </svg>
              <h2 className="title-font font-medium text-3xl text-white">{props.cantProductos}</h2>
              <p className="leading-relaxed">Cantidad total de Productos</p>
            </div>
          </div>

          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-800 px-4 py-6 rounded-lg">
            
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-3 inline-block text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="2" y="7" width="20" height="10" rx="2" />
                <circle cx="12" cy="12" r="3" />
                <path d="M6 10h.01M18 14h.01" />
                </svg>
              <h2 className="title-font font-medium text-3xl text-white">${props.precioTotalProductos}</h2>
              <p className="leading-relaxed">Precio total de los productos</p>
            </div>
          </div>

          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-800 px-4 py-6 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 mb-3 inline-block text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              <h2 className="title-font font-medium text-3xl text-white">${props.precioMax}</h2>
              <h6 className="text-white">{props.tituloMaxPrecio}</h6>
              <p className="leading-relaxed">Producto mas caro</p>
            </div>
          </div>

          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-800 px-4 py-6 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 mb-3 inline-block text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              <h2 className="title-font font-medium text-3xl text-white">${props.precioMin}</h2>
              <h6 className="text-white">{props.tituloMinPrecio}</h6>
              <p className="leading-relaxed">Producto mas barato</p>
            </div>
          </div>

          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-800 px-4 py-6 rounded-lg">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-blue-400 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <h2 className="title-font font-medium text-3xl text-white">{props.cantProductosTitulo20}</h2>
              <p className="leading-relaxed">Productos con titulo de + 20 caracteres</p>
            </div>
          </div>

          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-800 px-4 py-6 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 mb-3 inline-block text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <polyline points="3 17 7 13 11 17 15 7 21 17" />
                <circle cx="7" cy="13" r="1.5" />
                <circle cx="11" cy="17" r="1.5" />
                <circle cx="15" cy="7" r="1.5" />
              </svg>
              <h2 className="title-font font-medium text-3xl text-white">${props.promDescuentos}</h2>
              <p className="leading-relaxed">Promedio de Descuentos</p>
            </div>
          </div>

          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-800 px-4 py-6 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 mb-3 inline-block text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <rect x="4" y="10" width="3" height="7" rx="1" />
                <rect x="10.5" y="6" width="3" height="11" rx="1" />
                <rect x="17" y="13" width="3" height="4" rx="1" />
              </svg>
              <h2 className="title-font font-medium text-3xl text-white">${props.promPrecios}</h2>
              <p className="leading-relaxed">Promedio de precios</p>
            </div>
          </div>

          

          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-800 px-4 py-6 rounded-lg">
              <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 mb-3 inline-block text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="3" y="13" width="7" height="7" rx="1" />
              <rect x="14" y="13" width="7" height="7" rx="1" />
              <rect x="8.5" y="4" width="7" height="7" rx="1" />
            </svg>
              <h2 className="title-font font-medium text-3xl text-white">{props.stock}</h2>
              <p className="leading-relaxed">Stock Total disponible</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default StatsPanel;