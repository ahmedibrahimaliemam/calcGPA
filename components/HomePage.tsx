"use client"

import { useState, useEffect } from 'react';
import { LineChart, XAxis, YAxis, Line, ResponsiveContainer } from "recharts";

const commentary = "Create a sales dashboard with a line chart, summary cards, recent sales list, and sales by category section.";
const template = "nextjs-developer";
const title = "Sales Dashboard";
const description = "A sales dashboard that updates weekly data automatically.";
const additional_dependencies = ["recharts"];
const has_additional_dependencies = true;
const install_dependencies_command = "npm install recharts";
const port: number | null = 3000;
const file_path = "pages/index.tsx";

const data = [
  { name: 'Week 1', sales: 100 },
  { name: 'Week 2', sales: 120 },
  { name: 'Week 3', sales: 150 },
  { name: 'Week 4', sales: 180 },
  { name: 'Week 5', sales: 200 },
];

const topProducts = [
  { name: 'Product A', sales: 500 },
  { name: 'Product B', sales: 400 },
  { name: 'Product C', sales: 300 },
];

const recentSales = [
  { id: 1, product: 'Product A', date: '2022-01-01', sales: 100 },
  { id: 2, product: 'Product B', date: '2022-01-05', sales: 200 },
  { id: 3, product: 'Product C', date: '2022-01-10', sales: 300 },
];

const salesByCategory = [
  { name: 'Category A', sales: 1000 },
  { name: 'Category B', sales: 800 },
  { name: 'Category C', sales: 600 },
];

export default function SalesDashboard() {
  const [totalSales, setTotalSales] = useState(0);
  const [topProduct, setTopProduct] = useState('');

  useEffect(() => {
    const calculateTotalSales = () => {
      const total = data.reduce((acc, current) => acc + current.sales, 0);
      setTotalSales(total);
    };

    const findTopProduct = () => {
      const maxSales = Math.max(...topProducts.map(product => product.sales));
      const topProductName = topProducts.find(product => product.sales === maxSales)?.name;
      setTopProduct(topProductName || '');
    };

    calculateTotalSales();
    findTopProduct();
  }, []);

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className="w-full lg:w-2/3">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
          <div className="bg-white p-4 rounded shadow-md mb-4">
            <h2 className="text-lg font-bold mb-2">Total Sales</h2>
            <p className="text-3xl font-bold">${totalSales.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded shadow-md mb-4">
            <h2 className="text-lg font-bold mb-2">Top Product</h2>
            <p className="text-xl font-bold">{topProduct}</p>
          </div>
          <div className="bg-white p-4 rounded shadow-md mb-4">
            <h2 className="text-lg font-bold mb-2">Recent Sales</h2>
            <ul>
              {recentSales.map(sale => (
                <li key={sale.id} className="py-2 border-b border-gray-200">
                  <span className="text-lg font-bold">{sale.product}</span> - ${sale.sales.toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Sales by Category</h2>
        <div className="flex flex-wrap -mx-4">
          {salesByCategory.map(category => (
            <div key={category.name} className="w-full md:w-1/2 xl:w-1/3 p-4">
              <div className="bg-white p-4 rounded shadow-md">
                <h3 className="text-lg font-bold mb-2">{category.name}</h3>
                <p className="text-2xl font-bold">${category.sales.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}