import React from "react";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./App.css";

// const API_URL = "https://www.omdbapi.com?apikey=79f91863";
const API_URL =
    "https://api.themoviedb.org/3/search/multi?api_key=83f43ba8ffc90fdc14a69548089ce760";
const TOP_MOVIES_URL =
    "https://api.themoviedb.org/3/movie/popular?api_key=83f43ba8ffc90fdc14a69548089ce760&language=en-US&page=1";

const App = () => {
    const [movies, setMovies] = useState();

    const searchMovies = async (title) => {
        if (title) {
            const response = await fetch(`${API_URL}&query=${title}`);
            const data = await response.json();
            setMovies(data.results);
        } else {
            const response = await fetch(TOP_MOVIES_URL);
            const data = await response.json();
            setMovies(data.results);
        }
    };

    useEffect(() => {
        searchMovies(null);
    }, []);

    return (
        <div className="app">
            <h1>Television Library</h1>
            <div className="search">
                <input
                    placeholder="Search for movies"
                    onChange={(e) => searchMovies(e.target.value)}
                />
                <input type="checkbox" id="" name="" value=""></input>
                <p>Movies</p>
                <input type="checkbox" id="" name="" value=""></input>
                <p>TV Shows</p>
            </div>
            {movies?.length > 0 ? (
                <>
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie}></MovieCard>
                        ))}
                    </div>
                </>
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}
        </div>
    );
};

export default App;
