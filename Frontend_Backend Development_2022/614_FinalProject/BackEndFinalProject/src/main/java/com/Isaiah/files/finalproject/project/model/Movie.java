package com.Isaiah.files.finalproject.project.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "movies")
public class Movie implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "movie_generator")
  private long id;

  @Column(name = "name")
  private String name;

  @Column(name = "releaseDate")
  private LocalDate releaseDate;

  @Column(name = "image")
  private String image;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "theater_id", nullable = false)
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JsonIgnore
  private Theater theater;

  @OneToMany(fetch = FetchType.EAGER, cascade = { CascadeType.ALL }, mappedBy = "movie")
  private Set<Showtime> showtimes;

  public Movie() {
  }

  public Movie(String name, LocalDate releaseDate, String image, Theater theater, Set<Showtime> showtime) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.image = image;
    this.theater = theater;
    this.showtimes = showtime;
  }

  @Override
  public String toString() {
    return "{\"id\":" + "\"" + this.id + "\",\"name\":" + "\"" + name + "\"" + ", \"releaseDate\":" + "\"" + releaseDate
        + "\"" + ", \"image\":" + "\"" + image + "\"" + ", \"theater\":" + "\"" + theater.getId()
        + "\"" + ", \"showtimes\":" + showtimes + "}";
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Theater getMovie() {
    return theater;
  }

  public LocalDate getReleaseDate() {
    return releaseDate;
  }

  public void setReleaseDate(LocalDate releaseDate) {
    this.releaseDate = releaseDate;
  }

  public void setTheater(Theater theater) {
    this.theater = theater;
  }

  public Theater getTheater() {
    return this.theater;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }

}
