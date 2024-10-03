// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors()); // Habilitar CORS
app.use(express.json());

// Servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para manejar la solicitud de seguimiento
app.get('/track/:trackingNumber', async (req, res) => {
    const trackingNumber = req.params.trackingNumber;

    try {
        // Reemplaza 'YOUR_API_KEY' con tu clave de API de 17track
        const apiKey = '7FEB86258AED35FC8AF5D6BC3054CA0F';
        const url = `https://api.17track.net/v2/gettrackinfo?num=${trackingNumber}&apiKey=${apiKey}`;

        const response = await fetch(url);

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
