package org.patitasya.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.patitasya.dto.UsuarioRequestDTO;
import org.patitasya.dto.UsuarioResponseDTO;
import org.patitasya.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuario")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping("/crear")
    public ResponseEntity<UsuarioResponseDTO> registrarUsuario(@RequestBody @Valid UsuarioRequestDTO dto){
        return ResponseEntity.ok(usuarioService.createUsuario(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> obtenerUsuarioPorId(@PathVariable Long id){
        return ResponseEntity.ok(usuarioService.getUsuarioById(id));
    }
}
