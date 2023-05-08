package com.Isaiah.files.finalproject.project.model;

public class rate {

    payStrategy strategy;

    public Double getCancellationPayRate() {
        return strategy.cancellationPayRate();
    }

    public void setStrategy(payStrategy strategy) {
        this.strategy = strategy;
    }
}
