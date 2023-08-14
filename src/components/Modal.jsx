import React from 'react';

const Modal = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-1/2">{children}</div>
    </div>
  );
};

export default Modal;
