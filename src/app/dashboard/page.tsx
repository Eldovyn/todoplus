"use client";

import React from 'react';

const Sidebar = () => {
  // Event handler untuk meng-handle klik pada setiap item
  const handleItemClick = (itemName: string) => {
    alert(`You clicked on ${itemName}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 flex items-center justify-center">
          <span className="text-xl font-semibold">Menu</span>
        </div>
        <nav className="flex-1 px-2">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                onClick={() => handleItemClick("Home")}
                className="flex items-center px-2 py-2 text-gray-200 hover:bg-gray-700 rounded"
              >
                <i className="bi bi-house text-lg mr-2"></i>
                <span className="hidden sm:inline">Home</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleItemClick("Dashboard")}
                className="flex items-center px-2 py-2 text-gray-200 hover:bg-gray-700 rounded"
              >
                <i className="bi bi-speedometer2 text-lg mr-2"></i>
                <span className="hidden sm:inline">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleItemClick("Orders")}
                className="flex items-center px-2 py-2 text-gray-200 hover:bg-gray-700 rounded"
              >
                <i className="bi bi-table text-lg mr-2"></i>
                <span className="hidden sm:inline">Orders</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleItemClick("Customers")}
                className="flex items-center px-2 py-2 text-gray-200 hover:bg-gray-700 rounded"
              >
                <i className="bi bi-people text-lg mr-2"></i>
                <span className="hidden sm:inline">Customers</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <div className="flex items-center space-x-2 text-gray-300">
            <img
              src="https://github.com/mdo.png"
              alt="hugenerd"
              className="w-8 h-8 rounded-full"
            />
            <span className="hidden sm:inline">loser</span>
          </div>
          <ul className="mt-2 text-sm text-gray-400">
            <li><a href="#" className="block hover:text-white">New project...</a></li>
            <li><a href="#" className="block hover:text-white">Settings</a></li>
            <li><a href="#" className="block hover:text-white">Profile</a></li>
            <li><a href="#" className="block hover:text-white">Sign out</a></li>
          </ul>
        </div>
      </aside>
      <main className="flex-1 p-6">
        Content area...
      </main>
    </div>
  );
};

export default Sidebar;
