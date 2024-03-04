import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/ShowMovies';
import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowMovies from './components/ShowMovies';

export default function App() {
  const baseURL = "https://api.themoviedb.org/3/movie/popular?api_key=506fadb0256c13349acc05dabebf9604&language=en-US";
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setMovie(response.data);
    }).catch(error => {
      setError(error)
    });
  }, []);

  if (error) return `Error: ${error.message}`;
  if (!movie) return "No movies!";

  var movies = movie;

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Top movies today</h1>
        <div><ShowMovies array={movies.results} value={0} /></div>
      </header>
    </div>
  );
}
