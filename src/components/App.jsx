import { React, Component } from 'react';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import MutatingDots from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import * as ImageService from './api-axios';
export class App extends Component {
  state = {
    query: '',
    page: 1,
    hits: [],
    lastPage: true,
    isLoading: false,
    src: null,
    alt: null,
    showModal: false,
  };

  getNormalayzedImage = array =>
    array.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  async componentDidUpdate(prevProp, prevState) {
    if (
      (prevState.query === this.state.query &&
        prevState.page === this.state.page) ||
      this.state.query.trim() === ''
    ) {
      return;
    }
    this.setState({ isLoading: true });
    try {
      const { hits, total } = await ImageService.getImages({
        page: this.state.page,
        query: this.state.query,
      });

      if (hits.length === 0) {
        toast.error('Нічого не знайдено', {
          position: 'top-center',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }

      this.setState(prev => ({
        hits: [...prev.hits, ...this.getNormalayzedImage(hits)],
        lastPage: this.state.page >= Math.ceil(total / 12),
      }));
    } catch (error) {
      console.log('Error!!');
    } finally {
      this.setState({ isLoading: false });
    }
  }
  onSubmit = query => {
    this.setState({ query, page: 1, hits: [] });
  };
  handleClick = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };
  handleImageClick = (largeImageURL, tags) => {
    this.setState({ src: largeImageURL, alt: tags, showModal: true });
  };
  handleModalClose = () => {
    this.setState({ showModal: false });
  };
  render() {
    const { hits, lastPage, showModal, alt, src, isLoading } = this.state;
    return (
      <div className="App">
        <ToastContainer autoClose={2500} />
        {showModal && (
          <Modal onClick={this.handleModalClose} src={src} tags={alt} />
        )}
        <Searchbar onSubmit={this.onSubmit} />
        {isLoading && <MutatingDots />}
        <ImageGallery hits={hits} onClick={this.handleImageClick} />
        {!lastPage && <Button onClick={this.handleClick} />}
      </div>
    );
  }
}
