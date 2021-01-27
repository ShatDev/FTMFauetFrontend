import React, { useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BitcoinPricePanel = () => {
  const [priceData, setPriceData] = useState([]);

  async function generateData(period) {
    let data = await fetch('https://www.coinbase.com/api/v2/prices/BTC-USD/historic?period=hour');
    data.json().then(data => {
      setPriceData(data);
    });
  }

  generateData();

  return (
    <div>
      <BarChart
        width={500}
        height={300}
        data={priceData.data.prices}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" /> */}
      </BarChart>
    </div>
  );
};

export default BitcoinPricePanel;
