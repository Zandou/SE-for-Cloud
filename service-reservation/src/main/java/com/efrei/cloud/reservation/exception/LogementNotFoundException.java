package com.efrei.cloud.reservation.exception;

public class LogementNotFoundException extends RuntimeException {
    public LogementNotFoundException(int id) {
        super("Logement not found with id " + id);
    }
}
