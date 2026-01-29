import type React from "react";

export type AppointmentFilter = "upcoming" | "all" | "past";
export type AppointmentSort = "asc" | "desc";

type Props = {
  query: string;
  onQueryChange: (value: string) => void;

  filter: AppointmentFilter;
  onFilterChange: (value: AppointmentFilter) => void;

  sort: AppointmentSort;
  onToggleSort: () => void;
};

const AppointmentControls = ({
  query,
  onQueryChange,
  filter,
  onFilterChange,
  sort,
  onToggleSort,
}: Props) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Suchen (Typ, Notizen)…"
        className="w-full sm:w-80 p-2 border rounded"
      />

      <div className="flex gap-2 items-center">
        <select
          value={filter}
          onChange={(e) => onFilterChange(e.target.value as Props["filter"])}
          className="p-2 border rounded"
          aria-label="Filter"
        >
          <option value="upcoming">Bevorstehend</option>
          <option value="all">Alle</option>
          <option value="past">Vergangen</option>
        </select>

        <button
          type="button"
          onClick={onToggleSort}
          className="px-3 py-2 border rounded"
          aria-label="Sortierung umschalten"
        >
          {sort === "asc" ? "↑" : "↓"}
        </button>
      </div>
    </div>
  );
};

export default AppointmentControls;
