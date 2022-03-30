import React from "react";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./App.css";

// const API_URL = "https://www.omdbapi.com?apikey=79f91863";
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "83f43ba8ffc90fdc14a69548089ce760";
const API_URL =
    "https://api.themoviedb.org/3/search/multi?api_key=83f43ba8ffc90fdc14a69548089ce760";
const TOP_MOVIES_URL =
    "https://api.themoviedb.org/3/movie/popular?api_key=83f43ba8ffc90fdc14a69548089ce760&language=en-US&page=1";
const DAILY_TRENDING_URL = `${BASE_URL}/trending/all/day?api_key=${API_KEY}`;
const WEEKLY_TRENDING_URL = `${BASE_URL}/trending/all/week?api_key=${API_KEY}`;

const App = () => {
    const [movies, setMovies] = useState();
    const [parameters, setParameters] = useState();
    const [dailyTrending, setDailyTrending] = useState();
    const [subTitle, setSubTitle] = useState();

    const searchMovies = async (title) => {
        if (title) {
            const response = await fetch(`${API_URL}&query=${title}`);
            const data = await response.json();
            setMovies(data.results);
            setSubTitle("");
        } else {
            setMovies(dailyTrending);
            setSubTitle("Today's Trending Movies & TV Shows");
        }
    };

    const getDailyTrending = async () => {
        const response = await fetch(DAILY_TRENDING_URL);
        const data = await response.json();
        // console.log(data.results);
        setDailyTrending(data.results);
        setMovies(data.results);
        setSubTitle("Today's Trending Movies & TV Shows");
    };

    useEffect(() => {
        getDailyTrending();
    }, []);

    return (
        <div className="app">
            <h1>Movies & TV Shows</h1>
            <div className="search">
                <input
                    id="keywords"
                    placeholder="Search"
                    onChange={(e) => searchMovies(e.target.value)}
                />
                {/* <input type="checkbox" id="" name="" value=""></input>
                <p>Movies</p>
                <input type="checkbox" id="" name="" value=""></input>
                <p>TV Shows</p> */}
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