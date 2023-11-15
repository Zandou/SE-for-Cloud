package com.efrei.cloud.reservation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.efrei.cloud.reservation.config", "com.efrei.cloud.reservation.controller", "com.efrei.cloud.reservation.service", "com.efrei.cloud.reservation.repository"})
public class ReservationApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReservationApplication.class, args);
        System.out.println("Application started successfully !");
        System.out.println("Swagger UI is available at the following URL: http://localhost:9090/swagger-ui.html");
    }

}
