import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  setOpen: (isOpen: boolean) => void;
  onClose?: () => void;
}

const Modal = ({ isOpen, children, setOpen, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    if (isOpen) {
      modalElement.showModal();
    } else {
      modalElement.close();
      if (onClose) onClose();
    }
  }, [isOpen, onClose]);

  const handleClick = (e: React.SyntheticEvent) => {
    if (e.target === modalRef.current) setOpen(false);
  };

  return (
    <dialog ref={modalRef} className="modal" onClick={handleClick}>
      {children}
    </dialog>
  );
};

export default Modal;
