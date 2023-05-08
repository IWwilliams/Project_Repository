package com.Isaiah.files.finalproject.project.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "showtimes")
public class Showtime implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "showtime_generator")
    private long id;

    @Column(name = "releaseDate")
    private LocalDateTime showTime;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "movie_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Movie movie;

    @OneToMany(fetch = FetchType.EAGER, cascade = { CascadeType.ALL }, mappedBy = "showtime")
    private Set<Ticket> tickets;

    public Showtime() {
    }

    public Showtime(LocalDateTime showTime, Movie movie, Set<Ticket> tickets) {
        this.showTime = showTime;
        this.movie = movie;
        this.tickets = tickets;
    }

    @Override
    public String toString() {
        return "{\"id\":" + "\"" + this.id + "\",\"showTime\":" + "\"" + showTime + "\"" + ", \"movie\":" + "\""
                + movie.getId()
                + "\"}";
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDateTime getShowTime() {
        return showTime;
    }

    public void setShowTime(LocalDateTime showTime) {
        this.showTime = showTime;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public Movie getMovie() {
        return this.movie;
    }
    // public Set<Ticket> getTickets() {
    // return tickets;
    // }

    // public void setTickets(Set<Ticket> tickets) {
    // this.tickets = tickets;
    // }

}
