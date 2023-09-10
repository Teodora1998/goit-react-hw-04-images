import css from './App.module.css';
import { imgSearch } from './api/apiPixabay';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { useState, useEffect } from 'react';

export const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(1);
  const [empty, setEmpty] = useState(false);
  const [page, setPage] = useState(1);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (search.trim().length === 0) {
        setEmpty(true);
        setNoResults(false);
        return;
      }

      setIsLoading(true);
      setEmpty(false);
      setPage(1);
      setError(null);

      try {
        const data = await imgSearch(search, 1);
        if (data.hits.length === 0) {
          setNoResults(true);  
        } else {
          setNoResults(false);  
          setImages(data.hits);
          setTotal(data.total); 
        }
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [search]);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setIsLoading(true);
    try {
      const data = await imgSearch(search, nextPage);
      setImages(prevImages => [...prevImages, ...data.hits]);
      setPage(nextPage);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const openModal = id => {
    setModalIsVisible(true);
    setSelectedImage(id);
  };

  const closeModal = () => {
    setModalIsVisible(false);
    setSelectedImage(null);
  };

  return (
    <div className={css.App}>
      <Searchbar onSearch={setSearch} />
      {empty && <p className={css.empty}>Please enter a search term!</p>}
      {noResults && <p className={css.empty}>No results found!</p>}  
      {error && <p>Oops! Something went wrong: {error.message}</p>}
      {isLoading && <Loader />}
      {images.length > 0 && (
        <ImageGallery openModal={openModal} images={images} />
      )}
      {total / 12 > page && <Button onClickLoadMore={handleLoadMore} />}
      {modalIsVisible && selectedImage && (
        <Modal
          openModal={openModal}
          imageURL={selectedImage.largeImageURL}
          tag={selectedImage.tags}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};
