const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/getTrackInfo", async (req, res) => {
    const trackingNumbers = req.body; // Obtiene los números de seguimiento del cuerpo de la solicitud

    const options = {
        method: 'POST',
        url: 'https://api.17track.net/track/v2.2/gettrackinfo',
        headers: {
            'content-type': 'application/json',
            '17token': '7FEB86258AED35FC8AF5D6BC3054CA0F' // Reemplaza esto con tu clave secreta
        },
        data: JSON.stringify(trackingNumbers) // Convierte el array de objetos a una cadena JSON
    };

    try {
        const response = await axios.request(options);
        res.json(response.data); // Envía la respuesta de la API al cliente
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en la solicitud a la API");
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
