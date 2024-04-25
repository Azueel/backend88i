const Productos = require('../model/producto-model');
const Usuarios = require('../model/usuario-model');

const listaUsuarios = async (req, res) => {
	try {
		const listaUsuarios = await Usuarios.find();

		res.status(200).json({
			listaUsuarios,
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Por favor contactarse con un administrador',
		});
	}
};

const listaProductos = async (req, res) => {
	try {
		const listaProductos = await Productos.find();

		res.status(200).json({
			listaProductos,
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Por favor contactarse con un administrador',
		});
	}
};

const crearProducto = async (req, res) => {
	const { name, precio, descripcion } = req.body;

	try {
		//validar los datos
		if (!name || !precio || !descripcion) {
			return res.status(400).json({
				msg: 'Todos los campos son obligatorios',
			});
		}

		const producto = new Productos(req.body);

		await producto.save();

		res.status(201).json({
			msg: 'Producto Creado',
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Por favor contactarse con un administrador',
		});
	}
};

const eliminarProducto = async (req, res) => {
	try {
		const productoEliminar = await Productos.findById(req.params.id);

		if (!productoEliminar) {
			return res.status(400).json({
				msg: 'No existe ningun Producto con este ID',
			});
		}

		await Productos.findByIdAndDelete(req.params.id);

		res.status(200).json({
			msg: 'Producto Eliminado Correctamente',
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Por favor contactarse con un administrador',
		});
	}
};

const editarProducto = async (req, res) => {
	try {
		const productoEditar = await Productos.findById(req.body._id);

		if (!productoEditar) {
			return res.status(400).json({
				msg: 'No existe ningun Producto con este ID',
			});
		}
		await Productos.findByIdAndUpdate(req.body._id, req.body);

		res.status(200).json({
			msg: 'Producto Editado Correctamente',
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Por favor contactarse con un administrador',
		});
	}
};

module.exports = {
	listaUsuarios,
	crearProducto,
	listaProductos,
	eliminarProducto,
	editarProducto,
};
