import { useCallback, useState } from "react";
import { apiRequest } from "@utils/apiClient";
import ModalWrapper from "@components/ModalWrapper";
import Toast from "@components/Toast";

interface Props {
  request_id: number;
  endpoint: string;
  role: number;
  title: string;
  message: string;
  redirection: string;
  modal_type: "success" | "warning";
  children: React.ReactNode;
}

export default function TravelRequestActionWrapper({
  request_id,
  endpoint,
  role,
  title,
  message,
  redirection,
  modal_type,
  children,
}: Props) {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const handleConfirm = useCallback(async () => {
    try {
      const url = `${endpoint}/${request_id}/${role}`;
      await apiRequest(url, { method: "PUT" });

      if (endpoint.includes("authorize-travel-request")) {
        setToast({ message: 'Solicitud autorizada exitosamente.', type: 'success' });
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else if (endpoint.includes("decline-travel-request")) {
        setToast({ message: 'Solicitud rechazada exitosamente.', type: 'success' });
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      if (redirection) {
        window.location.href = redirection;
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }, [request_id, endpoint, redirection, role]);

  return (
    <>
      <ModalWrapper
        title={title}
        message={message}
        button_type={modal_type}
        modal_type={modal_type}
        onConfirm={handleConfirm}
      >
        {children}
      </ModalWrapper>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}