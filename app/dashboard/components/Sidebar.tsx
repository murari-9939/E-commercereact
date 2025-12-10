// // 'use client';

// // import Link from "next/link";

// // export default function Sidebar() {
// //   return (
// //     <div className="w-64 bg-gray-800 text-white h-screen p-4 flex flex-col">
// //       <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
// //       <Link href="/dashboard" className="mb-2 hover:bg-gray-700 p-2 rounded">Home</Link>
// //       <Link href="/dashboard/products" className="mb-2 hover:bg-gray-700 p-2 rounded">Products</Link>
// //       <Link href="/dashboard/customers" className="mb-2 hover:bg-gray-700 p-2 rounded">Customers</Link>
// //       <Link href="/dashboard/orders" className="mb-2 hover:bg-gray-700 p-2 rounded">Orders</Link>
// //     </div>
// //   );
// // }

// 'use client';

// import React, { useState } from "react";
// import Link from "next/link";
// import {
//   Info,
//   ListChecks,
//   FileText,
//   Settings,
//   DollarSign,
//   Mail,
//   Rocket,
//   Menu,
//   X,
// } from "lucide-react"; // or your icon library

// type MenuItem = {
//   name: string;
//   icon: any;
//   href: string;
// };

// interface SidebarProps {
//   courseId: string;
//   children: React.ReactNode;
// }

// export default function Sidebar() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const menuItems: MenuItem[] = [
//     { name: "Landing Page", icon: Info, href: `/courser-setting/${courseId}/landing-page` },
//     { name: "Curriculum", icon: ListChecks, href: `/courser-setting/${courseId}/curriculum` },
//     { name: "Requirements", icon: FileText, href: `/courser-setting/${courseId}/requirements` },
//     { name: "Additional Settings", icon: Settings, href: `/courser-setting/${courseId}/additional-settings` },
//     { name: "Pricing", icon: DollarSign, href: `/courser-setting/${courseId}/pricing` },
//     { name: "Messages", icon: Mail, href: `/courser-setting/${courseId}/messages` },
//     { name: "Publish", icon: Rocket, href: `/courser-setting/${courseId}/publish` },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-50 relative">
//       {/* MOBILE HAMBURGER BUTTON */}
//       {!sidebarOpen && (
//         <div className="lg:hidden fixed top-1 left-1 z-50">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="p-2 rounded-md bg-white shadow hover:bg-gray-100 transition"
//             aria-label="Open Sidebar"
//           >
//             <Menu className="w-6 h-6 text-gray-700" />
//           </button>
//         </div>
//       )}

//       {/* MOBILE SIDEBAR */}
//       <div
//         className={`fixed inset-0 z-50 lg:hidden transition-transform duration-300 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div
//           className="absolute inset-0 bg-black bg-opacity-50"
//           onClick={() => setSidebarOpen(false)}
//         />
//         <aside className="relative w-64 h-full bg-white shadow-lg p-6 flex flex-col space-y-4 z-50">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold text-gray-800">Course Settings</h2>
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="p-2 rounded-md hover:bg-gray-100 transition"
//               aria-label="Close Sidebar"
//             >
//               <X className="w-6 h-6 text-gray-700" />
//             </button>
//           </div>
//           <nav className="flex flex-col space-y-2">
//             {menuItems.map((item, idx) => {
//               const Icon = item.icon;
//               return (
//                 <Link
//                   key={idx}
//                   href={item.href}
//                   onClick={() => setSidebarOpen(false)}
//                   className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition cursor-pointer"
//                 >
//                   <Icon className="w-5 h-5 text-gray-600" />
//                   <span className="text-gray-800 font-medium">{item.name}</span>
//                 </Link>
//               );
//             })}
//           </nav>
//         </aside>
//       </div>

//       {/* DESKTOP SIDEBAR */}
//       <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r p-6 space-y-4 shadow-sm">
//         <h2 className="text-xl font-bold text-gray-800 mb-2">Course Settings</h2>
//         <nav className="flex flex-col space-y-2">
//           {menuItems.map((item, idx) => {
//             const Icon = item.icon;
//             return (
//               <Link
//                 key={idx}
//                 href={item.href}
//                 className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition cursor-pointer"
//               >
//                 <Icon className="w-5 h-5 text-gray-600" />
//                 <span className="text-gray-800 font-medium">{item.name}</span>
//               </Link>
//             );
//           })}
//         </nav>
//       </aside>

//       {/* MAIN CONTENT */}
//       <main className="flex-1 overflow-y-auto p-4 lg:p-6 flex justify-center">
//         <div className="w-full max-w-7xl px-4">{children}</div>
//       </main>
//     </div>
//   );
// }
'use client';

import React, { useState } from "react";
import Link from "next/link";
import { Home, Box, Users, ShoppingCart, BarChart2, Menu, X } from "lucide-react";

type MenuItem = {
  name: string;
  icon: any;
  href: string;
};

interface SidebarProps {
  children: React.ReactNode;
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { name: "Dashboard", icon: Home, href: "/dashboard" },
    { name: "Products", icon: Box, href: "/dashboard/products" },
    { name: "Customers", icon: Users, href: "/dashboard/customers" },
    { name: "Orders", icon: ShoppingCart, href: "/dashboard/orders" },
    { name: "Analytics", icon: BarChart2, href: "/dashboard/analytics" },
  ];

  return (
    <div className="flex h-screen bg-white-50 relative">
      {/* MOBILE HAMBURGER BUTTON */}
      {!sidebarOpen && (
        <div className="lg:hidden fixed top-1 left-1 z-50">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md bg-white shadow hover:bg-gray-100 transition"
            aria-label="Open Sidebar"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
        <aside className="relative w-64 h-full bg-white shadow-lg p-6 flex flex-col space-y-4 z-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 transition"
              aria-label="Close Sidebar"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          <nav className="flex flex-col space-y-2">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                >
                  <Icon className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-800 font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r p-6 space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Admin Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              >
                <Icon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-800 font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1  bg -white overflow-y-auto p-4 lg:p-6 flex justify-center">
        {/* <div className="w-full max-w-7xl px-4">{children}</div> */}
      </main>
    </div>
  );
}
