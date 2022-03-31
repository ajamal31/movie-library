import React from "react";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "83f43ba8ffc90fdc14a69548089ce760";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const DEFAULT_IMG_URL = "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg";
const IMDB_URL = "https://www.imdb.com/title";

const MovieCard = ({ movie }) => {
    let release_date = movie.release_date ? movie.release_date : movie.first_air_date;
    if (release_date && release_date.includes("-")) {
        release_date = release_date.split("-")[0];
    }
    let title = movie.title ? movie.title : movie.name;
    let poster = movie.poster_path ? `${IMG_URL}${movie.poster_path}` : DEFAULT_IMG_URL;

    const openInfo = async () => {
        const response = await fetch(`${BASE_URL}/${movie.media_type}/${movie.id}?api_key=${API_KEY}&language=en-US`);
        const data = await response.json();

        let externalUrl = data.homepage;
        if (!externalUrl) {
            if (movie.media_type === "movie") externalUrl = `${IMDB_URL}/${data.imdb_id}`;
        }

        window.open(externalUrl);
    };

    return (
        <div className="movie" onClick={openInfo}>
            <div>
                <h3>Rating: {movie.vote_average}</h3>
                <p>{movie.overview}</p>
            </div>
            <div>
                <img src={poster} alt={movie.title} />
            </div>
            <div>
                <span>{movie.media_type}</span>
                <h3>
                    {title} ({release_date ? release_date : "N/A"})
                </h3>
            </div>
        </div>
    );
};

export default MovieCard;
