package com.Isaiah.files.finalproject.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Isaiah.files.finalproject.project.model.Theater;

public interface TheaterRepository extends JpaRepository<Theater, Long> {
  List<Theater> findByNameContaining(String name);
}
