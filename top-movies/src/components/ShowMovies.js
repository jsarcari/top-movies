import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

export default function ShowMovies(props) {
    function showBackdrop(backdrop) {
        return "https://image.tmdb.org/t/p/original" + backdrop;
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
          {props.array.map(item => <tr key={item.title}>
                <th className="titleMovie"><img src={showBackdrop(item.backdrop_path)} alt="" className="movie-backdrop"/><p className="title-movie">{`${item.title}`}</p></th>
                <td>{`${item.overview}`}</td>
            </tr>)}
      </tbody>
    </div>
    );
}