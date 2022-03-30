import React from "react";

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie }) => {
    console.log(movie);
    return (
        <div className="movie">
            <div>
                <p>{movie.Year}</p>
            </div>
            <div>
                <img src={`${IMG_URL}${movie.poster_path}`} alt={movie.title} />
            </div>
            <div>
                <span>{movie.Type}</span>
                <h3>{movie.title}</h3>
            </div>
        </div>
    );
};

export default MovieCard;
