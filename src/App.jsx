import './App.css';
//Importar componentes propios
import Content from "./Componentes/Content";
import ProductList from "./Componentes/ProductList";
import StatsPanel from "./Componentes/StatsPanel";
import SearchBar from "./Componentes/SearchBar";
import SeleccionCategoria from "./Componentes/SeleccionCategoria";
import Ordenamiento from "./Componentes/Ordenamiento";
import axios from "axios";
import {useEffect, useState, useRef } from "react";


function App() {
  
  // Estados: ----------------------------------------------------------------------------------------------------------
  const [products, setProducts] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrar, setMostrar] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [mostrarCategorias, setMostrarCategorias] = useState(false); // Estado para mostrar/ocultar el menú de categorías
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(""); // Categoría actualmente seleccionada
  const [ordenarPor, setOrdenarPor] = useState(""); // "precio" o "rating"
  const [ordenAscendente, setOrdenAscendente] = useState(true); // true: ascendente, false: descendente


  //Referencias:
  const contenedorRef = useRef(null);

  // Extraer lista de categorias de productos de la API ------------------------------------------------------------------
  useEffect(() => {
    axios.get("https://dummyjson.com/products/category-list").then((res) =>{
      setCategorias(res.data)
    })
  }, []);

  
  // Extraer productos de la API: ------------------------------------------------------------------------------------------
  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=100").then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  // Filtrar por búsqueda y categoría 
  let productosFiltrados = products
    .filter((p) => p.title.toLowerCase().includes(busqueda.toLowerCase()))
    .filter((p) => !categoriaSeleccionada || p.category === categoriaSeleccionada);

    // Ordenar productos filtrados
  if (ordenarPor) {
    productosFiltrados = [...productosFiltrados].sort((a, b) => {
      if (ordenarPor === "precio") {
        return ordenAscendente ? a.price - b.price : b.price - a.price;
      }
      if (ordenarPor === "rating") {
        return ordenAscendente ? a.rating - b.rating : b.rating - a.rating;
      }
      return 0;
    });
  }

  // Estadisticas:    --------------------------------------------------------------------------------------------------------
  // A - Productos totales:
  const productosTotales = productosFiltrados.length;
  
  // B- Precio total de la sumatoria de productos:
  const precioTotal = productosFiltrados.reduce((acum, producto) => acum + producto.price, 0).toFixed(2);
  
  // C- Precio maximo:
  const precioMax= productosFiltrados.length > 0 ? Math.max(...productosFiltrados.map((producto) => producto.price)) : 0;
  const productoMax = productosFiltrados.find((producto) => producto.price === precioMax);
  const tituloMax = productoMax ? productoMax.title : "";

  // D- Precio minimo:
  const precioMin = productosFiltrados.length > 0 ? Math.min(...productosFiltrados.map((producto) => producto.price)) : 0;
  const productoMin = productosFiltrados.find((producto) => producto.price === precioMin);
  const tituloMin = productoMin ? productoMin.title : "";

  // E- Productos con titulos de mas de 20 caracteres:
  const productosTitulo20 = productosFiltrados.filter((producto) => producto.title.length > 20).length;

  // F- Promedio de Descuentos:
  const descuentoTotal = productosFiltrados.reduce((acum, producto) => acum + producto.discountPercentage, 0).toFixed(2);
  const promedioDescuentos = productosFiltrados.length > 0 ? descuentoTotal/productosTotales: 0;
  
  // G- Promedio de Precios:
  const promedioPrecios = productosFiltrados.length > 0 ? precioTotal/productosTotales : 0;
  
  // H- Stock total disponible:
  const stockTotal = productosFiltrados.reduce((acum, producto) => acum + producto.stock, 0);

  // Funcion auxiliar para el modo oscuro:--------------------------------------------------------------------------------------
  const toggleModoOscuro = ()=>{
      setModoOscuro(!modoOscuro);
      contenedorRef.current.classList.toggle("dark-mode");
  };

  return (
    <div ref={contenedorRef}>

      <Content />

      <div className="mb-4 ml-35">
        {/* Modo oscuro */}
        <button onClick={toggleModoOscuro} className="bg-sky-500 hover:bg-sky-400 text-white py-2 px-4 rounded ">Modo {modoOscuro ? "Claro" : "Oscuro"}</button>
      </div>

      <div className="mb-4 ml-35">
        {/* Boton para mostrar las estadistícas */}
        <button onClick={()=> setMostrar(!mostrar)} className="bg-sky-500 hover:bg-sky-400 text-white py-2 px-4 rounded">
           {mostrar ? 'Ocultar Estadísticas' : 'Mostrar Estadísticas'}
        </button>

        { mostrar && 
          (
            <StatsPanel 
            cantProductos = {productosTotales}
            precioTotalProductos = {precioTotal}
            precioMax = {precioMax}
            tituloMaxPrecio = {tituloMax}
            precioMin = {precioMin}
            tituloMinPrecio ={tituloMin}
            promPrecios = {promedioPrecios.toFixed(2)}
            promDescuentos = {promedioDescuentos.toFixed(2)}
            stock = {stockTotal}
            cantProductosTitulo20 = {productosTitulo20}
            />
          )
        }

      </div>

      {/* Barra de búsqueda*/}
  
      <div  className="mb-4 ml-35">
        <SearchBar 
          valorabuscar = {busqueda}
          setBusqueda={setBusqueda} 
    
        /> 
      </div>

      {/* Botón para selecionar categorías */}
      <SeleccionCategoria
        categorias={categorias}
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
        mostrarCategorias={mostrarCategorias}
        setMostrarCategorias={setMostrarCategorias}
      />

      {/*  Ordenar por precio y rating */}
      <Ordenamiento
        ordenarPor={ordenarPor}
        setOrdenarPor={setOrdenarPor}
        ordenAscendente={ordenAscendente}
        setOrdenAscendente={setOrdenAscendente}
      />
          
      {/* Productos */}
      <div>
        {productosFiltrados.map((p)=>(
          <ProductList 
          titulo= {p.title} 
          precio = {p.price} 
          imagen= {p.images} 
          descripcion= {p.description} 
          categoria ={p.category} 
          stock ={p.stock} 
          alto={p.dimensions.height}
          ancho={p.dimensions.width}
          rating={p.rating}
          />
          ))}

          {/* Renderizacion condicional: */}
          {productosFiltrados.length === 0 && <p>  No se encontraron productos</p>}

      </div>
      
      
    </div>
  )
}

export default App;