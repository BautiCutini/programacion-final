const express = require('express');
const router = express.Router();

const {
    crearTransaccion,
    obtenerTransaccion,
    actualizarTransaccion
} = require('../controllers/transaccionesController');

router.post('/', crearTransaccion);
router.get('/', obtenerTransaccion);
router.put('/:id', actualizarTransaccion);

module.exports = router;
