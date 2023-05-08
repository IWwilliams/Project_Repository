package com.Isaiah.files.finalproject.project.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Isaiah.files.finalproject.project.exception.ResourceNotFoundException;
import com.Isaiah.files.finalproject.project.model.Movie;
import com.Isaiah.files.finalproject.project.model.Theater;
import com.Isaiah.files.finalproject.project.repository.TheaterRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/theater")
public class TheaterController {

  @Autowired
  TheaterRepository theaterRepository;

  @GetMapping("/theaters")
  public ResponseEntity<List<String>> getAllTheaters(@RequestParam(required = false) String title) {
    List<Theater> theaters = theaterRepository.findAll();
    if (theaters.isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    List<String> theaterStrings = new ArrayList<String>();
    for (Theater inst : theaters) {
      theaterStrings.add(inst.toString());
    }
    return new ResponseEntity<>(theaterStrings, HttpStatus.OK);
  }

  // @GetMapping("/theaters/{id}")
  // public ResponseEntity<Theater> getTheaterById(@PathVariable("id") long id) {
  // Theater theater = theaterRepository.findById(id)
  // .orElseThrow(() -> new ResourceNotFoundException("Not found Theater with id =
  // " + id));
  // return new ResponseEntity<>(theater, HttpStatus.OK);
  // }
}
