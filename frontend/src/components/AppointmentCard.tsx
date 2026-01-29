// src/components/AppointmentCard.tsx
import React from "react";

type Props = {
  date: string;
  type: string;
  notes?: string;
  onEdit: () => void;
  onDelete: () => void;
};

const AppointmentCard: React.FC<Props> = ({
  date,
  type,
  notes,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <p className="text-sm text-gray-500">{date}</p>
      <h2 className="text-lg font-semibold">{type}</h2>
      {notes && <p className="text-sm text-gray-700">{notes}</p>}

      <button
        onClick={onEdit}
        className="mt-2 mr-2 text-blue-600 hover:underline"
      >
        Edit
      </button>

      <button onClick={onDelete} className="mt-2 text-red-600 hover:underline">
        Delete
      </button>
    </div>
  );
};

export default AppointmentCard;
