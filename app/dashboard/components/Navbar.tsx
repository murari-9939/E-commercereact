'use client';

import React, { useState } from "react";
import Link from "next/link";

const menuItems = [
  { name: "Home", href: "/dashboard" },
  { name: "Products", href: "/dashboard/products" },
  { 
    name: "Customers", 
    href: "/dashboard/customers",
    subMenu: [
      { name: "All Customers", href: "/dashboard/customers" },
      { name: "VIP Customers", href: "/dashboard/customers/vip" },
    ]
  },
  { name: "Orders", href: "/dashboard/orders" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center relative">
      {/* Logo */}
      <h1 className="text-xl font-bold">Dashboard</h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-4 items-center">
        {menuItems.map((item) => (
          <div key={item.name} className="relative">
            <Link
              href={item.href}
              className="text-gray-700 hover:text-blue-600 px-3 py-2"
              onMouseEnter={() => setOpenDropdown(item.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.name}
            </Link>
            {/* Dropdown */}
            {item.subMenu && openDropdown === item.name && (
              <div className="absolute top-full left-0 bg-white shadow-md mt-1 rounded w-48 z-50">
                {item.subMenu.map((sub) => (
                  <Link
                    key={sub.name}
                    href={sub.href}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Logout
        </button>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col p-4 md:hidden z-50">
          {menuItems.map((item) => (
            <div key={item.name} className="flex flex-col">
              <Link
                href={item.href}
                className="py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
              {item.subMenu && (
                <div className="pl-4">
                  {item.subMenu.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      className="py-1 text-gray-600 hover:text-blue-600"
                      onClick={() => setIsOpen(false)}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
            onClick={() => setIsOpen(false)}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
