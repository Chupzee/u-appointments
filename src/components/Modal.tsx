type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onRequestClose, children }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onRequestClose} />

      {/* Dialog */}
      <div className="relative bg-white rounded-lg p-6 z-10 min-w-[400px]">
        {/* X button */}
        <button
          onClick={onRequestClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
