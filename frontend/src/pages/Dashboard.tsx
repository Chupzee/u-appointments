import { useState, useEffect } from "react";
import Header from "../components/Header";
import AppointmentList from "../components/AppointmentList";
import AddAppointmentForm from "../components/AddAppointmentForm";
import Modal from "../components/Modal";
import type { Appointment } from "../types/appointment";
import { sortAppointmentsByDate } from "../utils/sortAppointments";
import ConfirmModal from "../components/ConfirmModal";
import AppointmentModal from "../components/AppointmentModal";
import {
  useAppointmentsQuery,
  useAddAppointmentMutation,
  useUpdateAppointmentMutation,
  useRemoveAppointmentMutation,
} from "../queries/appointments";
import { getVisibleAppointments } from "../domain/appointmentsView";
import AppointmentControls from "../components/AppointmentControls";

const Dashboard: React.FC = () => {
  const { data: appointments = [], isLoading } = useAppointmentsQuery();

  const [query, setQuery] = useState("");
  const [show, setShow] = useState<"upcoming" | "all" | "past">("upcoming");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const visibleAppointments = getVisibleAppointments(appointments, {
    query,
    show,
    sort,
  });

  const addMutation = useAddAppointmentMutation();
  const updateMutation = useUpdateAppointmentMutation();
  const removeMutation = useRemoveAppointmentMutation();

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);
  const [appointmentToDelete, setAppointmentToDelete] =
    useState<Appointment | null>(null);

  const handleAddAppointment = (newAppointment: Appointment): void => {
    addMutation.mutate(newAppointment);
    setModalOpen(false);
  };

  const handleUpdateAppointment = (updatedAppointment: Appointment): void => {
    updateMutation.mutate(updatedAppointment);
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

    removeMutation.mutate(appointmentToDelete.id);

    setAppointmentToDelete(null);
  };

  const cancelDelete = () => {
    setAppointmentToDelete(null);
  };

  if (isLoading) {
    return <div className="p-6">Termine laden...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Terminplaner</h2>

          <button
            onClick={openCreateModal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Neuer Termin
          </button>
        </div>
        <AppointmentControls
          query={query}
          onQueryChange={setQuery}
          filter={show}
          onFilterChange={setShow}
          sort={sort}
          onToggleSort={() => setSort((s) => (s === "asc" ? "desc" : "asc"))}
        />

        <AppointmentList
          appointments={visibleAppointments}
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
