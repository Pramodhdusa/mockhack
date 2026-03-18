package com.example.library.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.library.entity.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    List<Movie> findByNameContainingIgnoreCase(String name);
    List<Movie> findByActorsContainingIgnoreCase(String actors);
}