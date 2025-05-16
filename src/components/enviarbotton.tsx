import React from "react";
import Button from "@/components/Button"; // Usa tu botón ya estilizado

interface Props {
  requestId: string;
}

export default function SendButton({ requestId }: Props) {
  const handleClick = () => {
    const form = document.getElementById("comprobacionForm") as HTMLFormElement;
    const formData = new FormData(form);

    const date = formData.get("fechaGasto")?.toString() ?? "";
    const description = formData.get("motivo")?.toString()?.trim() ?? "";
    const amount = parseFloat(formData.get("monto")?.toString() || "0");

    if (!date || !description || isNaN(amount) || amount <= 0) {
      alert("Por favor completa todos los campos correctamente.");
      return;
    }

    const newReceipt = {
      request_id: requestId,
      date,
      description,
      amount
    };

    const prevData = JSON.parse(localStorage.getItem("comprobantes") || "[]");
    prevData.push(newReceipt);
    localStorage.setItem("comprobantes", JSON.stringify(prevData));

    alert("Comprobante enviado.");
    window.location.href = `/lista-comprobantes/${requestId}`;
  };

  return (
    <Button variant="filled" color="primary" type="button" onClick={handleClick}>
      Enviar
    </Button>
  );
}
