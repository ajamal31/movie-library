import React from "react";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./App.css";

// const API_URL = "https://www.omdbapi.com?apikey=79f91863";
const API_URL = "https://api.themoviedb.org/3/search/multi?api_key=83f43ba8ffc90fdc14a69548089ce760"

const App = () => {
    const [movies, setMovies] = useState();

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&query=${title}`);
        const data = await response.json();
        // console.log(data.results);
        setMovies(data.results);
    };

    useEffect(() => {
        searchMovies('superman');
    }, []);

    return (
        <div className="app">
            <h1>Movie Library</h1>
            <div className="search">
                <input
                    placeholder="Search for movies"
                    onChange={(e) => searchMovies(e.target.value)}
                />
            </div>
            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie}></MovieCard>
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}
        </div>
    );
};

export default App;
