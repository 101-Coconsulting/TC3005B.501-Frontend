import { useCallback, useState } from "react";
import { apiRequest } from "@utils/apiClient";
import ModalWrapper from "@components/ModalWrapper";
import Toast from '@/components/Toast';

interface Props {
  request_id: number;
  title: string;
  message: string;
  redirection: string;
  modal_type: "success" | "warning";
  variant?: "primary" | "secondary"| "filled";
  children: React.ReactNode;
  token: string;
}

export default function ValidateReceiptStatus({
  request_id,
  title,
  message,
  redirection,
  modal_type,
  variant,
  children,
  token,
}: Props) {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const handleConfirm = useCallback(async () => {
    try {
      const url = `/api/travel-agent/attend-travel-request/${request_id}`;
      await apiRequest(url, { 
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      setToast({ message: 'Comprobante enviado exitosamente.', type: 'success' });
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (redirection) {
        window.location.href = redirection;
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }, [request_id, redirection]);

  return (
    <>
      <ModalWrapper
        title={title}
        message={message}
        button_type={modal_type}
        modal_type={modal_type}
        onConfirm={handleConfirm}
        variant={variant}
      >
        {children}
      </ModalWrapper>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}