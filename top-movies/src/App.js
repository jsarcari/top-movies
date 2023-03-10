import './App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "https://api.themoviedb.org/3/movie/popular?api_key=506fadb0256c13349acc05dabebf9604&language=en-US";

function showMovies(movies) {
  for (var item in movies.results) {
    <p>{movies.results[item].title}</p>
    //includeContainer(json.results[item].title, json.results[item].overview);
  }
}

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

  var movies = movie;

  return (
    <div className="App">
      <header className="App-header">
        <h1>The most watched movies now</h1>
        {showMovies(movies)}
      </header>
    </div>
  );
}
