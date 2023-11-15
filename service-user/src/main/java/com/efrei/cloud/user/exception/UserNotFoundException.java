package com.efrei.cloud.user.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("Could not find user with id " + id);
    }

    public UserNotFoundException() {
        super("Could not find user");
    }
}

