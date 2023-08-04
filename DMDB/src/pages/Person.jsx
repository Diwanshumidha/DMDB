import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../utils/api";

const Person = () => {
    const { personid } = useParams();
    const { data, loading } = useFetchData(
        `/person/${personid}?append_to_response=movie_credits%2Cimages&language=en-US`
    );

    // State variable to track the current sort option
    const [sortOption, setSortOption] = useState("popularity");

    // Function to merge and sort movies by popularity in descending order
    const sortMoviesByPopularity = (movies) => {
        const castAndCrew = [...movies.cast, ...movies.crew];
        const uniqueMovies = Array.from(new Set(castAndCrew.map(movie => movie.id)))
            .map(id => castAndCrew.find(movie => movie.id === id));
        return uniqueMovies.sort((a, b) => b.popularity - a.popularity);
    }

    // Function to sort movies by release date in ascending order
    const sortMoviesByDate = (movies) => {
        const castAndCrew = [...movies.cast, ...movies.crew];
        const uniqueMovies = Array.from(new Set(castAndCrew.map(movie => movie.id)))
            .map(id => castAndCrew.find(movie => movie.id === id));
        return uniqueMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
    }

    // Function to sort movies by rating in descending order
    const sortMoviesByRating = (movies) => {
        const castAndCrew = [...movies.cast, ...movies.crew];
        const uniqueMovies = Array.from(new Set(castAndCrew?.map(movie => movie.id)))
            .map(id => castAndCrew.find(movie => movie?.id === id));
        return uniqueMovies.sort((a, b) => b.vote_average - a.vote_average);
    }

    // Function to handle the user's sort option selection
    const handleSortOptionChange = (event) => {
        setSortOption(event.target.value);
    }

    let sortedMovies = [];
    if (data && data.movie_credits) {
        if (sortOption === "popularity") {
            sortedMovies = sortMoviesByPopularity(data.movie_credits);
        } else if (sortOption === "date") {
            sortedMovies = sortMoviesByDate(data.movie_credits);
        } else if (sortOption === "rating") {
            sortedMovies = sortMoviesByRating(data.movie_credits);
        }
    }

    return (
        <div className="min-h-screen text-white container md:px-11 mx-auto h-full pt-[110px]">
            <div>
                <label>
                    Sort by:
                    <select value={sortOption} className="text-black" onChange={handleSortOptionChange}>
                        <option value="popularity">Popularity</option>
                        <option value="date">Date</option>
                        <option value="rating">Rating</option>
                    </select>
                </label>
            </div>
            {console.log(data)}
            {loading ? (
                <p>Loading...</p>
                
            ) : (
                sortedMovies.length > 0 ? (
                    <>
                        <h1>Movies of {data?.name}:</h1>
                        {sortedMovies.map((movie) => {
                            return (
                                <h1 key={movie?.id}>{movie?.title}</h1>
                            )
                        })}
                    </>
                ) : (
                    <p>No movies found for this person.</p>
                )
            )}
        </div>
    )
}

export default Person
