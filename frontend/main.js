function traerDatosAnormales() {
  mostrarSpinner()
  limpiarTabla()
  const inputArchivo = document.getElementById("archivoDeDatos")
  const tabla = document
    .getElementById("tablaDatos")
    .getElementsByTagName("tbody")[0]

  const archivoDeDatos = inputArchivo.files[0]
  console.log(archivoDeDatos)
  const formData = new FormData()
  formData.append("file", archivoDeDatos)

  let url = `http://localhost:8080/api`
  // Realiza la solicitud POST al endpoint de creación de imágenes

  if (archivoDeDatos != undefined) {
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // return response.json() // Si la respuesta es exitosa, convierte el cuerpo de la respuesta a JSON
          return response.text()
        }
        throw new Error("Error al subir el documento" + response.statusText)
      })
      .then((data) => {
        const respuestaCompleta = JSON.parse(data)
        const objetoJsonData = JSON.parse(respuestaCompleta.data)
        // Manipula la respuesta del servidor (data) según tus necesidades

        objetoJsonData.forEach((registro) => {
          const fila = tabla.insertRow()
          //Id de registro
          const celdaId = fila.insertCell()
          celdaId.textContent = registro.Id
          celdaId.style.backgroundColor = "rgb(238, 124, 124)"

          //Id de usuario
          const celdaUserId = fila.insertCell()
          celdaUserId.textContent = registro.UserId
          console.log(typeof registro.UserId)
          celdaUserId.style.backgroundColor = "rgb(238, 124, 124)"

          //Tiempo de inicio
          const celdaStartTimeInSeconds = fila.insertCell()
          celdaStartTimeInSeconds.textContent = registro.StartTimeInSeconds
          celdaStartTimeInSeconds.style.backgroundColor = "rgb(238, 124, 124)"

          //Duración
          const celdaDurationInSeconds = fila.insertCell()
          if (registro.DurationInSeconds === null) {
            celdaDurationInSeconds.textContent = "nulo"
            celdaDurationInSeconds.style.backgroundColor = "rgb(255, 72, 72)"
          } else {
            celdaDurationInSeconds.textContent = registro.DurationInSeconds
            if (registro.DurationInSeconds.toString().includes("*")) {
              celdaDurationInSeconds.style.backgroundColor = "rgb(255, 72, 72)"
            } else {
              celdaDurationInSeconds.style.backgroundColor =
                "rgb(238, 124, 124)"
            }
          }
          //Distancia
          const celdaDistanceInMeters = fila.insertCell()
          celdaDistanceInMeters.textContent = registro.DistanceInMeters
          celdaDistanceInMeters.style.backgroundColor = "rgb(238, 124, 124)"

          //Pasos
          const celdaSteps = fila.insertCell()
          celdaSteps.textContent = registro.Steps
          celdaSteps.style.backgroundColor = "rgb(238, 124, 124)"

          // Velocidad promedio
          const celdaAverageSpeedInMetersPerSecond = fila.insertCell()
          if (registro.AverageSpeedInMetersPerSecond === null) {
            celdaAverageSpeedInMetersPerSecond.textContent = "nulo"
            celdaAverageSpeedInMetersPerSecond.style.backgroundColor =
              "rgb(255, 72, 72)"
          } else {
            if (
              registro.AverageSpeedInMetersPerSecond.toString().includes("*")
            ) {
              celdaAverageSpeedInMetersPerSecond.style.backgroundColor =
                "rgb(255, 72, 72)"
            } else {
              celdaAverageSpeedInMetersPerSecond.style.backgroundColor =
                "rgb(238, 124, 124)"
            }
            celdaAverageSpeedInMetersPerSecond.textContent =
              registro.AverageSpeedInMetersPerSecond
            celdaAverageSpeedInMetersPerSecond.style.backgroundColor =
              "rgb(238, 124, 124)"
          }
          // Ritmo promedio
          const celdaAveragePaceInMinutesPerKilometer = fila.insertCell()
          if (registro.AveragePaceInMinutesPerKilometer === null) {
            celdaAveragePaceInMinutesPerKilometer.textContent = "nulo"
            celdaAveragePaceInMinutesPerKilometer.style.backgroundColor =
              "rgb(255, 72, 72)"
          } else {
            celdaAveragePaceInMinutesPerKilometer.textContent =
              registro.AveragePaceInMinutesPerKilometer
            if (
              registro.AveragePaceInMinutesPerKilometer.toString().includes("*")
            ) {
              celdaAveragePaceInMinutesPerKilometer.style.backgroundColor =
                "rgb(255, 72, 72)"
            } else {
              celdaAveragePaceInMinutesPerKilometer.style.backgroundColor =
                "rgb(238, 124, 124)"
            }
          }
          // Elevación total
          const celdaTotalElevationGainInMeters = fila.insertCell()
          if (registro.TotalElevationGainInMeters === null) {
            celdaTotalElevationGainInMeters.textContent = "nulo"
            celdaTotalElevationGainInMeters.style.backgroundColor =
              "rgb(255, 72, 72)"
          } else {
            celdaTotalElevationGainInMeters.textContent =
              registro.TotalElevationGainInMeters
            if (registro.TotalElevationGainInMeters.toString().includes("*")) {
              celdaTotalElevationGainInMeters.style.backgroundColor =
                "rgb(255, 72, 72)"
            } else {
              celdaTotalElevationGainInMeters.style.backgroundColor =
                "rgb(238, 124, 124)"
            }
          }

          //Pulsaciones por minuto
          const celdaAverageHeartRateInBeatsPerMinute = fila.insertCell()
          if (registro.AverageHeartRateInBeatsPerMinute === null) {
            celdaAverageHeartRateInBeatsPerMinute.textContent = "nulo"
            celdaAverageHeartRateInBeatsPerMinute.style.backgroundColor =
              "rgb(255, 72, 72)"
          } else {
            celdaAverageHeartRateInBeatsPerMinute.textContent =
              registro.AverageHeartRateInBeatsPerMinute
            if (
              registro.AverageHeartRateInBeatsPerMinute.toString().includes("*")
            ) {
              celdaAverageHeartRateInBeatsPerMinute.style.backgroundColor =
                "rgb(255, 72, 72)"
            } else {
              celdaAverageHeartRateInBeatsPerMinute.style.backgroundColor =
                "rgb(238, 124, 124)"
            }
          }
          ocultarSpinner()
        })
        console.log("Documento analizado exitosamente:", objetoJsonData)
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  } else {
    alert("No has subido ningún archivo")
  }
}

