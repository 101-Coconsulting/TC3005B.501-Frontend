/**
 * Author: Kenia Esmeralda Ramos Javier
 * 
 * Description: 
 * This component renders action buttons ("Approve" and "Reject").
 * And shows a confirmation modal before triggering the provided callback.
 */
import React, { useState } from "react";
import Button from "./Button"
import Modal from "@components/Modal";

interface ReceiptProps {
  receipt_id: number;
  expense_status: string;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

export default function ReceiptActions({
  receipt_id,
  expense_status,
  onApprove,
  onReject,
}: ReceiptProps) {
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [status,setStatus]= useState(expense_status);
  const [loading,setLoading] = useState(false);

  const handleClick = (type: "approve" | "reject") => {
    setAction(type);
    setShowModal(true);
  };

  const confirmAction = async () => {
    const approval = action === "approve" ? 1 : 0;

    try {
      setLoading(true);
      const res = await fetch(
      `${import.meta.env.PUBLIC_API_BASE_URL}/accounts-payable/validate-receipt/${receipt_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ approval }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        const newStatus = data.validation;
        setStatus(newStatus);
        approval === 1 ? onApprove(receipt_id) : onReject(receipt_id);
      } else {
        alert(data.error || "No se pudo actualizar.");
      }
    } catch (err) {
      alert("Error de red.");
    } finally {
      setLoading(false);
      setShowModal(false);
      setAction(null);
    }
  };

  if (status !== "Pendiente") {
    return <p className="text-sm text-gray-500 italic">Ya fue {status}</p>;
  }

  /*  ---  Legacy alert-based confirmation logic (replaced by modal) ----
  const handleApprove = () => {
    if (window.confirm("¿Estás seguro de aprobar este comprobante?")) {
      onApprove(receipt_id);
    }
  };

  const handleReject = () => {
    if (window.confirm("¿Estás seguro de rechazar este comprobante?")) {
      onReject(receipt_id);
    }
  };
*/

  return (
    <div className="flex flex-row gap-2 items-center justify-center w-full">
      <Button color="success" size="medium" customSizeClass="w-full" onClick={() => handleClick("approve")}>
        Aprobar
      </Button>

      <Button color="warning" size="medium" customSizeClass="w-full" onClick={() => handleClick("reject")}>
        Rechazar
      </Button>

      {/* Confirmation  Modal*/}
      <Modal
        title="¿Estás seguro?"
        message={`¿Seguro que deseas ${action === "approve" ? "aprobar" : "rechazar"} este comprobante?`}
        type={action === "approve" ? "success" : "warning"}
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmAction}
      />
    </div>
  );
}
