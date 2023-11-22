import React, { useState } from 'react';


const MovieForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    genre: initialData?.genre || '',
    year: initialData?.year || '',
    image: initialData?.image || '',
    director: initialData?.director || '',
    movie_length: initialData?.movie_length || '',
    language: initialData?.language || '',
    rating: initialData?.rating || 1, // Default rating to 1 if not provided
    theater: initialData?.theater || [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTheaterChange = (e) => {
    const selectedTheaters = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value, 10)
    );
    setFormData({ ...formData, theater: selectedTheaters });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      genre: '',
      year: '',
      image: '',
      director: '',
      movie_length: '',
      language: '',
      rating: 1,
      theater: [],
    }); // Clear form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{initialData ? 'Update Movie' : 'Add Movie'}</h3>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />

      <label htmlFor="genre">Genre:</label>
      <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} required />

      <label htmlFor="year">Year:</label>
      <input type="date" id="year" name="year" value={formData.year} onChange={handleChange} required />

      <label htmlFor="image">Image:</label>
      <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} required />

      <label htmlFor="director">Director:</label>
      <input type="text" id="director" name="director" value={formData.director} onChange={handleChange} required />

      <label htmlFor="movie_length">Movie Length:</label>
      <input
        type="text"
        id="movie_length"
        name="movie_length"
        value={formData.movie_length}
        onChange={handleChange}
        required
      />

      <label htmlFor="language">Language:</label>
      <input
        type="text"
        id="language"
        name="language"
        value={formData.language}
        onChange={handleChange}
        required
      />

      <label htmlFor="rating">Rating:</label>
      <input
        type="number"
        id="rating"
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        min="1"
        max="5"
        required
      />

      <label htmlFor="theater">Theater:</label>
      <select
        id="theater"
        name="theater"
        multiple
        value={formData.theater}
        onChange={handleTheaterChange}
        required
      >
        {/* Replace with actual theater options */}
        <option value="1">Theater 1</option>
        <option value="2">Theater 2</option>
      </select>

      <button type="submit">{initialData ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default MovieForm;
