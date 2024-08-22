//este seria nuestro MAIN

//USANDO REQUIRE
// const express = require('express');
// const app = express();

//USANDO MODULOS
import express from 'express'
import getSequelizeInstance from './src/models/index.js';
import defineUserModel from './src/models/user.js';
import userRoutes from './src/routes/userRoutes.js'

const app = express();

const PORT = '3000';

async function startServer(){
try {
    const sequelize = await getSequelizeInstance();
    await defineUserModel();
    console.log('Modelos sincronizados correctamente');
    app.listen(PORT ,()=> console.log(`servidor corriendo en el puerto ${PORT}`));
} catch (error) {
    console.error('Ocurrio un error', error);
    
}
}



//middleware
app.use(express.json());

//rutas principales
app.use('/user', userRoutes);
app.use('/', (req, res) => res.send('<h1>Hola Index</h1>'));

startServer();