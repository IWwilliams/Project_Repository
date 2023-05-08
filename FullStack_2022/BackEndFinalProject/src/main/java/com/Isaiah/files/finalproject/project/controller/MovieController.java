package com.Isaiah.files.finalproject.project.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Isaiah.files.finalproject.project.exception.ResourceNotFoundException;
import com.Isaiah.files.finalproject.project.model.Movie;
import com.Isaiah.files.finalproject.project.repository.MovieRepository;
import com.Isaiah.files.finalproject.project.repository.TheaterRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/movie")
public class MovieController {

  @Autowired
  private TheaterRepository theaterRepository;

  @Autowired
  private MovieRepository movieRepository;

  @GetMapping("/theater/{theaterId}")
  public ResponseEntity<List<String>> getAllMoviesByTheaterId(@PathVariable(value = "theaterId") Long theaterId) {
    if (!theaterRepository.existsById(theaterId))
      throw new ResourceNotFoundException("Not found Theater with id = " + theaterId);
    List<Movie> movies = movieRepository.findByTheaterId(theaterId);
    List<String> movieStrings = new ArrayList<String>();
    for (Movie inst : movies) {
      movieStrings.add(inst.toString());
    }
    return new ResponseEntity<>(movieStrings, HttpStatus.OK);
  }

  // @GetMapping("/movies/{id}")
  // public ResponseEntity<String> getMoviesByNameId(@PathVariable(value = "id")
  // Long id) {
  // Movie movie = movieRepository.findById(id)
  // .orElseThrow(() -> new ResourceNotFoundException("Not found Movie with id = "
  // + id));
  // return new ResponseEntity<>(movie.toString(), HttpStatus.OK);
  // }

  // @PostMapping("/theaters/{theaterId}/movies")
  // public ResponseEntity<Movie> createMovie(@PathVariable(value = "theaterId")
  // Long theaterId,
  // @RequestBody Movie movieRequest) {
  // Movie movie = theaterRepository.findById(theaterId).map(theater -> {
  // movieRequest.setTheater(theater);
  // return movieRepository.save(movieRequest);
  // }).orElseThrow(() -> new ResourceNotFoundException("Not found Theater with id
  // = " + theaterId));
  // return new ResponseEntity<>(movie, HttpStatus.CREATED);
  // }

  // @PutMapping("/movies/{id}")
  // public ResponseEntity<Movie> updateMovie(@PathVariable("id") long id,
  // @RequestBody Movie movieRequest) {
  // Movie movie = movieRepository.findById(id)
  // .orElseThrow(() -> new ResourceNotFoundException("MovieId " + id + "not
  // found"));

  // movie.setName(movieRequest.getName());

  // return new ResponseEntity<>(movieRepository.save(movie), HttpStatus.OK);
  // }

  // @DeleteMapping("/movies/{id}")
  // public ResponseEntity<HttpStatus> deleteMovie(@PathVariable("id") long id) {
  // movieRepository.deleteById(id);

  // return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  // }

  // @DeleteMapping("/theaters/{theaterId}/movies")
  // public ResponseEntity<List<Movie>> deleteAllMoviesOfTheater(
  // @PathVariable(value = "theaterId") Long theaterId) {
  // if (!theaterRepository.existsById(theaterId)) {
  // throw new ResourceNotFoundException("Not found Theater with id = " +
  // theaterId);
  // }

  // movieRepository.deleteByTheaterId(theaterId);
  // return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  // }
}
