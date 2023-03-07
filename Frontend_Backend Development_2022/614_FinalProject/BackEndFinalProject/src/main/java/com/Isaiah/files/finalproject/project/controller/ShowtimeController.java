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
import com.Isaiah.files.finalproject.project.model.Showtime;
import com.Isaiah.files.finalproject.project.repository.MovieRepository;
import com.Isaiah.files.finalproject.project.repository.ShowtimeRepository;
import com.Isaiah.files.finalproject.project.repository.TheaterRepository;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/showtime")
public class ShowtimeController {

    @Autowired
    private TheaterRepository theaterRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ShowtimeRepository showtimeRepository;

    @GetMapping("movie/{movieId}")
    public ResponseEntity<List<String>> getAllShowtimesByMovieId(@PathVariable(value = "movieId") Long movieId) {
        Optional<Movie> movie = movieRepository.findById(movieId);
        if (!movie.isPresent()) {
            throw new ResourceNotFoundException("Not found movie with id = " + movieId);
        }
        Optional<List<Showtime>> showtimes = showtimeRepository.getByMovie(movie.get());
        if (!showtimes.isPresent())
            throw new ResourceNotFoundException("Not found showtimes corresponding with the movie id = " + movieId);

        List<String> showtimeStrings = new ArrayList<String>();
        for (Showtime inst : showtimes.get()) {

            showtimeStrings.add(inst.toString());
        }
        return new ResponseEntity<>(showtimeStrings, HttpStatus.OK);
    }

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
