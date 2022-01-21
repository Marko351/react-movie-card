import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

const AddMoview = ({ setMovies }) => {
  const [openForm, setOpenForm] = useState(false);
  const [data, setData] = useState({
    imageUrl: '',
    title: '',
    subtitle: '',
    description: '',
    rating: [],
    added: true,
  });
  const [errors, setErrors] = useState({
    forimageUrl: '',
    fortitle: '',
    forsubtitle: '',
    fordescription: '',
  });

  const toggleForm = () => {
    setOpenForm(!openForm);
  };

  const onChangeMovieData = e => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSaveMovie = () => {
    const newErrors = {};

    Object.keys(data).forEach(key => {
      if (!data[key] && key !== 'rating') {
        newErrors[`for${key}`] = `${key} is not allowed to be empty`;
      }
    });

    setErrors(newErrors);

    if (!Object.keys(newErrors).length) {
      setMovies(prevState => {
        const id = prevState.length + 1 + '00';
        const newData = {
          ...data,
          id: +id,
        };
        return [...prevState, newData];
      });
      setData({
        imageUrl: '',
        title: '',
        subtitle: '',
        description: '',
        rating: [],
        added: true,
      });
      setOpenForm(false);
    }
  };

  return (
    <div className="new-movie">
      <button className="btn btn-sm btn-primary" onClick={toggleForm}>
        Add New Movie
      </button>
      {openForm && (
        <Fragment>
          <div className="new-movie--container">
            <span>
              <label htmlFor="imageUrl">Image URL</label>
              <input name="imageUrl" value={data.imageUrl} onChange={onChangeMovieData} />
              {errors.forimageUrl && <small>{errors.forimageUrl}</small>}
            </span>
            <span>
              <label htmlFor="title">Title</label>
              <input name="title" value={data.title} onChange={onChangeMovieData} />
              {errors.fortitle && <small>{errors.fortitle}</small>}
            </span>
            <span>
              <label htmlFor="subtitle">Subtitle</label>
              <input name="subtitle" value={data.subtitle} onChange={onChangeMovieData} />
              {errors.forsubtitle && <small>{errors.forsubtitle}</small>}
            </span>
            <span>
              <label htmlFor="description">Description</label>
              <input name="description" value={data.description} onChange={onChangeMovieData} />
              {errors.fordescription && <small>{errors.fordescription}</small>}
            </span>
          </div>
          <button className="btn btn-sm btn-success" onClick={onSaveMovie}>
            Save
          </button>
        </Fragment>
      )}
    </div>
  );
};

AddMoview.propTypes = {
  setMovies: PropTypes.func.isRequired,
};

export default AddMoview;
