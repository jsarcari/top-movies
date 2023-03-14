import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    return <div className="table table-dark table-striped">
      <thead className="headerTable">
        <tr>
          <th className="titleMovie" scope="col">Title</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
          {movies.results.map(item => <tr key={item.title}><th className="titleMovie">{`${item.title}`}</th><td>{`${item.overview}`}</td></tr>)}
      </tbody>
    </div>
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">The most watched movies currently</h1>
        <div>{showMovies(movies)}</div>
      </header>
    </div>
  );
}
