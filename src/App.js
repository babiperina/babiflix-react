import React, { useEffect, useState } from "react";

import MovieCard from "./MovieCard"
import SearchIcon from "./search.svg";

import "./App.css";

// http://www.omdbapi.com/apikey.aspx?VERIFYKEY=716a3e00-0726-4c03-b981-59f4e7b78676
// 5f67c84c

const API_URL = 'http://www.omdbapi.com?apikey=5f67c84c';

const App = () => {
    const [searchTitle, setSearchTitle] = useState('');
    const [movies, setMovies] = useState([]);
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(()=>{
        searchMovies('Batman');
    },[]);

    return (
        <div className="app">
            <h1>Babiflix</h1>

            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value={searchTitle}
                    onChange={(e)=>setSearchTitle(e.target.value)}
                />

                <img 
                    src={SearchIcon}
                    alt="search"   
                    onClick={()=>searchMovies(searchTitle)} 
                />
            </div>

            {
                movies?.length > 0 ?
                (
                    <div className="container">
                        {
                            movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))
                        }
                    </div>
                ) :
                (
                   <div className="empty">
                        <h2>No movies found.</h2>
                   </div>
                )
            }

        </div>
    );
}

export default App;