import React from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
const Modal = ({ imageUrl, onClose }) => {
  return (
    <div className={css.modalOverlay} onClick={onClose}>
      <div className={css.modal}>
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};
Modal.propTypes = {
  imageUrl: PropTypes.string,
  onClose: PropTypes.func,
};
export default Modal;
