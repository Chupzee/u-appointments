import type { Appointment } from "../types/appointment";
import AppointmentCard from "./AppointmentCard";

type Props = {
  appointments: Appointment[];
  onEdit: (appointment: Appointment) => void;
  onDelete: (appointment: Appointment) => void;
};

const AppointmentList: React.FC<Props> = ({
  appointments,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      {appointments.map((a) => (
        <AppointmentCard
          key={a.id}
          date={a.date}
          type={a.type}
          notes={a.notes}
          onEdit={() => onEdit(a)}
          onDelete={() => onDelete(a)}
        />
      ))}
    </div>
  );
};

export default AppointmentList;
