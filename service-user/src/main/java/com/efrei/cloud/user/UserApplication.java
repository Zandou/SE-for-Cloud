package com.efrei.cloud.user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.efrei.archi.user.config", "com.efrei.archi.user.controller", "com.efrei.archi.user.service", "com.efrei.archi.user.repository"})
public class UserApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserApplication.class, args);
        System.out.println("Application started successfully !");
        System.out.println("Swagger UI is available at the following URL: http://localhost:8888/swagger-ui.html");
    }

}
