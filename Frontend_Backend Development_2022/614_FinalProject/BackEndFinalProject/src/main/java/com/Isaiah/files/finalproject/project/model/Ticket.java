package com.Isaiah.files.finalproject.project.model;

import java.io.Serializable;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "tickets")
public class Ticket implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "showtime_generator")
    private long id;

    @Column(name = "rowNum")
    private int rowNum;

    @Column(name = "colNum")
    private int colNum;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "showtime_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Showtime showtime;

    @OneToOne(mappedBy = "ticket")
    private Payment payment;

    public Ticket() {
    }

    public Ticket(int rowNum, int colNum, Showtime showtime, Payment payment) {
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.showtime = showtime;
        this.payment = payment;
    }

    @Override
    public String toString() {
        return "{\"id\":" + "\"" + this.id + "\",\"rowNum\":" + "\"" + rowNum + "\"" + ", \"colNum\":" + "\"" + colNum
                + "\"" + ", \"showtime\":" + "\"" + showtime.getShowTime() + "\"" + ", \"Movie\":" + "\""
                + showtime.getMovie().getName()
                + "\", \"Theater\": \"" + showtime.getMovie().getTheater().getTitle() + "\", \"state\":" + "\""
                + ticketState()
                + "\"}";
    }

    public Long getId() {
        return this.id;
    }

    public int getRowNum() {
        return rowNum;
    }

    public void setRowNum(int rowNum) {
        this.rowNum = rowNum;
    }

    public int getColNum() {
        return colNum;
    }

    public void setCol(int colNum) {
        this.colNum = colNum;
    }

    public Showtime getShowtime() {
        return showtime;
    }

    public void setShowtime(Showtime showtime) {
        this.showtime = showtime;
    }

    public Boolean ticketState() {
        if (this.payment != null)
            return true;
        return false;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }
}
