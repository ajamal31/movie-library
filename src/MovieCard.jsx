import React from "react";

const IMG_URL = "https://image.tmdb.org/t/p/w500";
const DEFAULT_IMG_URL =
    "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg";

const MovieCard = ({ movie }) => {
    console.log(movie);
    let release_date = movie.release_date
        ? movie.release_date
        : movie.first_air_date;
    let title = movie.title ? movie.title : movie.name;
    let poster = movie.poster_path
        ? `${IMG_URL}${movie.poster_path}`
        : DEFAULT_IMG_URL;

    return (
        <div className="movie">
            <div>
                <h3>{release_date}</h3>
                <h3>Rating: {movie.vote_average}</h3>
                <p>{movie.overview}</p>
            </div>
            <div>
                <img src={poster} alt={movie.title} />
            </div>
            <div>
                <span>{movie.media_type}</span>
                <h3>{title}</h3>
            </div>
        </div>
    );
};

export default MovieCard;
