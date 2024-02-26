import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
const ImageGalleryItem = ({ image, handleImageClick }) => {
  return (
    <li className={css.galleryItem}>
      <img
        className={css.galleryImg}
        src={image.webformatURL}
        alt=""
        onClick={() => handleImageClick(image.largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
  handleImageClick: PropTypes.func,
};
export default ImageGalleryItem;
