import { React } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
export const ImageGallery = ({ hits, onClick }) => {
  return (
    <div>
      <ul className="ImageGallery">
        {hits.map(({ id, webformatURL, tags, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
              largeImageURL={largeImageURL}
              onClick={onClick}
            />
          );
        })}
      </ul>
    </div>
  );
};
