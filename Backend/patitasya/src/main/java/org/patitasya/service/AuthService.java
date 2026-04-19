package org.patitasya.service;

import org.patitasya.auth.LoginResponseDTO;

public interface AuthService {
    LoginResponseDTO login(String email, String password);
}
