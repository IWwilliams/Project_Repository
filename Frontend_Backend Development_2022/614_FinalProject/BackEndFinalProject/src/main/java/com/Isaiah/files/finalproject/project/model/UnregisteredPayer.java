package com.Isaiah.files.finalproject.project.model;

public class UnregisteredPayer implements payStrategy {

    @Override
    public double cancellationPayRate() {
        return 0.85;
    }

}
