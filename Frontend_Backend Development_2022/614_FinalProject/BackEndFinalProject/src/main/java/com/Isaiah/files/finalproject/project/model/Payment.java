package com.Isaiah.files.finalproject.project.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "payments")
public class Payment implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "user_generator")
    private long id;

    @Column(name = "price")
    private Double price;

    @OneToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "ticket_id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Ticket ticket;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "user_id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    public User getUser() {
        return user;
    }

    public Payment() {
    }

    public Payment(Double price, Ticket ticket, User user) {
        this.price = price;
        this.ticket = ticket;
        this.user = user;
    }

    @Override
    public String toString() {
        return "{\"id\":" + "\"" + this.id + "\",\"price\":" + "\"" + price + "\"" + ", \"ticket\":" + ticket
                + ", \"user\":" + "\"" + user.getId() + "\"}";
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

}