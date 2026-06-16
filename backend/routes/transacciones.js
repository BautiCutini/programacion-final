const express = require('express');
const router = express.Router();

const {
    crearTransaccion,
    obtenerTransaccion,
    actualizarTransaccion,
    eliminarTransaccion,
    obtenerBalance,
    filtrarTransacciones
} = require('../models/transacciones');

router.post('/', crearTransaccion);

router.get('/', obtenerTransaccion);

router.put('/:id', actualizarTransaccion);

router.delete('/:id', eliminarTransaccion);
router.get('/balance', obtenerBalance);

router.get('/filtro', filtrarTransacciones);

module.exports = router;