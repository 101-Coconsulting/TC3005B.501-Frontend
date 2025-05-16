import React, { useState } from "react";
import Button from "@components/Button.tsx";
import Modal from "@components/Modal";

interface RequestProps {
  request_id: string;
  request_status_id: string;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

export default function RequestActions({
  request_id,
  onApprove,
  onReject,
}: RequestProps) {
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState<"approve" | "reject" | null>(null);

  const handleClick = (type: "approve" | "reject") => {
    setAction(type);
    setShowModal(true);
  };

  const confirmAction = () => {
    if (action === "approve") onApprove(request_id);
    if (action === "reject") onReject(request_id);
    setShowModal(false);
    setAction(null);
  };


  return (
    <div className="flex flex-row gap-2 items-center justify-center w-full">
      <Button color="success" size="medium" customSizeClass="w-full" onClick={() => handleClick("approve")}>
        Autorizar
      </Button>

      <Button color="warning" size="medium" customSizeClass="w-full" onClick={() => handleClick("reject")}>
        Rechazar
      </Button>

      {/* Confirmation  Modal*/}
      <Modal
        title="¿Estás seguro?"
        message={`¿Seguro que deseas ${action === "approve" ? "autorizar" : "rechazar"} este comprobante?`}
        type={action === "approve" ? "success" : "warning"}
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmAction}
      />

    </div>
  );
}