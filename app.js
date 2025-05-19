const API_URL = "http://3.231.162.196/api/devices";
const tableBody = document.getElementById("deviceTableBody");
const statusActual = document.getElementById("statusActual");

function cargarDatos() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Respuesta del API:", data); // Para verificar datos recibidos
            tableBody.innerHTML = "";

            if (Array.isArray(data.devices) && data.devices.length > 0) {
                const estado = data.devices[0].status || "sin datos";
                statusActual.textContent = "Estado actual: " + estado;

                data.devices.forEach(dispositivo => {
                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                        <td>${dispositivo.id}</td>
                        <td>${dispositivo.name}</td>
                        <td>${dispositivo.ip}</td>
                        <td>${dispositivo.status}</td>
                        <td>${dispositivo.date}</td>
                    `;
                    tableBody.appendChild(fila);
                });
            } else {
                statusActual.textContent = "Estado actual: sin datos";
            }
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
            statusActual.textContent = "Error al cargar estado actual";
        });
}

// Cargar datos al inicio
cargarDatos();

// Refrescar cada 2 segundos
setInterval(cargarDatos, 2000);
