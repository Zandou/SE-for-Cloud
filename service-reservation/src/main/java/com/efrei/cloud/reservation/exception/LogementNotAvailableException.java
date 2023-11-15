package com.efrei.cloud.reservation.exception;

import java.time.LocalDate;

public class LogementNotAvailableException extends RuntimeException {
    public LogementNotAvailableException(LocalDate date) {
        super("Logement is not available with this date " + date);
    }
}
