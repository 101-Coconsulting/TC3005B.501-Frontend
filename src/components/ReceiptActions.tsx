import React, { useState } from "react";
import Modal from "@components/Modal";
import AproveReceipStatus from "@components/AproveReceiptsModal";
import RejectReceipStatus from "@components/RejectReceiptsModal";

interface ReceiptProps {
  receipt_id: number;
  disabled: boolean; // ✅ lo recibes desde el .astro
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

export default function ReceiptActions({
  receipt_id,
  disabled,
  onApprove,
  onReject,
}: ReceiptProps) {
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [loading, setLoading] = useState(false);

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
        approval === 1 ? onApprove(receipt_id) : onReject(receipt_id);
      } else {
        alert(data.error || "No se pudo actualizar.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setShowModal(false);
      setAction(null);
    }
  };

  return (
    <div className="flex flex-row gap-2 items-center justify-center w-full">
      <AproveReceipStatus
        receipt_id={receipt_id}
        title="Aprobar comprobante"
        message="¿Está seguro de que deseas aprobar este comprobante?"
        redirection="/dashboard"
        modal_type="success"
        variant="filled"
        disabled={disabled} // ✅ viene directo
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
        disabled={disabled} // ✅ viene directo
      >
        Rechazar
      </RejectReceipStatus>

      {/* Este modal probablemente ya no se usa si solo usas ModalWrapper */}
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
