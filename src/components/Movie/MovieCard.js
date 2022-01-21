import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import StarRating from '../StarRating';

const MovieCard = ({ movie, setMovies }) => {
  const [ratingStyle, setRatingStyle] = useState({ display: 'none' });

  const onDeleteMovie = id => {
    setMovies(prevState => {
      const newMovies = prevState.filter(item => item.id !== id);
      setMovies(newMovies);
    });
  };

  const rateMovie = rating => {
    setMovies(prevState => {
      const newMovies = prevState.map(item => {
        if (item.id === movie.id) {
          item.rating = [...item.rating, rating];
          return item;
        }
        return item;
      });

      return newMovies;
    });
  };

  const starsRating = useMemo(() => {
    const sum = movie.rating.reduce((acc, item) => acc + item);
    return Number(sum / movie.rating.length).toFixed(1);
  }, [movie.rating.length]);

  return (
    <div className="movie-card">
      <div className="movie-card card">
        <img className="card-img-top" src={movie.imageUrl} alt="" />
        <div className="card-body">
          <h4 className="card-title">{movie.title}</h4>
          <h6 className="card-subtitle mb-2 text-muted">{movie.subtitle}</h6>
          <p className="text-justify" style={{ fontSize: '14px' }}>
            {movie.description}
          </p>
        </div>
        {movie.added && (
          <div className="card-actions">
            <button onClick={() => onDeleteMovie(movie.id)}>Delete Movie</button>
          </div>
        )}
        <div className="card-footer">
          <div className="clearfix">
            <div className="float-left mt-1">
              <StarRating rating={starsRating} rateMovie={rateMovie} />
            </div>
            <div
              className="card-footer-badge float-right badge badge-primary badge-pill"
              onMouseEnter={() => setRatingStyle({ display: 'block' })}
              onMouseLeave={() => setRatingStyle({ display: 'none' })}
            >
              {starsRating}
            </div>
            <span style={ratingStyle}>{movie.rating.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

MovieCard.defaultProps = {
  movie: {},
};

MovieCard.propTypes = {
  movie: PropTypes.object,
  setMovies: PropTypes.func.isRequired,
};

export default MovieCard;
