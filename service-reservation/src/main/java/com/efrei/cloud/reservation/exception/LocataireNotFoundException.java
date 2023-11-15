package com.efrei.cloud.reservation.exception;

public class LocataireNotFoundException extends RuntimeException {
    public LocataireNotFoundException(int id) {
        super("Locataire not found with id " + id);
    }
}
