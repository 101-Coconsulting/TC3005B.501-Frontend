import { useCallback } from "react";
import { apiRequest } from "@utils/apiClient";
import ModalWrapper from "@components/ModalWrapper";

interface Props {
  request_id: number;
  title: string;
  message: string;
  redirection: string;
  modal_type: "success" | "warning";
  variant?: "primary" | "secondary";
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
  const handleConfirm = useCallback(async () => {
    try {
      const url = `/applicant/send-expense-validation/${request_id}`;
      await apiRequest(url, { 
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`Comprobante enviado exitosamente.`)

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
  );
}