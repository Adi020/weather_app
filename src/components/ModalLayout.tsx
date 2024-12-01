import { ReactNode } from 'react';

const ModalLayout = ({ children, modalClass }: { children: ReactNode; modalClass: string }) => {
  return <div className={`overlay ${modalClass}`}>{children}</div>;
};

export default ModalLayout;
