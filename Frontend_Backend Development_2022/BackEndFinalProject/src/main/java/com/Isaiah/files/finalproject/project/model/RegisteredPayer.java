package com.Isaiah.files.finalproject.project.model;

public class RegisteredPayer implements payStrategy {

    @Override
    public double cancellationPayRate() {
        return 1;
    }

}
