import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = "https://www.omdbapi.com?apikey=b8437311";

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('');
  }, []);

  return (
    <div className="App">
      <h1 className="title">OMDB Movie Search</h1>
      <div className='search'>
        <input
          placeholder='Search for Movie Titles'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}>
        </input>
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>
      {
        movies?.length > 0 ?
          (
            <div className='container'>
              { movies.map((movie) => (<MovieCard movie = {movie}/>))}
            </div>
          ) :
          (
            <div className='empty'>
              <h2>No movies found</h2>
            </div>
          )
      }


    </div>
  );
}

export default App;
