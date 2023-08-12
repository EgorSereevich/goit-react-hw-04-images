import { React, Component } from 'react';
import axios from 'axios';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import MutatingDots from '../Loader/Loader';

export class Searchbar extends Component {
  state = {
    page: 1,
    input: '',
    data: [],
    showModal: false,
    status: 'idle',
    largeImageURL: '',
  };
  handleChange = evt => {
    this.setState({ input: evt.target.value });
  };
  handleSubmit = async evt => {
    this.setState(prevState => ({ status: 'loading' }));
    evt.preventDefault();
    const KEY_PIX = '37771567-c63b0fa1e82728e8a21c21132';
    const fetchImg = await axios.get(
      `https://pixabay.com/api/?q=${this.state.input}&page=${this.state.page}&key=${KEY_PIX}&image_type=photo&orientation=horizontal&per_page=12`
    );

    this.setState(prevState => ({
      data: [...prevState.data, ...fetchImg.data.hits],
    }));
    this.setState(prevState => ({ page: prevState.page + 1 }));

    this.setState(prevState => ({ status: 'render' }));
  };
  toggleModal = evt => {
    {
      !this.state.showModal &&
        this.setState(prevState => ({ largeImageURL: evt.target.alt }));
    }

    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { data, showModal, page, status, largeImageURL } = this.state;
    return (
      <div>
        {showModal && (
          <Modal toggleModal={this.toggleModal}>
            <img src={largeImageURL} alt="" loading="lazy" />
          </Modal>
        )}

        <div>
          <header>
            <form onSubmit={this.handleSubmit}>
              <button type="submit">
                <span>Search</span>
              </button>

              <input
                type="text"
                placeholder="Search images and photos"
                name="input"
                onChange={this.handleChange}
              />
            </form>
          </header>
        </div>
        <div>
          <ul>
            {data.map(img => {
              return (
                <li key={img.id}>
                  <img
                    src={img.previewURL}
                    alt={img.largeImageURL}
                    onClick={this.toggleModal}
                  />
                </li>
              );
            })}
          </ul>
          {status === 'loading' && <MutatingDots />}
          {page !== 1 && <Button onClick={this.handleSubmit} />}
        </div>
      </div>
    );
  }
}
