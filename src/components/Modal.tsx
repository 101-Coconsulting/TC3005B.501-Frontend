import { MODAL_STYLES } from "@config/modal";
import type { ModalType } from "@config/modal";

interface ModalProps {
  title: string;
  message: string;
  type?: ModalType;
  onClose: () => void;
  onConfirm?: () => void;
  show: boolean;
}

export default function Modal({
  title,
  message,
  type = "confirm",
  onClose,
  onConfirm,
  show,
}: ModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div
      className={`rounded-lg border shadow-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md ${MODAL_STYLES[type]} text-black bg-white bg-opacity-50 backdrop-blur-sm`}
      role="dialog"
      aria-modal="true"
      >
      <h2 className="text-base sm:text-lg font-bold mb-2">{title}</h2>
      <p className="mb-4 text-sm sm:text-base">{message}</p>
      <div className="flex justify-end gap-2">
        <button
        onClick={onClose}
        className="px-3 sm:px-4 py-1 sm:py-2 text-sm bg-neutral-300 rounded hover:bg-neutral-400"
        >
        Cancelar
        </button>
        {onConfirm && (
        <button
          onClick={() => {
            onConfirm();
          }}
          className="px-3 sm:px-4 py-1 sm:py-2 text-sm bg-secondary-300 text-white rounded hover:bg-secondary-400"
        >
          Confirmar
        </button>
        )}
      </div>
      </div>
    </div>
  );
}
