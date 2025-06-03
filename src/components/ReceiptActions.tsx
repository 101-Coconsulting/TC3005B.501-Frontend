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
import AproveReceipStatus from "@components/AproveReceiptsModal";
import RejectReceipStatus from "@components/RejectReceiptsModal";

interface ReceiptProps {
  receipt_id: number;
  expense_status: string;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

export default function ReceiptActions({
  receipt_id,
  onApprove,
  onReject,
}: ReceiptProps) {
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState<"approve" | "reject" | null>(null);

  const handleClick = (type: "approve" | "reject") => {
    setAction(type);
    setShowModal(true);
  };

  const confirmAction = () => {
    if (action === "approve") onApprove(receipt_id);
    if (action === "reject") onReject(receipt_id);
    setShowModal(false);
    setAction(null);
  };

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
      <AproveReceipStatus
        receipt_id={receipt_id}
        title="Aprobar comprobante"
        message="¿Está seguro de que deseas aprobar este comprobante?"
        redirection="/dashboard"
        modal_type="success"
        variant="filled"
        >
            Aprobar
        </AproveReceipStatus>

      <RejectReceipStatus
        receipt_id={receipt_id}
        title="Rechazar comprobante"
        message="¿Está seguro de que deseas rechazar este comprobante?"
        redirection="/dashboard"
        modal_type="warning"
        variant="filled"
        >
            Rechazar
        </RejectReceipStatus>
     

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