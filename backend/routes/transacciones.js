const express = require('express');
const router = express.Router();

const {
    crearTransaccion,
    obtenerTransaccion,
    actualizarTransaccion,
    eliminarTransaccion,
    obtenerBalance,
    filtrarTransacciones
} = require('../controllers/transaccionesController');

router.post('/', crearTransaccion);
router.get('/', obtenerTransaccion);
router.put('/:id', actualizarTransaccion);
router.delete('/:id', eliminarTransaccion);
router.get('/balance', obtenerBalance);
router.get('/filtrar', filtrarTransacciones);

module.exports = router;
