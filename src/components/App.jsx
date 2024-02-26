import React, { Component } from 'react';
import ImageGallery from './imageGallery/ImageGallery';
import axios from 'axios';
import Searchbar from './searchbar/Searchbar.jsx';
import Button from './button/Button';
import Loader from './loader/Loader';
import Modal from './modal/Modal';

const API_KEY = '41240894-272bca1f2c3dcb1548b81eb12';

export class App extends Component {
  constructor() {
    super();

    this.state = {
      perPage: 12,
      currentPage: 1,
      queryValue: '',
      images: [],
      isLoading: false,
      totalPages: '',
      selectedImage: '',
      show: false,
    };
  }

  fetchImages = async () => {
    try {
      this.setState({ isLoading: true });
      const { perPage, currentPage, queryValue } = this.state;
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
          queryValue
        )}&image_type=photo&orientation=horizontal&page=${currentPage}&per_page=${perPage}`
      );
      const images = response.data.hits;
      const totalHits = response.data.totalHits;
      this.setState({
        images: [...this.state.images, ...images],
        totalPages: Math.ceil(totalHits / this.state.perPage),
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.currentPage !== this.state.currentPage ||
      prevState.queryValue !== this.state.queryValue
    ) {
      this.fetchImages();
    }
  }

  onSubmit = evt => {
    evt.preventDefault();
    const value = evt.target[1].value;
    this.setState({
      queryValue: value,
      currentPage: 1,
      images: [],
    });
  };
  handleNextPage = () => {
    this.setState(prevState => {
      if (prevState.currentPage < this.state.totalPages) {
        return {
          currentPage: prevState.currentPage + 1,
        };
      }
    });
  };
  handleImageClick = imageUrl => {
    this.setState({ selectedImage: imageUrl, show: true });
    console.log(this.state.selectedImage);
  };
  hideModal = () => {
    this.setState({ selectedImage: '', show: false });
  };

  render() {
    const { images, isLoading, currentPage, totalPages, selectedImage, show } =
      this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />
        {images.length > 0 ? (
          <ImageGallery
            images={this.state.images}
            handleImageClick={this.handleImageClick}
          />
        ) : (
          <p
            style={{
              padding: 100,
              textAlign: 'center',
              fontSize: 30,
            }}
          >
            Image gallery is empty... 📷
          </p>
        )}

        {images.length > 0 && totalPages !== currentPage && !isLoading && (
          <Button onHandleNextPage={this.handleNextPage} />
        )}
        {show ? (
          <Modal imageUrl={selectedImage} onClose={this.hideModal} />
        ) : (
          ''
        )}
        {isLoading && <Loader />}
      </div>
    );
  }
}
