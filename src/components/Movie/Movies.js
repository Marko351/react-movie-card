import React, { useEffect, useState } from 'react';

import MovieList from './MovieList';
import MovieService from '../../services/MovieService';
import AddMoview from './AddMovie';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(MovieService.getMovies());
  }, []);

  console.log(movies);
  return (
    <div className="container-fluid" style={{ marginLeft: '-15px' }}>
      <div className="d-flex flex-row">
        <div className="col-sm-12">
          <AddMoview setMovies={setMovies} />
          <MovieList movies={movies} setMovies={setMovies} />
        </div>
      </div>
    </div>
  );
};

export default Movies;
