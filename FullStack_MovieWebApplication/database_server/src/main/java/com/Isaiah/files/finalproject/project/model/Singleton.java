package com.Isaiah.files.finalproject.project.model;

import java.util.ArrayList;

public class Singleton {
    private ArrayList<User> allUsers;
    private ArrayList<Payment> allPayments;
    private static Singleton onlyInstance;

    private Singleton() {
        allUsers = new ArrayList<User>();
        allPayments = new ArrayList<Payment>();
    }

    public static Singleton getOnlyInstance() {
        if (onlyInstance == null) {
            onlyInstance = new Singleton();
        }
        return onlyInstance;
    }

    public void addUser(User user) {
        allUsers.add(user);
    }

    public Boolean exists(User user) {
        if (allUsers.contains(user)) {
            return true;
        }
        return false;
    }

    public void addPayment(Payment payment) {
        allPayments.add(payment);
    }

    public Boolean exists(Payment payment) {
        if (allPayments.contains(payment)) {
            return true;
        }
        return false;
    }
}
