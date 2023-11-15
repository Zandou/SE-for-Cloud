package com.efrei.cloud.reservation.exception;

public class ErrorResponse {
    private final String message;
    private final int errorCode;

    public ErrorResponse(String message, int errorCode) {
        this.message = message;
        this.errorCode = errorCode;
    }

    public String getMessage() {
        return message;
    }

    public int getErrorCode() {
        return errorCode;
    }
}