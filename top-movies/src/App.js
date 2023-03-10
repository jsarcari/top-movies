import './App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "https://api.themoviedb.org/3/movie/popular?api_key=506fadb0256c13349acc05dabebf9604&language=en-US";

export default function App() {
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

  console.log(movie);

  return (
    <div className="App">
      <header className="App-header">
        <h1>The most watched movies now</h1>
      </header>
      <p>{movie.title}</p>
    </div>
  );
}
