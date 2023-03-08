package com.Isaiah.files.finalproject.project.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import com.Isaiah.files.finalproject.project.model.payStrategy;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "users")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "user_generator")
    private long id;

    @Column(name = "pword")
    private String pword;

    @Column(name = "fname")
    private String fname;

    @Column(name = "lname")
    private String lname;

    @Column(name = "cc")
    private long cc;

    @Column(name = "email")
    private String email;

    @Column(name = "address")
    private String address;

    @Column(name = "credit")
    private Double credit;

    @OneToMany(fetch = FetchType.EAGER, cascade = { CascadeType.ALL }, mappedBy = "user")
    private Set<Payment> payments;

    public User() {
    }

    public User(String pword, String fname, String lname, long cc, String email, String address,
            Set<Payment> payments, Double credit) {
        this.pword = pword;
        this.fname = fname;
        this.lname = lname;
        this.cc = cc;
        this.email = email;
        this.address = address;
        this.payments = payments;
        this.credit = credit;
    }

    @Override
    public String toString() {
        return "{\"id\":" + "\"" + this.id + "\"" + ", \"pword\":" + "\"" + pword
                + "\"" + ", \"fname\":" + "\""
                + fname + "\"" + ", \"lname\":" + "\"" + lname + "\"" + ", \"cc\":" + "\"" + cc + "\"" + ", \"email\":"
                + "\"" + email + "\"" + ", \"address\":" + "\"" + address + "\"" + ", \"credit\":" + "\"" + credit
                + "\"" + ", \"payments\":" + payments
                + "}";
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public long getCc() {
        return cc;
    }

    public void setCc(long cc) {
        this.cc = cc;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Set<Payment> getPayments() {
        return payments;
    }

    public void setPayments(Set<Payment> payments) {
        this.payments = payments;
    }

    public String getpword() {
        return pword;
    }

    public void setpword(String pword) {
        this.pword = pword;
    }

    public Double getCredit() {
        return credit;
    }

    public void setCredit(Double credit) {
        this.credit = credit;
    }

}
