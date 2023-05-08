package com.Isaiah.files.finalproject.project.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Isaiah.files.finalproject.project.exception.ResourceNotFoundException;
import com.Isaiah.files.finalproject.project.model.Payment;
import com.Isaiah.files.finalproject.project.model.RegisteredPayer;
import com.Isaiah.files.finalproject.project.model.Singleton;
import com.Isaiah.files.finalproject.project.model.Ticket;
import com.Isaiah.files.finalproject.project.model.UnregisteredPayer;
import com.Isaiah.files.finalproject.project.model.rate;
import com.Isaiah.files.finalproject.project.model.User;
import com.Isaiah.files.finalproject.project.repository.PaymentRepository;
import com.Isaiah.files.finalproject.project.repository.TicketRepository;
import com.Isaiah.files.finalproject.project.repository.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @PostMapping("/addpayment/ticketid/{ticketId}/userid/{userId}")
    public ResponseEntity<String> addPayment(@PathVariable(value = "ticketId") Long ticketId,
            @PathVariable(value = "userId") Long userId, @RequestBody Payment payment) {

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found ticketId with id = " + ticketId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found userId with id = " + userId));

        Optional<Payment> paymentDuplicate = paymentRepository.getByTicketAndUser(ticket, user);
        Singleton allPayments = Singleton.getOnlyInstance();
        if (paymentDuplicate.isPresent())
            throw new ResourceNotFoundException("Duplicate payment!");
        else {
            payment.setTicket(ticket);
            payment.setUser(user);
            paymentRepository.save(payment);
        }
        return new ResponseEntity<>(payment.toString(), HttpStatus.OK);
    }

    @DeleteMapping("/remove/paymentId/{paymentId}")
    public ResponseEntity<String> removePayment(@PathVariable(value = "paymentId") Long paymentId) {
        Ticket ticket = ticketRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found ticketId with id = " + paymentId));

        Payment payment = paymentRepository.getByTicket(ticket)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Not found payment corresponding to ticket with id = " + paymentId));

        User user = payment.getUser();
        rate rate = new rate();
        if (user.getpword().equals("*")) {
            rate.setStrategy(new UnregisteredPayer());
            user.setCredit(payment.getPrice() * rate.getCancellationPayRate());
        } else {
            rate.setStrategy(new RegisteredPayer());
            user.setCredit(payment.getPrice() * rate.getCancellationPayRate());
        }

        paymentRepository.deleteByTicket(ticket);

        return new ResponseEntity<>("Deleted", HttpStatus.OK);
    }
}