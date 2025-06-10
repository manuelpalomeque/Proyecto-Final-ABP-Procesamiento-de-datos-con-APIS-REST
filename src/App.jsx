import './App.css';
//Importar componentes propios
import Content from "./Componentes/Content";
import ProductList from "./Componentes/ProductList";
import StatsPanel from "./Componentes/StatsPanel";
import SearchBar from "./Componentes/SearchBar";
import SeleccionCategoria from "./Componentes/SeleccionCategoria";
import EstadisticasPorCategoria from "./Componentes/EstadisticasPorCategoria";
import Ordenamiento from "./Componentes/Ordenamiento";
import ExportarProductos from "./Componentes/ExportarProductos";
import GraficoBarras from './Componentes/GraficoBarras';  
import GraficoPie from './Componentes/GraficoPie'; 
import GraficoLinea from './Componentes/GraficoLinea';  
import Paginacion from "./Componentes/Paginacion";
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
  const [format, setFormat] = useState('') // para capturar el formato en el que se quiere exportar productos filtrados
  const [page, setPage] =useState(1) // Permite lleva run registro de la pagina en la que estoy

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

  // Paginación local para traer 100 productos, pero mostrar solo  10 productos por pagina
  const limite = 10

  const inicio = (page - 1) * limite;
  const fin = inicio + limite;
  const productosPaginados = productosFiltrados.slice(inicio, fin);

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

  // I- Cantidad de productos con stock > 50 , rating > 4.5:
  const productosStockYRating = productosFiltrados.filter((producto) => producto.stock > 50 && producto.rating > 4.5).length;
  
  // Estadisticas por categoria: cantidad, precio promedio, precio mínimo, precio máximo y promedio de rating --------------------------------
  const estadisticasPorCategoria = productosFiltrados.reduce((acumulador, producto) => {
    // Si la categoría no existe, la inicializa
    if (!acumulador[producto.category]) {
      acumulador[producto.category] = {
        cantidad: 0,
        sumaPrecios: 0,
        precioMin: producto.price,
        precioMax: producto.price,
        sumaRating: 0
      };
    }
    // Suma cantidad y precios
    acumulador[producto.category].cantidad += 1;
    acumulador[producto.category].sumaPrecios += producto.price;

    // Calcula precio mínimo y máximo
    if (producto.price < acumulador[producto.category].precioMin) {
      acumulador[producto.category].precioMin = producto.price;
    }
    if (producto.price > acumulador[producto.category].precioMax) {
      acumulador[producto.category].precioMax = producto.price;
    }

    // Suma ratings
    acumulador[producto.category].sumaRating += producto.rating;

    // Calcula promedios en cada iteración
    const cat = acumulador[producto.category];
    cat.precioPromedio = (cat.sumaPrecios / cat.cantidad).toFixed(2);
    cat.ratingPromedio = (cat.sumaRating / cat.cantidad).toFixed(2);

    return acumulador;
  }, {});

  // Para visualizaciones: ----------------------------------------------------------------------------------------------------

  // para grafico de barras
    const cantidadPorCategoria = Object.keys(estadisticasPorCategoria).reduce((acum, categoria) => {
    acum[categoria] = estadisticasPorCategoria[categoria].cantidad;
    return acum;
  }, {});

  //Stock por producto:
  const stockPorProducto = productosFiltrados.map(p => ({producto: p.title, stock: p.stock }));


  // Funcion auxiliar para el modo oscuro:--------------------------------------------------------------------------------------
  const toggleModoOscuro = ()=>{
      setModoOscuro(!modoOscuro);
      contenedorRef.current.classList.toggle("dark-mode");
  };


  // Exportacion de datos: -------------------------------------------------------------------------------------------------------
  const manejarExportacion = () => {
    
    if (format === "json") {
      // Crear un blob JSON
      const blob = new Blob([JSON.stringify(productosFiltrados, null, 2)], { type: "application/json" });
      // Generar una URL temporal 
      const url = URL.createObjectURL(blob);
      // Llamar a la función para descargar el archivo
      triggerDownload(url, "productos.json");
    
    } else if (format === "csv") {
      // Si no hay productos no hace nada
      if (productosFiltrados.length === 0) return;
      // Configurar encabezados
      const encabezados = Object.keys(productosFiltrados[0]).join(",");
      // Generar las filas
      const filas = productosFiltrados.map(p =>
        Object.values(p).map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")
      );
      // Unir encabezados y filas con saltos de línea
      const csv = [encabezados, ...filas].join("\r\n");

      // Crear un blob  CSV
      const blob = new Blob([csv], { type: "text/csv" });
      // Genera una URL temporal para el blob
      const url = URL.createObjectURL(blob);
      // Llama a la función para descargar el archivo con nombre productos.csv
      triggerDownload(url, "productos.csv");
    }
  };
  
  const triggerDownload = (url, filename) => {
    // crear el hipervinculo
    const link = document.createElement("a");
    // setear el href
    link.href = url;
    // al mismo enlace descargar el archivo
    link.download = filename;
    // agregar anchor tad en el DOM
    document.body.appendChild(link);
    // simular el clic en el elemento
    link.click();
    //eliminar el elemento anchor
    document.body.removeChild(link);

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
            <div>
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
            productosStockYRating = {productosStockYRating}
            />

            {/* Estadisticas por categoria */}
            <EstadisticasPorCategoria
            estadisticasPorCategoria ={estadisticasPorCategoria}
            />

            <div>
              <br/>
                <h1 className="text-3xl text-blue-600 font-bold">Visualizaciones:</h1>
              <br/>
            </div>
            {/* Visualizaciones */}
            <GraficoBarras 
            cantidadPorCategoria={
              Object.entries(cantidadPorCategoria).map(([categoria, cantidad]) => ({
                categoria,
                cantidad
              }))
            } />
             
            <GraficoPie
            stockPorProducto ={stockPorProducto}
            />

            <GraficoLinea/>

            </div>
            
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

      {/*  Exportar productos */}
      <ExportarProductos
        format={format}
        setFormat={setFormat}
        manejarExportacion={manejarExportacion}
      />

      {/* Paginacion */}
        <Paginacion
          page={page}
          setPage={setPage}
          total={productosFiltrados.length}
          limite={limite}
        />

      {/* Productos Filtrados*/}
      <div>
        {productosPaginados.map((p)=>(
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