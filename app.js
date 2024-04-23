//forma de importar en node
const express = require('express');
const dbConnection = require('./database/config');
const cors = require('cors');
const app = express();
require('dotenv').config();

//lectura y parseo del body
app.use(express.json());

app.use(cors());

app.use('/auth', require('./router/authRouter'));

dbConnection();

//llamamos a un servidor definimos el puerto y ejecutamos un callback que muestre el siguiente mensaje si se levanto correctamente
app.listen(process.env.PORT, () => {
	console.log(`Ejecutandose en el puerto ${process.env.PORT}`);
});
