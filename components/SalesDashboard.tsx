"use client";
import { useState, useEffect } from 'react';
import { LineChart, XAxis, YAxis, Line, Tooltip, ResponsiveContainer } from "recharts";

interface SalesData {
  name: string;
  sales: number;
}

interface RecentOrder {
  id: number;
  product: string;
  quantity: number;
  total: number;
}

interface ProductCategory {
  name: string;
  sales: number;
}

const salesData: SalesData[] = [
  { name: 'Week 1', sales: 100 },
  { name: 'Week 2', sales: 120 },
  { name: 'Week 3', sales: 140 },
  { name: 'Week 4', sales: 160 },
  { name: 'Week 5', sales: 180 },
  { name: 'Week 6', sales: 200 },
  { name: 'Week 7', sales: 220 },
  { name: 'Week 8', sales: 240 },
  { name: 'Week 9', sales: 260 },
  { name: 'Week 10', sales: 280 },
];

const recentOrders: RecentOrder[] = [
  { id: 1, product: 'Product 1', quantity: 2, total: 100 },
  { id: 2, product: 'Product 2', quantity: 3, total: 150 },
  { id: 3, product: 'Product 3', quantity: 1, total: 50 },
  { id: 4, product: 'Product 4', quantity: 4, total: 200 },
  { id: 5, product: 'Product 5', quantity: 2, total: 100 },
  { id: 6, product: 'Product 6', quantity: 1, total: 50 },
  { id: 7, product: 'Product 7', quantity: 3, total: 150 },
  { id: 8, product: 'Product 8', quantity: 2, total: 100 },
  { id: 9, product: 'Product 9', quantity: 1, total: 50 },
  { id: 10, product: 'Product 10', quantity: 4, total: 200 },
];

const productCategories: ProductCategory[] = [
  { name: 'Category 1', sales: 1000 },
  { name: 'Category 2', sales: 800 },
  { name: 'Category 3', sales: 1200 },
  { name: 'Category 4', sales: 900 },
  { name: 'Category 5', sales: 1100 },
];

const SalesDashboard = () => {
  const [totalSales, setTotalSales] = useState<number>(0);
  const [popularItems, setPopularItems] = useState<RecentOrder[]>([]);

  useEffect(() => {
    const calculateTotalSales = () => {
      const total = salesData.reduce((acc, current) => acc + current.sales, 0);
      setTotalSales(total);
    };

    const calculatePopularItems = () => {
      const popular = recentOrders
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 3);
      setPopularItems(popular);
    };

    calculateTotalSales();
    calculatePopularItems();
  }, []);

  return (
    <div className="px-4 py-6 mx-auto max-w-7xl md:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Main Chart */}
        <div className="bg-white rounded-lg shadow-md p-4 lg:col-span-2">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Sales Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <XAxis 
                  dataKey="name" 
                  stroke="#6b7280" 
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280" 
                  fontSize={12}
                />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick View Boxes */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Quick View</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-600">Total Sales</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">${totalSales}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-green-600">Popular Items</h3>
              <ul className="mt-2 space-y-2">
                {popularItems.map((item) => (
                  <li 
                    key={item.id}
                    className="text-gray-700 flex justify-between items-center"
                  >
                    <span>{item.product}</span>
                    <span className="text-gray-500">Qty: {item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-4 mt-4">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 text-sm text-gray-900">{order.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.product}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.quantity}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">${order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sales by Category */}
      <div className="bg-white rounded-lg shadow-md p-4 mt-4">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Sales by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productCategories.map((category) => (
            <div 
              key={category.name}
              className="bg-indigo-50 p-4 rounded-lg"
            >
              <h3 className="text-sm font-semibold text-indigo-600">{category.name}</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">${category.sales}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;