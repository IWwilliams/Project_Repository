package com.Isaiah.files.finalproject.project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.Isaiah.files.finalproject.project.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("Select u from User u WHERE email = ?1 and Pword = ?2")
    Optional<User> getByUnameAndPword(String email, String Pword);
}
