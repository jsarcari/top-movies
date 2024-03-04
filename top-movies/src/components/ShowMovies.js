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
    var orders = [
        {value: 'alphabetical', label: 'A-Z'},
        {value: 'alphabetical-desc', label: 'Z-A'},
        {value: 'best-vote-average', label: 'Best vote average'},
        {value: 'worst-vote-average', label: 'Worst vote average'}
    ]

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

    function constructTable(table) {
        for(var w=0; w<props.array.length; w++) {
            const movie = props.array[w];
            if(movie.genre_ids.includes(valueGenre) || valueGenre === 0) {
                printMovieGenre(movie, table);
            }
        }
    }

    function getValueGenre() {
        var index = document.getElementById("select-genre").value;
        valueGenre = parseInt(index);
        var movies = document.querySelectorAll(".row-movie");
        for(var i=0; i<movies.length; i++) {
            movies[i].remove();
        }
        var table = document.querySelector(".list-movies");
        constructTable(table);
    }

    function getOrder() {
        var order = document.getElementById("select-order").value;
        var movies = props.array;
        var table = document.querySelector(".list-movies");
        var rows = document.querySelectorAll(".row-movie");
        switch(order) {
            case 'alphabetical':
                movies.sort(function(a, b) {
                    if (a.title < b.title) {
                        return -1;
                    } else {
                        return 1;
                    }
                });
                for(var i=0; i<movies.length; i++) {
                    props.array[i] = movies[i];
                }
                break;
            case 'alphabetical-desc':
                movies.sort(function(a, b) {
                    if (a.title > b.title) {
                        return -1;
                    } else {
                        return 1;
                    }
                });
                for(var j=0; j<movies.length; j++) {
                    props.array[j] = movies[j];
                }
                break;
            case 'best-vote-average':
                movies.sort(function(a, b) {
                    if (a.vote_average > b.vote_average) {
                        return -1;
                    } else {
                        return 1;
                    }
                });
                for(var k=0; k<movies.length; k++) {
                    props.array[k] = movies[k];
                }
                break;
            case 'worst-vote-average':
                movies.sort(function(a, b) {
                    if (a.vote_average < b.vote_average) {
                        return -1;
                    } else {
                        return 1;
                    }
                });
                for(var l=0; l<movies.length; l++) {
                    props.array[l] = movies[l];
                }
                break;
        }
        for(var m=0; m<rows.length; m++) {
            rows[m].remove();
        }
        constructTable(table);
    }

    return (
    <div className="table table-dark table-striped">
        <div id="selects">
            <label>Filters:</label>
            <select className="select" id="select-genre" name="select-genre" onChange={getValueGenre}>
                <option value="0" selected>Select the genre</option>
                {genresList.genres.map(genre => <option value={genre.id}>{genre.name}</option>)}
            </select>
            <select className="select" id="select-order" name="select-order" onChange={getOrder}>
                <option value="none" select>Order by</option>
                {orders.map(order => <option value={order.value}>{order.label}</option>)}
            </select>
        </div>
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