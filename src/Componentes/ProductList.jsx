function ProductList(props) {
  return (
    <section >
  <div className="container px-5 py -1 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">{props.categoria}</h2>
        <h1 className="0 text-3xl title-font font-medium mb-4">{props.titulo}</h1>
        <div className="flex mb-4">
          <a className="flex-grow text-blue-400 border-b-2 border-blue-500 py-2 text-lg px-1">Descripción</a>
        </div>
        <p className="leading-relaxed mb-4">
        {props.descripcion}
        </p>
        <div className="flex border-t border-gray-800 py-2">
          <span className="text-gray-500">Ancho</span>
          <span className="ml-auto">{props.ancho}</span>
        </div>
        <div className="flex border-t border-gray-800 py-2">
          <span className="text-gray-500">Alto</span>
          <span className="ml-auto 0">{props.alto}</span>
        </div>
        <div className="flex border-t border-gray-800 py-2">
          <span className="text-gray-500">Rating</span>
          <span className="ml-auto 0">{props.rating}</span>
        </div>
        <div className="flex border-t border-b mb-6 border-gray-800 py-2">
          <span className="text-gray-500">Cantidad</span>
          <span className="ml-auto 0">{props.stock}</span>
        </div>
        <div className="flex">
          <span className="title-font font-medium text-2xl 0">${props.precio}</span>
        </div>
      </div>
      <img alt="Imagen del producto" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={props.imagen} />
    </div>
  </div>
</section>
);
}

export default ProductList;