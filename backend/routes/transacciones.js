const express = require('express');
const router = express.Router();
const { crearTransaccion, obtenerTransaccion } = require('../models/transacciones');

router.post('/',crearTransaccion);

router.get('/', obtenerTransaccion);

module.exports = router;