package com.Isaiah.files.finalproject.project.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Isaiah.files.finalproject.project.model.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {
  List<Movie> findByTheaterId(Long postId);
}
