import React from "react";
import Button from "@components/Button";
import { apiRequest } from "@utils/apiClient";

interface Props {
  requestId: number;
  redirectTo?: string;
  token: string;
}

export default function FinishRequestButton({ requestId, redirectTo = "/dashboard", token}: Props) {
  const handleClick = async () => {
    try {
            await apiRequest(`/api/accounts-payable/validate-receipts/${requestId}`, { 
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` } 
    });

      alert("Solicitud finalizada correctamente");
      window.location.href = redirectTo;
    } catch (error) {
      console.error("Error al finalizar la solicitud", error);
      alert("Error al finalizar la solicitud.");
    }
  };

  return (
    <Button color="success" size="medium" onClick={handleClick}>
      Terminar
    </Button>
  );
}
