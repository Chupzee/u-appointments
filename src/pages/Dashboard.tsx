// src/pages/Dashboard.tsx
import React from "react";
import Header from "../components/Header";
import AppointmentCard from "../components/AppointmentCard";

const Dashboard = () => {
  const appointments = [
    { date: "2025-12-01", type: "U7", notes: "Kinderarzt Dr. Müller" },
    { date: "2026-01-15", type: "Impfung", notes: "MMR-Auffrischung" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
        {appointments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appointments.map((appt, idx) => (
              <AppointmentCard key={idx} {...appt} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No appointments yet. Add one above.</p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
