import React from "react";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./App.css";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "83f43ba8ffc90fdc14a69548089ce760";
const API_URL = "https://api.themoviedb.org/3/search/multi?api_key=83f43ba8ffc90fdc14a69548089ce760";
const DAILY_TRENDING_URL = `${BASE_URL}/trending/all/day?api_key=${API_KEY}`;

const App = () => {
    const [movies, setMovies] = useState();
    const [dailyTrending, setDailyTrending] = useState();
    const [subTitle, setSubTitle] = useState();

    const searchMovies = async (title) => {
        if (title) {
            const response = await fetch(`${API_URL}&query=${title}`);
            const data = await response.json();
            setMovies(data.results);
            setSubTitle(`Search results for '${title}'`);
        } else {
            setMovies(dailyTrending);
            setSubTitle("Today's Trending Movies & TV Shows");
        }
    };

    const getDailyTrending = async () => {
        const response = await fetch(DAILY_TRENDING_URL);
        const data = await response.json();
        setDailyTrending(data.results);
        setMovies(data.results);
        setSubTitle("Trending Movies & TV Shows");
    };

    useEffect(() => {
        getDailyTrending();
    }, []);

    return (
        <div className="app">
            <div className="search">
                <input id="keywords" placeholder="Search..." onChange={(e) => searchMovies(e.target.value)} />
            </div>
            {movies?.length > 0 ? (
                <>
                    <h2>{subTitle}</h2>
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
