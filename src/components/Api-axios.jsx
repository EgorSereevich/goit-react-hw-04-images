import axios from 'axios';
import { async } from 'q';
const API_KEY = '37771567-c63b0fa1e82728e8a21c21132';

export const getImages = async ({ query, page }) => {
  const {
    data: { hits, total },
  } = await axios(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return { hits, total };
};
