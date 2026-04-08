package org.patitasya.service;

import org.patitasya.dto.UsuarioRequestDTO;
import org.patitasya.dto.UsuarioResponseDTO;

public interface UsuarioService {
  UsuarioResponseDTO createUsuario(UsuarioRequestDTO dto);
  UsuarioResponseDTO getUsuarioById(Long id);
}
