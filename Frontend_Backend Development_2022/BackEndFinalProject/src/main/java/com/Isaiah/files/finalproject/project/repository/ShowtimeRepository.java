package com.Isaiah.files.finalproject.project.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Isaiah.files.finalproject.project.model.Movie;
import com.Isaiah.files.finalproject.project.model.Showtime;

public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {
    Optional<List<Showtime>> getByMovie(Movie movie);
}
