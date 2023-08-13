import { React, Component } from 'react';
import PropTypes from 'prop-types';
export class ImageGalleryItem extends Component {
  render() {
    const { id, webformatURL, tags, largeImageURL } = this.props;
    return (
      <li
        onClick={() => this.props.onClick(largeImageURL, tags)}
        className="ImageGalleryItem"
      >
        <img
          src={webformatURL}
          alt={tags}
          className="ImageGalleryItem-image"
          onClick={this.props.onClick}
        />
      </li>
    );
  }
}
ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
};
