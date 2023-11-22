// AdminMoviesPage.jsx

import React, { useState, useEffect } from "react";
import MovieForm from "./MovieForm";
import Movies from "../Movies/Movies";

const AdminMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // Fetch movies when the component mounts
    fetchAllMovies();
  }, []);

  const fetchAllMovies = async () => {
    try {
      const response = await fetch("http://your-api-url/movies"); // Replace with your actual API endpoint
      if (response.ok) {
        const data = await response.json();
        setMovies(data);
      } else {
        console.error("Failed to fetch movies:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch movies:", error.message);
    }
  };

  const handleAddMovie = async (movieData) => {
    try {
      const response = await fetch("http://your-api-url/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      }); // Replace with your actual API endpoint
      if (response.ok) {
        fetchAllMovies();
      } else {
        console.error("Failed to add movie:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to add movie:", error.message);
    }
  };

  const handleUpdateMovie = async (movieData) => {
    try {
      const response = await fetch(
        `http://your-api-url/movies/${movieData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movieData),
        }
      ); // Replace with your actual API endpoint
      if (response.ok) {
        fetchAllMovies();
        setSelectedMovie(null); // Clear selected movie after updating
      } else {
        console.error("Failed to update movie:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to update movie:", error.message);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      const response = await fetch(`http://your-api-url/movies/${movieId}`, {
        method: "DELETE",
      }); // Replace with your actual API endpoint
      if (response.ok) {
        fetchAllMovies();
      } else {
        console.error("Failed to delete movie:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to delete movie:", error.message);
    }
  };

  const handleEditMovie = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div>
      <h2>Admin Movies Page</h2>
      <MovieForm
        onSubmit={selectedMovie ? handleUpdateMovie : handleAddMovie}
        initialData={selectedMovie}
      />
      <Movies
        movies={movies}
        onEdit={handleEditMovie}
        onDelete={handleDeleteMovie}
      />
    </div>
  );
};

export default AdminMoviesPage;
