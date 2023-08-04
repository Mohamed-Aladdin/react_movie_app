import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from "./search.svg";
import { useState, useEffect } from 'react';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&`;
const API_INITIAL_QUERY = process.env.REACT_APP_INITIAL_QUERY;

// const movie1 = {
//     "Title": "Avengers: Endgame",
//     "Year": "2019",
//     "imdbID": "tt4154796",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg"
// }

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const res = await fetch(`${API_URL}s=${title}`);
    const data = await res.json();
    console.log(data.Search);

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies(API_INITIAL_QUERY);
  }, []);

  return (
    <div className='app'>
      <h1>MovieLand</h1>

      <div className='search'>
        <input
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <img
          src={SearchIcon}
          alt='search'
          onClick={() => {
            searchMovies(searchTerm);
          }}
        />
      </div>
        
      {
        movies?.length > 0
          ? (
            <div className='container'>
              {movies.map((movie) => {
                return <MovieCard movie={movie} />
              })}
            </div>
          ) : (
            <div className='empty'>
              <h2>No movies found!</h2>
            </div>
          )
      }
    </div>
  );
}

export default App;
