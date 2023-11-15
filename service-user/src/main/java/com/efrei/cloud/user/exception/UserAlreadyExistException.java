package com.efrei.cloud.user.exception;

public class UserAlreadyExistException extends RuntimeException {
    public UserAlreadyExistException(Long id) {
        super("User already exist with id " + id);
    }
}
