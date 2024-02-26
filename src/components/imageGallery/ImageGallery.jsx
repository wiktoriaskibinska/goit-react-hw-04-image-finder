import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
const ImageGallery = ({ images, handleImageClick }) => {
  return (
    <ul className={css.galleryList}>
      {images.map((image, index) => (
        <ImageGalleryItem
          image={image}
          key={index}
          handleImageClick={handleImageClick}
        />
      ))}
    </ul>
  );
};
ImageGallery.propTypes = {
  images: PropTypes.array,
  handleImageClick: PropTypes.func,
};

export default ImageGallery;
