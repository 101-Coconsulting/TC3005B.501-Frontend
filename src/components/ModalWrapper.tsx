/**
 * Author: Eduardo Porto Morales
 * 
 * Description:
 * This component is a wrapper for the Modal component. It is used to demonstrate how to use the Modal component in a real application.
 * 
 * Usage Example: 
    <ModalWrapper client:load />
 *
 * This is an example of how to use the Modal component in a real application. You may create a new file in the src/components directory and copy this code into it.
 **/ 

import { useState } from "react";
import Modal from "@components/Modal";

export default function ModalWrapper() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="bg-primary-400 text-white px-4 py-2 rounded hover:bg-primary-500"
      >
        Abrir Modal
      </button>

      <Modal
        title="¿Estás seguro?"
        message="Esta acción no se puede deshacer."
        type="success"
        show={show}
        onClose={() => setShow(false)}
        onConfirm={() => alert("Confirmado ✅")}
      />
    </>
  );
}
