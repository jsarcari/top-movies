import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import ShowAverage from './ShowAverage';
import axios from "axios";

export default function ShowMovies(props) {
    const genreURL = "https://api.themoviedb.org/3/genre/movie/list?api_key=506fadb0256c13349acc05dabebf9604&language=en-US";

    const [genre, setGenre] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(genreURL).then((response) => {
        setGenre(response.data);
        }).catch(error => {
        setError(error)
        });
    }, []);

    if (error) return `Error: ${error.message}`;
    if (!genre) return "No genres!";

    var genresList = genre;

    function printVote(vote_average) {
        return vote_average.toFixed(1);
    }

    function printMovie(movie) {
        return (
        <tr key={movie.title}>
            <th className="titleMovie"><img src={showBackdrop(movie.backdrop_path)} alt="" className="movie-backdrop"/><p className="title-movie">{`${movie.title}`}</p></th>
            <td>
                <div>{`${movie.overview}`}</div>
                <br />
                <div class="genre"><strong>Genres:</strong> {movie.genre_ids.map(genre => printGenre(genre, movie))}</div>
                <div className="five-stars">
                    <div class="stars">
                        <ShowAverage average={movie.vote_average.toFixed(1)/2}/>
                    </div>
                    <div class="vote-average">{printVote(movie.vote_average.toFixed(1)/2)}/5.0</div>
                </div>
            </td>
        </tr>
        );
    }

    function showBackdrop(backdrop) {
        return "https://image.tmdb.org/t/p/original" + backdrop;
    }

    function printGenre(idGenre, movie) {
        var genreMovie = genresList.genres.find(genre => genre.id === idGenre);
        if (movie.genre_ids.indexOf(idGenre) === movie.genre_ids.length-1) {
            return `${genreMovie.name}`;
        } else {
            return `${genreMovie.name}, `;
        }
    }

    return (
    <div className="table table-dark table-striped">
      <thead className="headerTable">
        <tr>
          <th className="titleMovie" scope="col">Movie</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
          {props.array.map(item => printMovie(item))}
      </tbody>
    </div>
    );
}