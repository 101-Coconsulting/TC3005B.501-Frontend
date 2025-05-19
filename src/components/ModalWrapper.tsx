/**
 * Author: Eduardo Porto Morales
 * rebuild: Jose Antonio González
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
import {getButtonClasses} from "@type/button";

interface ModalWrapperProps {
  title: string;
  message: string;
  button_type: "success" | "warning" | "primary" | "secondary";
  modal_type: "confirm" | "warning" | "error" | "success";
  variant?: "filled" | "border" | "empty";
  show?: boolean;
  buttonClassName?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  renderButton?: (open: () => void) => React.ReactNode;
  children?: React.ReactNode;
}
const MODAL_BUTTONS = {
  Accept: "success",
  Cancel: "warning",
  Delete: "delete",
  Confirm: "confirm",
};

export default function ModalWrapper({
  title,
  message,
  button_type,
  modal_type,
  variant="filled",
  show = false,
  buttonClassName = getButtonClasses({ variant: `${variant}`, color: `${button_type}`, size: "medium" }),
  onConfirm,
  onClose,
  renderButton,
  children,
}: ModalWrapperProps) {
  const [isOpen, setIsOpen] = useState(show);

  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    onClose?.();
  };

  const confirm = () => {
    onConfirm?.();
    setIsOpen(false);
  };

  return (
    <>
      {renderButton ? (
        renderButton(open)
      ) : (
        <button onClick={open} className={buttonClassName}>
          {children}
        </button>
      )}

      <Modal
        title={title}
        message={message}
        type={modal_type}
        show={isOpen}
        onClose={close}
        onConfirm={confirm}
      />
    </>
  );
}

