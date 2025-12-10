
// "use client";

// import React, { useEffect, useState } from "react";

// interface OrderItem {
//   id: number;
//   productId: number;
//   quantity: number;
//   unitPrice: number;
// }

// interface Order {
//   id: number;
//   customerId: number;
//   orderDate: string;
//   totalAmount: number;
//   orderItems: OrderItem[];
// }

// const DashboardPage = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch("https://localhost:44385/api/Orders");
//         if (!res.ok) throw new Error("Network response was not ok");
//         const data: Order[] = await res.json();
//         setOrders(data);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">CRM Dashboard</h1>

//       {/* Dashboard cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
//           <h2 className="text-gray-500 text-sm">Total Customers</h2>
//           <p className="text-2xl font-semibold">120</p>
//         </div>

//         <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
//           <h2 className="text-gray-500 text-sm">Total Orders</h2>
//           <p className="text-2xl font-semibold">{orders.length}</p>
//         </div>

//         <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
//           <h2 className="text-gray-500 text-sm">Total Products</h2>
//           <p className="text-2xl font-semibold">56</p>
//         </div>

//         <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
//           <h2 className="text-gray-500 text-sm">Revenue</h2>
//           <p className="text-2xl font-semibold">
//             ₹{orders.reduce((sum, o) => sum + o.totalAmount, 0)}
//           </p>
//         </div>
//       </div>

//       {/* Recent Orders Table */}
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

//         {loading ? (
//           <p>Loading orders...</p>
//         ) : orders.length === 0 ? (
//           <p>No orders found.</p>
//         ) : (
//           <table className="min-w-full border">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="py-2 px-4 border">Order ID</th>
//                 <th className="py-2 px-4 border">Customer ID</th>
//                 <th className="py-2 px-4 border">Order Date</th>
//                 <th className="py-2 px-4 border">Amount</th>
//                 <th className="py-2 px-4 border">Items</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order.id} className="hover:bg-gray-100">
//                   <td className="py-2 px-4 border">{order.id}</td>
//                   <td className="py-2 px-4 border">{order.customerId}</td>
//                   <td className="py-2 px-4 border">
//                     {new Date(order.orderDate).toLocaleDateString()}
//                   </td>
//                   <td className="py-2 px-4 border">₹{order.totalAmount}</td>
//                   <td className="py-2 px-4 border">{order.orderItems.length}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;
"use client";

import React, { useEffect, useState } from "react";

interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  unitPrice: number;
}

interface Order {
  id: number;
  customerId: number;
  orderDate: string;
  totalAmount: number;
  orderItems: OrderItem[];
}

const DashboardPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let url = "https://localhost:44385/api/Orders";
      const params = new URLSearchParams();
      if (fromDate) params.append("fromDate", fromDate);
      if (toDate) params.append("toDate", toDate);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Network response was not ok");
      const data: Order[] = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [fromDate, toDate]);

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        CRM Dashboard
      </h1>

      {/* Date Filters */}
     

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {[
          { label: "Total Customers", value: 120 },
          { label: "Total Orders", value: orders.length },
          { label: "Total Products", value: 56 },
          {
            label: "Revenue",
            value: `₹${orders.reduce((sum, o) => sum + o.totalAmount, 0)}`,
          },
        ].map((card, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition flex flex-col justify-between"
          >
            <h2 className="text-gray-500 text-sm">{card.label}</h2>
            <p className="text-2xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>
 <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-gray-600 mb-1">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-600 mb-1">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>
      {/* Orders Table */}
      <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className="min-w-full border table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border text-left">Order ID</th>
                <th className="py-2 px-4 border text-left">Customer ID</th>
                <th className="py-2 px-4 border text-left">Order Date</th>
                <th className="py-2 px-4 border text-left">Amount</th>
                <th className="py-2 px-4 border text-left">Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{order.id}</td>
                  <td className="py-2 px-4 border">{order.customerId}</td>
                  <td className="py-2 px-4 border">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">₹{order.totalAmount}</td>
                  <td className="py-2 px-4 border">{order.orderItems.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
