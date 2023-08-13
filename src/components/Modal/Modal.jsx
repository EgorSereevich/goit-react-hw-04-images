import { React, Component } from 'react';
import PropTypes from 'prop-types';
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
      this.props.onClick();
    }
  };
  headleBeackDrop = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClick();
    }
  };
  render() {
    return createPortal(
      <div className="Overlay" onClick={this.headleBeackDrop}>
        <div className="Modal">
          <img
            src={this.props.src}
            alt={this.props}
            width="900"
            height="900"
            onClick={this.props.onClick}
          />
        </div>
      </div>,
      ModalRoot
    );
  }
}
Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
};
