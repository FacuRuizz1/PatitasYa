package org.patitasya.service.Impl;

import lombok.RequiredArgsConstructor;
import org.patitasya.auth.LoginResponseDTO;
import org.patitasya.repository.UsuarioRepository;
import org.patitasya.security.JwtService;
import org.patitasya.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public LoginResponseDTO login(String email, String password) {
        var usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        String token = jwtService.generateToken(email);

        return LoginResponseDTO.builder()
                .token(token)
                .nombre(usuario.getNombre())
                .rol(usuario.getRol().name())
                .build();
    }
}
