import { Component } from 'react';
import axios from 'axios';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
export class ImageGallery extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.input !== this.props.input) {
      const KEY_PIX = '37771567-c63b0fa1e82728e8a21c21132';
      const fetchImg = axios.get(
        `https://pixabay.com/api/?q=${this.props.input}&page=1&key=${KEY_PIX}&image_type=photo&orientation=horizontal&per_page=12`
      );

      console.log(fetchImg);
    }
  }
  render() {
    return (
      <ul>
        <ImageGalleryItem />
      </ul>
    );
  }
}
