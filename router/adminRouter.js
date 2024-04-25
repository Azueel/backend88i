const express = require('express');
const {
	listaUsuarios,
	crearProducto,
	listaProductos,
	eliminarProducto,
	editarProducto,
} = require('../controllers/adminControllers');

const routerAdmin = express.Router();

routerAdmin.post('/crearProducto', crearProducto);

routerAdmin.get('/enviarProductos', listaProductos);

routerAdmin.put('/editarProducto', editarProducto);

routerAdmin.delete('/eliminarProducto/:id', eliminarProducto);

routerAdmin.get('/enviarUsuarios', listaUsuarios);

//forma de exportar en node
module.exports = routerAdmin;
