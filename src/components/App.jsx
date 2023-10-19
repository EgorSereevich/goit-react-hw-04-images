import { React, useState, useEffect } from 'react';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import MutatingDots from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import * as ImageService from './api-axios';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [lastPage, setLastPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [src, setSrc] = useState(null);
  const [alt, setAlt] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getNormalayzedImage = array =>
    array.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  useEffect(() => {
    async function getImages() {
      if (query.trim() === '') {
        return;
      }
      setIsLoading(true);
      try {
        const { hits, total } = await ImageService.getImages({
          page: page,
          query: query,
        });

        if (hits.length === 0) {
          toast.error('Нічого не знайдено', {
            position: 'top-center',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        }
        setHits(prevState => [...prevState, ...getNormalayzedImage(hits)]);
        setLastPage(page >= Math.ceil(total / 12));
      } catch (error) {
        console.log('Error!!');
      } finally {
        setIsLoading(false);
      }
    }
    getImages();
  }, [query, page]);

  const onSubmit = query => {
    setQuery(query);
    setPage(1);
    setHits([]);
  };
  const handleClick = () => {
    setPage(prevState => prevState + 1);
  };
  const handleImageClick = (largeImageURL, tags) => {
    setSrc(largeImageURL);
    setAlt(tags);
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <ToastContainer autoClose={2500} />
      {showModal && <Modal onClick={handleModalClose} src={src} tags={alt} />}
      <Searchbar onSubmit={onSubmit} />
      {isLoading && <MutatingDots />}
      <ImageGallery hits={hits} onClick={handleImageClick} />
      {!lastPage && <Button onClick={handleClick} />}
    </div>
  );
};
