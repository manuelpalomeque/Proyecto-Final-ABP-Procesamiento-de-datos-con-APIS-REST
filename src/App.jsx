import './App.css';
import Content from "./Componentes/Content";
import ProductList from "./Componentes/ProductList";
import StatsPanel from "./Componentes/StatsPanel";
import axios from "axios";
import {useEffect, useState } from "react";

function App() {
  
  // Estados:
  const [products, setProducts] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // Extraer datos de la API:
  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=5").then((res) =>{
      setProducts(res.data.products)
    })
  }, []);

  // Filtrar los productos:
  const productosFiltrados = products.filter((p)=> p.title.toLowerCase().includes(busqueda.toLowerCase()));

  // Estadisticas:
  // A - Productos totales:
  const productosTotales = productosFiltrados.length;
  
  // B- Precio total de la sumatoria de productos:
  const precioTotal = productosFiltrados.reduce((acum, producto) => acum + producto.price, 0);
  
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
  const descuentoTotal = productosFiltrados.reduce((acum, producto) => acum + producto.discountPercentage, 0);
  const promedioDescuentos = productosFiltrados.length > 0 ? descuentoTotal/productosTotales: 0;
  
  // G- Promedio de Precios:
  const promedioPrecios = productosFiltrados.length > 0 ? precioTotal/productosTotales : 0;
  
  // H- Stock total disponible:
  const stockTotal = productosFiltrados.reduce((acum, producto) => acum + producto.stock, 0);

  return (
    <>

      <Content />

      <div className="text-gray-400 bg-gray-900 body-font overflow-hidden">
        <input
          type="text"
          placeholder="Buscar Producto"
          value={busqueda}
          onChange={(e)=>{setBusqueda(e.target.value)}}
          className="text-white ml-35 bg-gray-800 px-5 py-2 rounded"
        />
      </div>

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
          />
          ))}

          {/* Renderizacion condicional: */}
          {productosFiltrados.length === 0 && <p className="text-gray-400 bg-gray-900 body-font overflow-hidden">  No se encontraron productos</p>}

      </div>
      <StatsPanel 
      cantProductos = {productosTotales}
      precioTotalProductos = {precioTotal}
      precioMax = {precioMax}
      tituloMaxPrecio = {tituloMax}
      precioMin = {precioMin}
      tituloMinPrecio ={tituloMin}
      promPrecios = {promedioPrecios}
      promDescuentos = {promedioDescuentos}
      stock = {stockTotal}
      cantProductosTitulo20 = {productosTitulo20}
      />
    </>
  )
}

export default App;
