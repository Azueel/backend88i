const Usuario = require('../model/usuario-model');
const bcrypt = require('bcrypt');

const crearUsuario = async (req, res) => {
	const { name, email, password } = req.body;

	//validar los datos
	if (!name || !email || !password) {
		return res.status(400).json({
			msg: 'Todos los campos son obligatorios',
		});
	}

	try {
		//analizamos si el correo ingresado no esta registrado
		let usuario = await Usuario.findOne({ email });

		if (usuario) {
			return res.status(400).json({
				msg: 'Un Usuario ya existe con este correo',
			});
		}

		//en el caso que no exista el correo, creamos una instancia
		usuario = new Usuario(req.body);

		//encriptamos contraseña
		const salt = bcrypt.genSaltSync(10);
		usuario.password = bcrypt.hashSync(password, salt);

		//guardamos en la base de datos
		await usuario.save();

		res.status(201).json({
			msg: 'Usuario registrado',
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Por favor contacterse con un administracion',
		});
	}
};

const loginUsuario = async (req, res) => {
	const { email, password } = req.body;

	//validar los datos
	if (!email || !password) {
		return res.status(400).json({
			msg: 'Todos los campos son obligatorios',
		});
	}

	try {
		let usuario = await Usuario.findOne({ email });
		if (!usuario) {
			return res.status(400).json({
				msg: 'Correo o contraseña no son correctos',
			});
		}

		const validarPassword = bcrypt.compareSync(password, usuario.password);

		if (!validarPassword) {
			return res.status(400).json({
				msg: 'Correo o contraseña no son correctos',
			});
		}

		res.status(200).json({
			modal: 'success',
			msg: 'Usuario Logueado correctamente',
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Por favor contacterse con un administracion',
		});
		console.log(error);
	}
};

module.exports = {
	crearUsuario,
	loginUsuario,
};
