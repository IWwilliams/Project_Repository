package com.Isaiah.files.finalproject.project.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
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
import com.Isaiah.files.finalproject.project.model.Showtime;
import com.Isaiah.files.finalproject.project.model.Ticket;
import com.Isaiah.files.finalproject.project.repository.ShowtimeRepository;
import com.Isaiah.files.finalproject.project.repository.TicketRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/ticket")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private ShowtimeRepository showtimeRepository;

    @GetMapping("showtime/{showtimeId}")
    public ResponseEntity<List<String>> getAllTicketsByShowtimeId(
            @PathVariable(value = "showtimeId") Long showtimeId) {

        Optional<Showtime> showtime = showtimeRepository.findById(showtimeId);
        if (!showtime.isPresent())
            throw new ResourceNotFoundException(
                    "Not found showtimes corresponding with the showtime id = " + showtimeId);

        Optional<List<Ticket>> tickets = ticketRepository.getByShowtime(showtime.get());
        if (!tickets.isPresent())
            throw new ResourceNotFoundException("Not found tickets corresponding with the showtime id = " + showtimeId);

        List<String> ticketStrings = new ArrayList<String>();
        for (Ticket inst : tickets.get())
            ticketStrings.add(inst.toString());
        return new ResponseEntity<List<String>>(ticketStrings, HttpStatus.OK);
    }
}