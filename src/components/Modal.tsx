import { ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import useModalState from '../hooks/useModalState';

interface Props {
  children?: ReactNode;
  modalClass?: String;
}

export const Modal = ({ children, modalClass }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalRoot = document.getElementById('modal');
  const { closeModal } = useModalState();

  const handleCloseModal = () => {
    closeModal();
  };

  const { modalClassActive } = useSelector((state: RootState) => state.modal);

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  if (!modalRoot || modalClassActive !== modalClass) {
    return null;
  }

  return createPortal(
    <div onClick={handleCloseModal} className={`overlay ${modalClass}`}>
      <div className="modal__content" onClick={handleContentClick} ref={modalRef}>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
