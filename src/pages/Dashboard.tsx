import { useState } from "react";
import Header from "../components/Header";
import AppointmentList from "../components/AppointmentList";
import AddAppointmentForm from "../components/AddAppointmentForm";
import Modal from "../components/Modal";
import { appointments as initialAppointments } from "../data/appointments";
import type { Appointment } from "../types/appointment";
import { sortAppointmentsByDate } from "../utils/sortAppointments";
import ConfirmModal from "../components/ConfirmModal";
import AppointmentModal from "../components/AppointmentModal";
import {
  removeAppointment,
  updateAppointment,
  addAppointment,
} from "../domain/appoinments";

const Dashboard: React.FC = () => {
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);
  const [appointmentToDelete, setAppointmentToDelete] =
    useState<Appointment | null>(null);

  const handleAddAppointment = (newAppointment: Appointment): void => {
    setAppointments((prev) => addAppointment(prev, newAppointment));
    setModalOpen(false);
  };

  const handleUpdateAppointment = (updatedAppointment: Appointment): void => {
    setAppointments((prev) => updateAppointment(prev, updatedAppointment));
    closeModal();
  };

  const openCreateModal = (): void => {
    setEditingAppointment(null);
    setModalOpen(true);
  };

  const openEditModal = (appointment: Appointment): void => {
    setEditingAppointment(appointment);
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setEditingAppointment(null);
  };

  const requestDelete = (appointment: Appointment) => {
    setAppointmentToDelete(appointment);
  };

  const confirmDelete = () => {
    if (!appointmentToDelete) return;

    setAppointments((prev) => removeAppointment(prev, appointmentToDelete.id));

    setAppointmentToDelete(null);
  };

  const cancelDelete = () => {
    setAppointmentToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Upcoming Appointments</h2>

          <button
            onClick={openCreateModal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Neuer Termin
          </button>
        </div>

        <AppointmentList
          appointments={appointments}
          onEdit={openEditModal}
          onDelete={requestDelete}
        />
      </main>

      <AppointmentModal
        isOpen={isModalOpen}
        editingAppointment={editingAppointment}
        onClose={closeModal}
        onAdd={handleAddAppointment}
        onUpdate={handleUpdateAppointment}
      />

      <ConfirmModal
        isOpen={!!appointmentToDelete}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        title="Termin löschen"
        description="Möchten Sie diesen Termin wirklich löschen?"
        confirmLabel="Löschen"
        confirmVariant="danger"
      />
    </div>
  );
};

export default Dashboard;
