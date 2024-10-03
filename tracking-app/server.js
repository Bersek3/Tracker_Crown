const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Habilitar CORS
app.use(cors());
app.use(express.json());

// API Key de Track123
const TRACK123_API_KEY = '2b383457e2a848aeb54e660b77933f32';

// Ruta para obtener la información de seguimiento
app.get('/track/:trackingNumber', async (req, res) => {
    const trackingNumber = req.params.trackingNumber;

    try {
        const response = await axios.get(`https://api.track123.com/v1/track`, {
            params: {
                tracking_number: trackingNumber,
                api_key: TRACK123_API_KEY
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tracking information', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
