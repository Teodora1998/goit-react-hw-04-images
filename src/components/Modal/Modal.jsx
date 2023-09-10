import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { useEffect } from 'react';


export const Modal = ({ imageURL, tag, closeModal }) => {

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  return (
    <div className={css.Overlay} onClick={closeModal}>
      <div className={css.Modal} onClick={e => e.stopPropagation()}>
        <img src={imageURL} alt={tag} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageURL: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
