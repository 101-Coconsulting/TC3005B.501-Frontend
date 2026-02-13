import { useCallback } from "react";
import { apiRequest } from "@utils/apiClient";
import ModalWrapper from "@components/ModalWrapper";

interface Props {
  receipt_id: number;
  title: string;
  message: string;
  redirection: string;
  modal_type: "success" | "warning";
  variant?: "primary" | "secondary"| "filled";
  children: React.ReactNode;
  disabled?: boolean;
  token: string;
}

export default function RejectReceipStatus({
  receipt_id,
  title,
  message,
  redirection,
  modal_type,
  variant,
  children,
  disabled = false,
  token,
}: Props) {
  const handleConfirm = useCallback(async () => {
    try {
        const url = `/api/accounts-payable/validate-receipt/${receipt_id}`;
      await apiRequest(url, { 
        method: "PUT", 
        data: {"approval": 0},
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`Rechazado correctamente`)

      if (redirection) {
        window.location.reload();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }, [receipt_id, redirection]);

  return (
    <ModalWrapper
      title={title}
      message={message}
      button_type={modal_type}
      modal_type={modal_type}
      onConfirm={handleConfirm}
      variant={variant}
      disabled={disabled}
    >
      {children}
    </ModalWrapper>
  );
}