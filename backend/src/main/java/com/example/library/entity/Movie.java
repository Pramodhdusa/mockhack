package com.example.library.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "movie")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String actors;

    @Column(length = 1000)
    private String description;

    private String genre;
    private Double rating;

    @Column(length = 1000)
    private String reviews;

    // Getters & Setters
    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getActors() { return actors; }
    public void setActors(String actors) { this.actors = actors; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public String getReviews() { return reviews; }
    public void setReviews(String reviews) { this.reviews = reviews; }
}