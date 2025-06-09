import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Simulacion de Evolucion de precio por mes de dos categorias beauty y fragances
const data = [
  { name: 'Enero', beauty: 4000, fragances: 2586 },
  { name: 'Febrero', beauty: 3000, fragances: 9638 },
  { name: 'Marzo', beauty: 2000, fragances: 1590 },
  { name: 'Abril', beauty: 2780, fragances: 2589 },
  { name: 'Mayo', beauty: 1890, fragances: 7410 },
  { name: 'Junio', beauty: 2390, fragances: 8520 },
  { name: 'Julio', beauty: 4596, fragances: 2565 },
  { name: 'Agosto', beauty: 278, fragances: 6566 },
  { name: 'Septiembre', beauty: 3574, fragances: 5023 },
  { name: 'Octubre', beauty: 2589, fragances: 2586 },
  { name: 'Noviembre', beauty: 8856, fragances: 3756 },
  { name: 'Diciembre', beauty: 7536, fragances: 4564 }
];

function GraficoLinea() {
  return (
    <section>
      <div>
        <br />
        <p className="text-3xl text-blue-600 font-bold">3 - Evolución de precios por mes</p>
        <br />
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="beauty" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="fragances" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}

export default GraficoLinea;