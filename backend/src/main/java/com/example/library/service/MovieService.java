package com.example.library.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.library.entity.Movie;
import com.example.library.repository.MovieRepository;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }

    public Movie updateMovie(Long id, Movie movie) {
        Movie existing = movieRepository.findById(id).orElseThrow();
        existing.setName(movie.getName());
        existing.setActors(movie.getActors());
        existing.setDescription(movie.getDescription());
        existing.setGenre(movie.getGenre());
        existing.setRating(movie.getRating());
        existing.setReviews(movie.getReviews());
        return movieRepository.save(existing);
    }

    public List<Movie> searchByName(String name) {
        return movieRepository.findByNameContainingIgnoreCase(name);
    }
}