package com.Isaiah.files.finalproject.project.controller;

import java.util.List;
import java.util.Optional;

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
import com.Isaiah.files.finalproject.project.model.RegisteredPayer;
import com.Isaiah.files.finalproject.project.model.Singleton;
import com.Isaiah.files.finalproject.project.model.UnregisteredPayer;
import com.Isaiah.files.finalproject.project.model.User;
import com.Isaiah.files.finalproject.project.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("login/username/{email}/password/{Pword}")
    public ResponseEntity<String> getAllMoviesByTheaterId(@PathVariable(value = "email") String email,
            @PathVariable(value = "Pword") String Pword) {
        User user = userRepository.getByUnameAndPword(email, Pword)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Not found ticketId with username = " + email + " password= " + Pword));
        return new ResponseEntity<>(user.toString(), HttpStatus.OK);
    }

    @PostMapping("/adduser")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        Singleton singleton = Singleton.getOnlyInstance();
        Optional<User> duplicateUser = userRepository.getByUnameAndPword(user.getEmail(), user.getpword());
        if (duplicateUser.isPresent())
            throw new ResourceNotFoundException(
                    "Already user with email = " + user.getEmail());
        userRepository.save(user);
        return new ResponseEntity<>(user.toString(), HttpStatus.CREATED);
    }

}