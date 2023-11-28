# Prueba técnica - Steven Mendez

## Demo análisis de datos Swetro app 🎥
https://github.com/StevenMendezV/swetro-prueba/assets/89426613/eec48fd2-ae1c-44e4-bd90-d41033fc2e4e


Para la realización de esta prueba técnica he optado por la implementación de tecnologías como:
- **Para el frontend:** HTML, CSS y JavaScript
- **Para el backend:** Java con SpringBoot - Python con Flask y Pandas.

La arquitectura del backend funciona por medio de un orquestador/intermediario establecido en Java con SpringBoot el cuál recibirá las solicitudes desde el frontend y se comunicacará con un **microservicio**; este a su vez se encuentra **estructurado en en lenguaje Python** por su eficiencia en el manejo de grandes cantidades de datos.

## Argumento de la solución
Para determinar la solución a la prueba primero razoné qué campos en la tabla de registros eran críticos y fundamentales a la hora de determinar prácticas tramposas, de los cuales, he determinado los siguientes:
- Valores en 0
- Tiempos de duración extensos
- Velocidades demasiado altas
- Ritmos bajos
- Frecuencias cardíacas demasiado altas
- Frecuencias cardíacas demasiado bajas
- Ganancias de elevación demasiado alta

Para realizar el análisis de los registros desarrollé un microservicio en Python donde utilicé la librería de Pandas empleando el **método de rango intercuartílico**. 

Al graficar el comportamiento de los datos evidencié la presencia de muchos datos outliers en un gráfico de caja que he realizado:
![Descripción de la imagen](https://i.imgur.com/MWfI2i6.jpeg)
Al haber evidenciado la presencia de tantos **valores atípicos (aquellos que están fuera de esas líneas a los lados)** decidí establecer unos rangos intercuartílicos altos **(Del 99% y el 1% respectivamentente)**  para la obtención de resultados y el filtrado de datos demasiado anormales.

## Funcionamiento del aplicativo
### Etapa 1
El frontend del aplicativo mostrará 3 botones y 1 barra de búsqueda:
- **Botón de subida de archivo:** Aquí se sube el archivo CSV de los datos respectivamente
- **Botón de traer datos anormales:** Al clickear en esta opción el usuario podrá traer los datos que presenten anomalías por medio del consumo de unos endpoints (evidenciando una pantalla de carga mientras se realiza el análisis)

    ```'http://swetro-prueba.dev.co/api'```

    el aplicativo le resaltará específicamente qué datos son anormales, entre los cuales incluirá 0s, valores nulos y demás.
- **Botón de traer datos normales:** Al clickear en esta opción el usuario podrá traer los datos normales que se establecen dentro del límite lógico permitido a través de un endpoint (evidenciando una pantalla de carga mientras se realiza el análisis).

    ```'http://swetro-prueba.dev.co/api/normal'```

- **Barra de búsqueda:** Aquí se podrá filtrar los datos realizando una búsqueda por medio del id de un usuario en particular para conocer todos sus registros.
- **Tabla de renderización de datos:** En este apartado se mostrarán los datos obtenidos al realizar la petición.
### Etapa 2
El backend fue estructurado con Java y SpringBoot, este va a recibir las peticiones del frontend y servirá de orquestador o intermediario para realizar la conexión con el microservicio realizado en python.
- Se ha empleado el uso particular de WebClient, lo último y más recomendado que permite realizar la conexión con algún microservicio en particular.
- Se realizaron unas configuraciones para el manejo de archivos grandes (máximo 100MB) por cada petición.
### Etapa 3
El microservicio es lo que le da vida al aplicativo realizando la lógica particular para el análisis, recopilación y validación de datos anormales y normales.
- Se estructuró un servidor en flask para realizar el consumo de un microservicio desde Java con SpringBoot
- Se utilizaron librerías propias para realizar el manejo de datos como Pandas, este a su vez nos ayuda a manipular el archivo .csv y generar las respuestas respectivas que se requiriesen.



## Versiones de tecnologías
- **Java:** OpenJDK 17.0.4
- **SpringBoot:** 3.2.0
- **Python:** 3.0.0
- **Flask:** 3.0.0
- **Pandas:** 2.1.3
- **HTML:** 5.0.0
- **CSS:** 4.0.0
- **JavaScript:** ECMAScript 2021
