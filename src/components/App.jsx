import { React, Component } from 'react';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import MutatingDots from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export class App extends Component {
  state = {
    page: 1,
    input: '',
    data: [],
    showModal: false,
    status: 'idle',
    largeImageURL: '',
  };
  onInputName = inputName => {
    this.setState({ input: inputName });
  };
  render() {
    const { data, showModal, page, status, largeImageURL, input } = this.state;
    return (
      <div>
        <ToastContainer />
        {showModal && (
          <Modal toggleModal={this.toggleModal}>
            <img src={largeImageURL} alt="" loading="lazy" />
          </Modal>
        )}
        <Searchbar onInput={this.onInputName} />

        <div>
          <ImageGallery input={input} />
          {status === 'loading' && <MutatingDots />}
          {page !== 1 && <Button onClick={this.handleSubmit} />}
        </div>
      </div>
    );
  }
}
