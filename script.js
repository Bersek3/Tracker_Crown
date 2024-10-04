document.getElementById('trackButton').addEventListener('click', function() {
    const trackingNumber = document.getElementById('trackingNumber').value;
    const apiKey = '2b383457e2a848aeb54e660b77933f32';  // Reemplaza con tu clave API

    if (!trackingNumber) {
        alert('Por favor, ingresa un número de seguimiento.');
        return;
    }

    // URL de la API de Track123
    const url = `https://cors-anywhere.herokuapp.com/https://api.track123.com/trackings/${trackingNumber}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        displayResults(data);
    })
    .catch(error => {
        document.getElementById('results').innerHTML = `<p>${error.message}</p>`;
    });
});

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';  // Limpiar resultados anteriores

    // Mostrar información de seguimiento
    if (data && data.status) {
        resultsDiv.innerHTML = `
            <h2>Detalles del Paquete:</h2>
            <p><strong>Estado:</strong> ${data.status}</p>
            <p><strong>Ubicación:</strong> ${data.location}</p>
            <p><strong>Fecha:</strong> ${data.date}</p>
        `;
    } else {
        resultsDiv.innerHTML = '<p>No se encontraron datos para este número de seguimiento.</p>';
    }
}
