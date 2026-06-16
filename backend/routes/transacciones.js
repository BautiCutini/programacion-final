const express = require('express');
const router = express.Router();
const { crearTransaccion, obtenerTransaccion, actualizarTransaccion, eliminarTransaccion} = require('../models/transacciones');

router.post('/',crearTransaccion);

router.get('/', obtenerTransaccion);

router.put('/:id', actualizarTransaccion);

router.delete('/:id', eliminarTransaccion);

module.exports = router;