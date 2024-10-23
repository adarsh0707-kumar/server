const express = require('express');
const app = express();
const productRoute = require('./api/routes/product');
const formRoute = require('./api/routes/form');
const categoryRoute = require('./api/routes/category');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');



mongoose.connect('mongodb+srv://ak1394986:GzY2ImcUGuDblbg0@cluster0.edq2a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

mongoose.connection.on('error', err => {
    console.log('Connection failed', err);
});

mongoose.connection.on('connected', connected => {
    console.log('Connected to database....');
});

class RouteNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RouteNotFoundError';
    }
}
// app.use(bodyParser.json());
app.use(express.json());

app.use(fileUpload({
    useTempFiles: true
}));


app.use(cors());
app.use('/product', productRoute);
app.use('/form', formRoute);
app.use('/category', categoryRoute);

app.use((err, req, res, next) => {
    if (err instanceof RouteNotFoundError) {
        res.status(404).json({ error: 'Not Found' });
    } else {
        console.error(err);
        res.status(400).json({ error: 'Bad Request' });
    }
});


module.exports = app;