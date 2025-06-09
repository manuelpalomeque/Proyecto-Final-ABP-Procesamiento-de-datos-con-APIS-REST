import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Rectangle
} from "recharts";

function GraficoBarras({ cantidadPorCategoria }) {

  const data = cantidadPorCategoria.map(item => ({
    name: item.categoria,
    cantidad: item.cantidad
  }));

  return (
    <section>
      <div>
          <br/>
          <p className="text-3xl text-blue-600 font-bold">1 - Cantidad de productos por Categorías</p>
          <br/>
        </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cantidad" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default GraficoBarras;