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
    var valueGenre = props.value;

    function printMovie(movie) {
        return (<tr key={movie.title} className="row-movie">
            <th className="titleMovie"><img src={showBackdrop(movie.backdrop_path)} alt="" className="movie-backdrop"/><p className="title-movie">{`${movie.title}`}</p></th>
            <td>
                <div>{`${movie.overview}`}</div>
                <div className="genre"><strong>Genres:</strong> {movie.genre_ids.map(genre => printGenre(genre, movie, false))}</div>
                <div className="five-stars">
                    <div className="stars">
                        <ShowAverage average={movie.vote_average.toFixed(1)/2}/>
                    </div>
                    <div className="vote-average">{movie.vote_average.toFixed(1)/2}/5.0</div>
                </div>
            </td>
        </tr>);
    }

    function showBackdrop(backdrop) {
        return "https://image.tmdb.org/t/p/original" + backdrop;
    }

    function printGenre(idGenre, movie, boolean) {
        var genreMovie = genresList.genres.find(genre => genre.id === idGenre);
        if (movie.genre_ids.indexOf(idGenre) === movie.genre_ids.length-1 || boolean === true) {
            return ` ${genreMovie.name}`;
        } else {
            return ` ${genreMovie.name},`;
        }
    }

    function printMovieGenre(movie, table) {
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        let img = new Image();
        img.src = showBackdrop(movie.backdrop_path);
        var p = document.createElement("p");
        var td = document.createElement("td");
        var overview = document.createElement("div");
        var genre = document.createElement("div");
        var fiveStars = document.createElement("div");
        var stars = document.createElement("div");
        var rating = document.createElement("METER");
        var votes = document.createElement("div");
        tr.classList.add("row-movie");
        th.classList.add("titleMovie");
        img.classList.add("movie-backdrop");
        p.classList.add("title-movie");
        genre.classList.add("genre");
        fiveStars.classList.add("five-stars");
        stars.classList.add("stars");
        rating.classList.add("average-rating");
        votes.classList.add("vote-average");
        table.appendChild(tr);
        tr.appendChild(th);
        tr.appendChild(td);
        th.appendChild(img);
        th.appendChild(p);
        td.appendChild(overview);
        td.appendChild(genre);
        td.appendChild(fiveStars);
        fiveStars.appendChild(stars);
        fiveStars.appendChild(votes);
        stars.appendChild(rating);
        p.textContent = movie.title;
        overview.textContent = movie.overview;
        genre.innerHTML = '<strong>Genres: </strong>' + movie.genre_ids.map(genre => printGenre(genre, movie, true)) + ' ';
        rating.setAttribute("min", "0");
        rating.setAttribute("max", "5");
        rating.setAttribute("value", movie.vote_average.toFixed(1)/2);
        rating.title = "The movie's average based on all of the The Movie DB user ratings.";
        rating.style.setProperty('--percent', `calc(${movie.vote_average.toFixed(1)/2}/5*100%)`);
        votes.innerHTML = movie.vote_average.toFixed(1)/2 + '/5.0';
    }

    function getValueGenre() {
        var index = document.getElementById("select-genre").value;
        valueGenre = parseInt(index);
        console.log(valueGenre);
        var movies = document.querySelectorAll(".row-movie");
        for(var i=0; i<movies.length; i++) {
            movies[i].remove();
        }
        var table = document.querySelector(".list-movies");
        for(var j=0; j<props.array.length; j++) {
            const movie = props.array[j];
            if(movie.genre_ids.includes(valueGenre) || valueGenre === 0) {
                printMovieGenre(movie, table);
            }
        }
    }

    return (
    <div className="table table-dark table-striped">
      <select className="select" id="select-genre" name="select-genre" onChange={getValueGenre}>
        <option value="0" selected>Select the genre</option>
        {genresList.genres.map(genre => <option value={genre.id}>{genre.name}</option>)}
      </select>
      <thead>
        <tr>
          <th className="titleMovie" scope="col">Movie</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody className="list-movies">
          {props.array.map(item => printMovie(item))}
      </tbody>
    </div>
    );
}