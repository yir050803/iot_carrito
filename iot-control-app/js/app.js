const buttons = document.querySelectorAll('.btn');
const currentStatus = document.getElementById('current-status');
const API_URL = "http://98.82.22.169/api/devices";

let publicIP = "";

// Obtener la IP pública una vez al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            publicIP = data.ip;
            console.log('IP pública obtenida:', publicIP);
        })
        .catch(error => {
            console.error('Error obteniendo la IP pública:', error);
        });
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const status = button.getAttribute('data-status');
        currentStatus.textContent = status.toUpperCase();

        const data = {
            ip: publicIP || "NO_IP",
            name: "Yahir Cruz",
            status: status
        };

        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) throw new Error('Error en la respuesta de la API');
            return response.json();
        })
        .then(data => {
            console.log('Respuesta de la API:', data);
        })
        .catch(error => {
            console.error('Error al enviar a la API:', error);
        });
    });
});
