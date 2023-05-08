package com.Isaiah.files.finalproject.project.model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "theaters")
public class Theater implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "theater_generator")
  private long id;

  @Column(name = "name")
  private String name;

  @OneToMany(fetch = FetchType.EAGER, cascade = { CascadeType.ALL }, mappedBy = "theater")
  private Set<Movie> items;

  public Theater() {
  }

  public Theater(String name, Set<Movie> items) {
    this.name = name;
    this.items = items;
  }

  public long getId() {
    return id;
  }

  public String getTitle() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Set<Movie> getItems() {
    return this.items;
  }

  @Override
  public String toString() {
    return "{\"id\":" + "\"" + this.id + "\"" + ", \"name\":" + "\"" + this.name + "\"" + ", \"items\":" +
        items + "}";
  }

}
