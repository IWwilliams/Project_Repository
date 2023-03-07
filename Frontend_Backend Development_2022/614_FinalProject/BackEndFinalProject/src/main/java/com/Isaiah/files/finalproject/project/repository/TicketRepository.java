package com.Isaiah.files.finalproject.project.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Isaiah.files.finalproject.project.model.Showtime;
import com.Isaiah.files.finalproject.project.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Optional<List<Ticket>> getByShowtime(Showtime showtime);
}
