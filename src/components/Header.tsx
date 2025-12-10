// src/components/Header.tsx
import React from "react";

const Header = () => (
  <header className="w-full px-6 py-4 bg-white shadow-md flex justify-between items-center">
    <h1 className="text-2xl font-bold text-gray-800">U-Appointments</h1>
    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
      + Add Appointment
    </button>
  </header>
);

export default Header;
