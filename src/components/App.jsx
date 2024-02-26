import React, { useEffect, useState } from 'react';
import ImageGallery from './imageGallery/ImageGallery';
import axios from 'axios';
import Searchbar from './searchbar/Searchbar.jsx';
import Button from './button/Button';
import Loader from './loader/Loader';
import Modal from './modal/Modal';
import Notiflix, { Notify } from 'notiflix';

Notify.init({
  width: '300px',

  success: {
    background: 'pink',
  },
});

const API_KEY = '41240894-272bca1f2c3dcb1548b81eb12';

export const App = () => {
  const PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState('');
  const [selectedImage, setSelectedImg] = useState('');
  const [show, setModal] = useState(false);
  const [startFetch, setStartFetch] = useState(false);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
          query
        )}&image_type=photo&orientation=horizontal&page=${currentPage}&per_page=${PER_PAGE}`
      );
      const images = response.data.hits;
      const totalHits = response.data.totalHits;

      setImages(prevImages => [...prevImages, ...images]);
      setTotalPages(Math.ceil(totalHits / PER_PAGE));

      if (totalHits.length === 0) {
        Notiflix.Notify.info(`0 images found`);
      } else {
        Notiflix.Notify.success(`${totalHits} images found!`);
      }
    } catch (error) {
      Notiflix.Notify.failure(`Error occured, please try again!`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (startFetch) {
      fetchImages();
    }
    // eslint-disable-next-line
  }, [query, currentPage, setStartFetch]);

  const onSubmit = evt => {
    evt.preventDefault();
    const value = evt.target[1].value;
    setImages([]);
    setQuery(value);
    setCurrentPage(1);
    setStartFetch(true);
  };

  const handleNextPage = () => {
    setCurrentPage(prevState => {
      if (prevState < totalPages) {
        return prevState + 1;
      }
    });
  };

  const handleImageClick = imageUrl => {
    setSelectedImg(imageUrl);
    setModal(true);
  };
  const hideModal = () => {
    setSelectedImg('');
    setModal(false);
  };
  /*const { images, isLoading, currentPage, totalPages, selectedImage, show } =
      this.state;*/

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} />
      {images.length > 0 ? (
        <ImageGallery images={images} handleImageClick={handleImageClick} />
      ) : (
        <p
          style={{
            height: `100vh`,
            padding: 100,
            textAlign: 'center',
            fontSize: 30,
          }}
        >
          Image gallery is empty... 📷
        </p>
      )}

      {images.length > 0 && totalPages !== currentPage && !isLoading && (
        <Button onHandleNextPage={handleNextPage} />
      )}
      {show ? <Modal imageUrl={selectedImage} onClose={hideModal} /> : ''}
      {isLoading && <Loader />}
    </div>
  );
};
