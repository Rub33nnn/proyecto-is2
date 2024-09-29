"use strict";
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
//configurar almacenamiento de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'assets/imgpost')); //ubicacion de las imagenes 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); //renombrar el archivo
    }
});
const upload = multer({ storage: storage });
//Ruta para manejar la carga de archivos
app.post('/upload', upload.single), (req, res) => {
    if (!req.file) {
        return res.status(400).send('no file uploaded');
    }
    res.send({
        message: 'File uploaded succefully',
        filePath: '/assets/imgpost/${req.file.filename}'
    });
};
app.listen(process.env.PORT || '3001', () => {
    console.log('Server en el puerto 3001');
});
