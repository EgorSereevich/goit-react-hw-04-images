import { Component } from 'react';
import axios from 'axios';
export class Searchbar extends Component {
  state = {
    search: '',
    images: {},
  };
  async onSearch() {
    const KEY_PIX = '37771567-c63b0fa1e82728e8a21c21132';
    const axiosSerch = await axios.get(
      `https://pixabay.com/api/?q=${this.state.search}&page=1&key=${KEY_PIX}&image_type=photo&orientation=horizontal&per_page=12`
    );
    this.setState({ images: axiosSerch });
    console.log(this.state.images);
  }
  onSubmit = evt => {
    evt.preventDefault();
    const searchImages = evt.currentTarget.search.value;
    this.setState({ search: searchImages });
    this.onSearch();
  };
  render() {
    return (
      <div>
        <div>
          <form action="" onSubmit={this.onSubmit}>
            <input type="text" name="search" />
            <button type="submit">Search</button>
          </form>
        </div>
        {/* <div>
          <ul>
            {axiosSerch.map(img => {
              return (
                // <li>
                //   <img src="" alt="" />
                // </li>
              );
            })}
          </ul>
        </div> */}
      </div>
    );
  }
}
