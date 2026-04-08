package org.patitasya.service.Impl;

import lombok.RequiredArgsConstructor;
import org.patitasya.dto.UsuarioRequestDTO;
import org.patitasya.dto.UsuarioResponseDTO;
import org.patitasya.entity.Usuario;
import org.patitasya.repository.UsuarioRepository;
import org.patitasya.service.UsuarioService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UsuarioResponseDTO createUsuario(UsuarioRequestDTO dto) {

        if (usuarioRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("El email ya está registrado");
        }

        Usuario usuario = mapToEntity(dto);

        Usuario nuevoUsuario = usuarioRepository.save(usuario);

        return mapToResponse(nuevoUsuario);
    }

    @Override
    public UsuarioResponseDTO getUsuarioById(Long id) {
       Usuario usuario = usuarioRepository.findById(id)
               .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

       return mapToResponse(usuario);
    }

    // MAPPER: DTO → ENTITY
    private Usuario mapToEntity(UsuarioRequestDTO dto) {
        return Usuario.builder()
                .nombre(dto.getNombre())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .telefono(dto.getTelefono())
                .build();
    }

    //MAPPER: ENTITY -> DTO
    private UsuarioResponseDTO mapToResponse(Usuario usuario) {
        return UsuarioResponseDTO.builder()
                .id(usuario.getId())
                .nombre(usuario.getNombre())
                .email(usuario.getEmail())
                .build();
    }
}
