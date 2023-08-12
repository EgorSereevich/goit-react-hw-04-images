import { React, Component } from 'react';
import { createPortal } from 'react-dom';
const ModalRoot = document.querySelector('#modal_root');
export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.heandleKayDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.heandleKayDown);
  }
  heandleKayDown = evt => {
    if (evt.code === 'Escape') {
      this.props.toggleModal();
    }
  };
  headleBeackDrop = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.toggleModal();
    }
  };
  render() {
    return createPortal(
      <div className="Overlay" onClick={this.headleBeackDrop}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      ModalRoot
    );
  }
}
