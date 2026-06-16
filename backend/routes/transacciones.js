const express = require('express');
const router = express.Router();

const {
    crearTransaccion,
    obtenerTransaccion,
    obtenerBalance,
    filtrarTransacciones
} = require('../models/transacciones');

router.post('/', crearTransaccion);

router.get('/', obtenerTransaccion);

router.get('/balance', obtenerBalance);

router.get('/filtro', filtrarTransacciones);

module.exports = router;