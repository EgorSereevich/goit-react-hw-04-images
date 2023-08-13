import { React, Component } from 'react';
import PropTypes from 'prop-types';
export class ImageGalleryItem extends Component {
  render() {
    const hits = this.props.hits;
    return (
      <div>
        {hits.map(({ id, webformatURL, tags, largeImageURL }) => {
          return (
            <li
              key={id}
              onClick={() => this.props.onClick(largeImageURL, tags)}
              className="ImageGalleryItem"
            >
              <img
                src={webformatURL}
                alt={tags}
                className="ImageGalleryItem-image"
              />
            </li>
          );
        })}
      </div>
    );
  }
}
ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
};
