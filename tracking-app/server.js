const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Endpoint para hacer seguimiento
app.get('/track/:trackingNumber', async (req, res) => {
    const trackingNumber = req.params.trackingNumber;

    try {
        const response = await fetch(`https://api.track123.com/v1/track?tracking_number=${trackingNumber}`, {
            headers: {
                'Authorization': 'Bearer 2b383457e2a848aeb54e660b77933f32', // Usa tu API Key aquí
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching tracking information:', error);
        res.status(500).send('Error fetching tracking information');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
