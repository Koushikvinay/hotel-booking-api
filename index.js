const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const uuid = require('uuid');
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let hotels = [];

app.get('/hotels', (req, res) => {
    res.json(hotels);
})

app.get('/hotels/:id', (req, res) => {
    const id = req.params.id;
    const hotel = hotel.find(hotel => hotel.id === id); 
    if (!hotel) {
        res.status(404).json({ error: 'Hotel not found' });
    }
    else {
        res.json(hotel);
    }
});

app.post('/hotels', (req, res) => {
    const { name, location, rating } = req.body;
    if (!name || !location || !rating) {
        res.status(400).json({ msg: 'Missing required fields' });
    }
    else {
        const id = uuid.v4();
        const newHotel = { id, name, location, rating };
        hotels.push(newHotel);
        res.status(200).json(newHotel)
    }
});

app.put('/hotels/:id', (req, res) => {
    const id = req.params.id;
    const { name, location, rating } = req.body;
    const hotel = hotel.find(h => h.id === id);
    if (!hotel) {
        res.status(404).json({ err: 'Hotel not found' });
    }
    else {
        hotel.name = name || hotel.name;
        hotel.location = location || hotel.location;
        hotel.rating = rating || hotel.rating;
        res.json(hotel);
    }

});

app.delete('/hotels/:id', (req, res) => {
    const id = req.params.id;
    const hotel = hotels.findIndex(h => h.id === id);
    if (!hotel) {
        res.status(400).json({ err: 'Hotel not found' });
        hotels.splice(hotel, 1);
        res.sendStatus(204);
    }
});

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});

 

    


