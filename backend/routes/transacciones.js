const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middleware/auth');

const {
    crearTransaccion,
    obtenerTransaccion,
    actualizarTransaccion,
    eliminarTransaccion,
    obtenerBalance,
    filtrarTransacciones
} = require('../controllers/transaccionesController');

router.post('/', verificarToken, crearTransaccion);
router.get('/', verificarToken, obtenerTransaccion);
router.put('/:id', verificarToken, actualizarTransaccion);
router.delete('/:id', verificarToken, eliminarTransaccion);
router.get('/balance', verificarToken, obtenerBalance);
router.get('/filtrar', verificarToken, filtrarTransacciones);

module.exports = router;