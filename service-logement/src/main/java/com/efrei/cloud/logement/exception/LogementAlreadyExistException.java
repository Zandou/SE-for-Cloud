package com.efrei.cloud.logement.exception;

public class LogementAlreadyExistException extends RuntimeException {
    public LogementAlreadyExistException(Long id) {
        super("Logement already exist with id " + id);
    }
}
