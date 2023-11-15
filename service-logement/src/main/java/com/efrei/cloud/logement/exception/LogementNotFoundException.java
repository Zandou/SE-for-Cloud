package com.efrei.cloud.logement.exception;

public class LogementNotFoundException extends RuntimeException {
    public LogementNotFoundException(Long id) {
        super("Could not find logement with id " + id);
    }
}

