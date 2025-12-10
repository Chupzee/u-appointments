// src/components/AppointmentCard.tsx
import React from "react";

type Props = {
  date: string;
  type: string;
  notes?: string;
};

const AppointmentCard: React.FC<Props> = ({ date, type, notes }) => (
  <div className="p-4 bg-white rounded-lg shadow-md">
    <p className="text-sm text-gray-500">{date}</p>
    <h2 className="text-lg font-semibold">{type}</h2>
    {notes && <p className="text-sm text-gray-700">{notes}</p>}
  </div>
);

export default AppointmentCard;
