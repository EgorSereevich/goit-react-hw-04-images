import { React } from 'react';
import PropTypes from 'prop-types';
export const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  onClick,
}) => {
  return (
    <li
      onClick={() => onClick(largeImageURL, tags)}
      className="ImageGalleryItem"
    >
      <img
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
        onClick={onClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
};
