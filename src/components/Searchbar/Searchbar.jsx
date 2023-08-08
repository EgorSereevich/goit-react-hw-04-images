import { Component } from 'react';
import axios from 'axios';
export class Searchbar extends Component {
  state = {
    search: '',
    statusSerch: true,
    loadImages: [],
    page: 1,
    perpage: 12,
  };
  async onSearch() {
    const KEY_PIX = '37771567-c63b0fa1e82728e8a21c21132';
    const fetchImages = await axios.get(
      `https://pixabay.com/api/?q=${this.state.search}&page=${this.state.page}&key=${KEY_PIX}&image_type=photo&orientation=horizontal&per_page=${this.state.perpage}`
    );
    this.setState(prevState => ({
      loadImages:
        this.state.page === 1
          ? fetchImages.data.hits
          : [fetchImages.data.hits, ...prevState.loadImages],
    }));
  }
  headleInput = e => {
    const searchImages = e.target.value;
    this.setState({ search: searchImages });
    console.log(this.state.search);
  };
  onSubmit = evt => {
    evt.preventDefault();
    this.onSearch();
  };
  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.onSearch();
  };

  render() {
    const { loadImages } = this.state;
    return (
      <div>
        <div>
          <form action="" onSubmit={this.onSubmit}>
            <input type="text" name="search" onChange={this.headleInput} />
            <button type="submit">Search</button>
          </form>
        </div>
        <div>
          <ul>
            {loadImages.map(img => {
              return (
                <li key={img.id}>
                  <img src={img.previewURL} alt="" />
                </li>
              );
            })}
          </ul>
        </div>
        <button type="button" onClick={this.loadMoreImages}>
          Load More Images
        </button>
      </div>
    );
  }
}
