const express = require('express');
const router = express.Router();
const {listarCategorias, crearCategoria, editarCategoria, eliminarCategoria} = require('../controllers/categoriaController');

// GET 
router.get('/', listarCategorias);


// POST
router.post('/', crearCategoria);

// PUT
router.put('/:id', editarCategoria);

// DELETE
router.delete('/:id', eliminarCategoria);

module.exports = router;