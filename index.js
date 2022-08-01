const express = require('express');

const routerApi = require('./src/routers');

const { logError, errorHandler } = require('./src/middlewares/error.handler.js');

const app = express();
const port = 3001;

app.use(express.json());

//aca vamos a poner los cors

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

//aca mostrando la ruta principal
app.get('/', (req, res) => {
    res.send("Esta funcionando correctamente!");
})


//aca utilizamos la funcion que contiene todas las rutas
routerApi(app);//y pasamos app como argumento

//aca queremos poner los middleware de errores
app.use(logError);
app.use(errorHandler);


//por ultimo el puerto por donde escucha
app.listen(port, () => {
    console.log(`Utilizando el puerto ${port}`);
})