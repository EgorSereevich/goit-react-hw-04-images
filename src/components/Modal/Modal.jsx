import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
const ModalRoot = document.querySelector('#modal_root');
const Modal = ({ onClick, src, alt }) => {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        onClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClick]);

  const headleBeackDrop = evt => {
    if (evt.currentTarget === evt.target) {
      onClick();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={headleBeackDrop}>
      <div className="Modal">
        <img src={src} alt={alt} width="900" height="900" onClick={onClick} />
      </div>
    </div>,
    ModalRoot
  );
};

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Modal;
