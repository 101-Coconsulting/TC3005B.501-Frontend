import { useCallback } from "react";
import ModalWrapper from "@components/ModalWrapper";
import { apiRequest } from "@utils/apiClient";

interface Props {
  requestId: number;
  action: "approve" | "decline";
  title: string;
  message: string;
  buttonType: "success" | "warning";
  modalType: "success" | "warning";
  children: React.ReactNode;
  redirectTo?: string;
}

export default function TravelRequestActionWrapper({
  requestId,
  action,
  title,
  message,
  buttonType,
  modalType,
  children,
  redirectTo,
}: Props) {
  const handleConfirm = useCallback(async () => {
    try {
      const url =
        action === "approve"
          ? `/authorizer/authorize-travel-request/${requestId}/4`
          : `/authorizer/decline-travel-request/${requestId}/4`;

      await apiRequest(url, { method: "PUT" });

      if (redirectTo) {
        window.location.href = redirectTo;
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }, [requestId, action, redirectTo]);
  return (
    <ModalWrapper
      title={title}
      message={message}
      button_type={buttonType}
      modal_type={modalType}
      onConfirm={handleConfirm}
    >
      {children}
    </ModalWrapper>
  );
}
