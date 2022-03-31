import React from "react";
import { prominent, average } from "color.js";
import { useState } from "react";

const IMG_URL = "https://image.tmdb.org/t/p/w500";
const DEFAULT_IMG_URL =
    "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg";

const MovieCard = ({ movie }) => {
    let release_date = movie.release_date ? movie.release_date : movie.first_air_date;
    if (release_date && release_date.includes("-")) {
        release_date = release_date.split("-")[0];
    }
    let title = movie.title ? movie.title : movie.name;
    let poster = movie.poster_path ? `${IMG_URL}${movie.poster_path}` : DEFAULT_IMG_URL;

    const [imageColour, setImageColour] = useState();
    const [textColour, setTextColour] = useState();

    average(poster, { format: "hex" }).then((colour) => {
        setImageColour(colour);
    });

    // prominent(poster, { amount: 1, format: "hex" }).then((colour) => {
    //     console.log(colour); // [241, 221, 63]
    //     setTextColour(colour);
    // });

    // console.log(imageColour);

    return (
        <div className="movie">
            <div>
                {/* <h3></h3> */}
                <h3>Rating: {movie.vote_average}</h3>
                <p>{movie.overview}</p>
            </div>
            <div>
                <img src={poster} alt={movie.title} />
            </div>
            <div style={{ backgroundColor: imageColour }}>
                <span style={{color:textColour}} >{movie.media_type}</span>
                <h3 style={{color:textColour}} >
                    {title} ({release_date ? release_date : "N/A"})
                </h3>
            </div>
        </div>
    );
};

export default MovieCard;
