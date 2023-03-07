package com.Isaiah.files.finalproject.project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.DeleteMapping;

import com.Isaiah.files.finalproject.project.model.Payment;
import com.Isaiah.files.finalproject.project.model.Ticket;
import com.Isaiah.files.finalproject.project.model.User;

@Transactional
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    // @Query("Select u from User u WHERE ticket = ?1 and user = ?2")
    Optional<Payment> getByTicketAndUser(Ticket ticket, User user);

    Optional<Payment> getByTicket(Ticket ticket);

    @Modifying
    @Query("Delete FROM Payment WHERE ticket = ?1")
    void deleteByTicket(Ticket ticket);
}
