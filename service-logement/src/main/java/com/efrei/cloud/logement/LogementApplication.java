package com.efrei.cloud.logement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.efrei.cloud.logement.config", "com.efrei.cloud.logement.controller", "com.efrei.cloud.logement.service", "com.efrei.cloud.logement.repository"})
public class LogementApplication {

    public static void main(String[] args) {
        SpringApplication.run(LogementApplication.class, args);
        System.out.println("Application started successfully !");
        System.out.println("Swagger UI is available at the following URL: http://localhost:8080/swagger-ui.html");
    }

}
