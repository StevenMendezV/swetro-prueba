package com.example.swetro.service;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class ConsumoMicroservicio {

    private final WebClient webClient;

    public ConsumoMicroservicio(WebClient.Builder webClientBuilder){
        this.webClient = webClientBuilder.baseUrl("http://127.0.0.1:5000").build();
    }

    public Mono<String> traerDatosAnormales(MultipartFile data) {
        return webClient.post()                    // Iniciar una solicitud POST
                .uri("/anormal")          // Especificar el URI
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData("file", data.getResource()))
                .retrieve()                // Recuperar la respuesta
                .bodyToMono(String.class);  // Convertir la respuesta a String
    }

    public Mono<String> traerDatosNormales(MultipartFile data) {
        return webClient.post()                    // Iniciar una solicitud POST
                .uri("/normal")          // Especificar el URI
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData("file", data.getResource()))
                .retrieve()                // Recuperar la respuesta
                .bodyToMono(String.class);  // Convertir la respuesta a String
    }


}
