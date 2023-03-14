import './App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

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

  function showMovies(movies) {
    return <div>
      {movies.results.map(item => <p key={item.title}>{`${item.title}`}</p>)}
    </div>
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>The most watched movies now</h1>
        <div>{showMovies(movies)}</div>
      </header>
    </div>
  );
}
