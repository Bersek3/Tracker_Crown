const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Asegúrate de usar la versión correcta de node-fetch

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors()); // Habilitar CORS para todas las solicitudes
app.use(express.json());

// Ruta para manejar la solicitud de seguimiento
app.get('/track/:trackingNumber', async (req, res) => {
    const trackingNumber = req.params.trackingNumber;

    try {
        // Hacer la solicitud a la API de Track123
        const response = await fetch(`https://api.track123.com/v1/track?tracking_number=${trackingNumber}&api_key=2b383457e2a848aeb54e660b77933f32`);
        
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Error fetching tracking information' });
        }

        const data = await response.json();
        res.json(data); // Enviar los datos de seguimiento al cliente
    } catch (error) {
        console.error('Error fetching tracking information:', error);
        res.status(500).json({ error: 'Error fetching tracking information' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
