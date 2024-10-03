const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para obtener detalles de seguimiento
app.post('/track', async (req, res) => {
    const { trackingNumber } = req.body;

    if (!trackingNumber) {
        return res.status(400).json({ error: 'Número de seguimiento es requerido.' });
    }

    try {
        const response = await axios.post('https://api.17track.net/track/v2/gettrackinfo', {
            data: [{ number: trackingNumber }]
        }, {
            headers: {
                'Content-Type': 'application/json',
                '17token': '7FEB86258AED35FC8AF5D6BC3054CA0F'
            }
        });

        if (response.data.code !== 0) {
            return res.status(400).json({ error: 'Número de seguimiento inválido o no encontrado.' });
        }

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