function traerDatosNormales() {
  mostrarSpinner()
  limpiarTabla()
  const inputArchivo = document.getElementById("archivoDeDatos")
  const tabla = document
    .getElementById("tablaDatos")
    .getElementsByTagName("tbody")[0]

  const archivoDeDatos = inputArchivo.files[0]
  const formDataNormal = new FormData()
  formDataNormal.append("file", archivoDeDatos)

  let url = `http://localhost:8080/api/normal`
  // Realiza la solicitud POST al endpoint de creación de imágenes
  if (archivoDeDatos != undefined) {
    fetch(url, {
      method: "POST",
      body: formDataNormal,
    })
      .then((response) => {
        if (response.ok) {
          // return response.json() // Si la respuesta es exitosa, convierte el cuerpo de la respuesta a JSON
          return response.text()
        }
        throw new Error("Error al subir el documento" + response.statusText)
      })
      .then((data) => {
        const respuestaCompleta = JSON.parse(data)
        const objetoJsonData = JSON.parse(respuestaCompleta.data)
        // Manipula la respuesta del servidor (data) según tus necesidades
        objetoJsonData.forEach((registro) => {
          const fila = tabla.insertRow()

          const celdaId = fila.insertCell()
          celdaId.textContent = registro.Id
          celdaId.style.backgroundColor = "rgb(126, 177, 113)"

          const celdaUserId = fila.insertCell()
          celdaUserId.textContent = registro.UserId
          console.log(typeof registro.UserId)
          celdaUserId.style.backgroundColor = "rgb(126, 177, 113)"

          const celdaStartTimeInSeconds = fila.insertCell()
          celdaStartTimeInSeconds.textContent = registro.StartTimeInSeconds
          celdaStartTimeInSeconds.style.backgroundColor = "rgb(126, 177, 113)"

          const celdaDurationInSeconds = fila.insertCell()
          celdaDurationInSeconds.textContent = registro.DurationInSeconds
          celdaDurationInSeconds.style.backgroundColor = "rgb(126, 177, 113)"

          const celdaDistanceInMeters = fila.insertCell()
          celdaDistanceInMeters.textContent = registro.DistanceInMeters
          celdaDistanceInMeters.style.backgroundColor = "rgb(126, 177, 113)"

          const celdaSteps = fila.insertCell()
          celdaSteps.textContent = registro.Steps
          celdaSteps.style.backgroundColor = "rgb(126, 177, 113)"

          const celdaAverageSpeedInMetersPerSecond = fila.insertCell()
          celdaAverageSpeedInMetersPerSecond.textContent =
            registro.AverageSpeedInMetersPerSecond
          celdaAverageSpeedInMetersPerSecond.style.backgroundColor =
            "rgb(126, 177, 113)"

          const celdaAveragePaceInMinutesPerKilometer = fila.insertCell()
          celdaAveragePaceInMinutesPerKilometer.textContent =
            registro.AveragePaceInMinutesPerKilometer
          celdaAveragePaceInMinutesPerKilometer.style.backgroundColor =
            "rgb(126, 177, 113)"

          const celdaTotalElevationGainInMeters = fila.insertCell()
          if (registro.TotalElevationGainInMeters === null) {
            celdaTotalElevationGainInMeters.textContent = "nulo"
            celdaTotalElevationGainInMeters.style.backgroundColor =
              "rgb(126, 177, 113)"
          } else {
            celdaTotalElevationGainInMeters.textContent =
              registro.TotalElevationGainInMeters
            celdaTotalElevationGainInMeters.style.backgroundColor =
              "rgb(126, 177, 113)"
          }

          const celdaAverageHeartRateInBeatsPerMinute = fila.insertCell()
          celdaAverageHeartRateInBeatsPerMinute.textContent =
            registro.AverageHeartRateInBeatsPerMinute
          celdaAverageHeartRateInBeatsPerMinute.style.backgroundColor =
            "rgb(126, 177, 113)"
          ocultarSpinner()
        })
        console.log("Documento analizado exitosamente:", objetoJsonData)
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  } else {
    alert("No has subido ningún archivo")
  }
}

document
  .getElementById("barraBusqueda")
  .addEventListener("keyup", function (event) {
    let terminoBusqueda = event.target.value // El término de búsqueda como cadena
    let filas = document
      .getElementById("tablaDatos")
      .getElementsByTagName("tbody")[0]
      .getElementsByTagName("tr")

    for (let i = 0; i < filas.length; i++) {
      let celdaUserId = filas[i].getElementsByTagName("td")[1] // Selecciona la primera celda (UserId)
      if (celdaUserId) {
        // Compara el UserId de la fila con el término de búsqueda
        if (
          celdaUserId.textContent === terminoBusqueda ||
          terminoBusqueda === ""
        ) {
          filas[i].style.display = "" // Muestra la fila si coincide
        } else {
          filas[i].style.display = "none" // Oculta la fila si no coincide
        }
      }
    }
  })

function limpiarTabla() {
  const tabla = document
    .getElementById("tablaDatos")
    .getElementsByTagName("tbody")[0]
  while (tabla.firstChild) {
    tabla.removeChild(tabla.firstChild)
  }
}

function mostrarSpinner() {
  document.getElementById("spinner").style.display = "flex"
}

function ocultarSpinner() {
  document.getElementById("spinner").style.display = "none"
}
