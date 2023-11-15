package com.efrei.cloud.user.models;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUserRequest {
    private Long id;
    private String nom;
    private String email;
    private String telephone;
    private String mot_de_passe;
}
