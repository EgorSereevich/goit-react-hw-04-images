import { React, Component } from 'react';
export class ImageGallery extends Component {
  render() {
    return <ul className="ImageGallery">{this.props.children}</ul>;
  }
}
