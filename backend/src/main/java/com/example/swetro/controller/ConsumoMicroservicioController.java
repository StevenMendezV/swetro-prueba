package com.example.swetro.controller;

import com.example.swetro.service.ConsumoMicroservicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ConsumoMicroservicioController {

    private final ConsumoMicroservicio consumoMicroservicio;

    @Autowired
    public ConsumoMicroservicioController(ConsumoMicroservicio consumoMicroservicio){
        this.consumoMicroservicio = consumoMicroservicio;
    }

    @PostMapping
    public Mono<String> obtenerDatosAnormales(@RequestPart MultipartFile file){
        return consumoMicroservicio.traerDatosAnormales(file);
    }

    @PostMapping("/normal")
    public Mono<String> obtenerDatosNormales(@RequestPart MultipartFile file){
        return consumoMicroservicio.traerDatosNormales(file);
    }
}
