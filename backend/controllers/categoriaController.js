const {Categoria} = require('../models');

const listarCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    console.error('Error al listar categorías:', error);
    res.status(500).json({ error: 'Error al listar categorías' });
  }
};

const crearCategoria = async (req, res) => {
  try {
    const { nombre, tipo, user_id } = req.body;
    const categoria = await Categoria.create({ nombre, tipo, user_id });

    res.status(201).json({
      message: 'Categoría creada exitosamente',
      categoria
    });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ error: 'Error al crear categoría' });
  }
};

const editarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, tipo } = req.body;

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    await categoria.update({ nombre, tipo });

    res.json({
        message: 'Categoría actualizada exitosamente',
        categoria
    });
  } catch (error) {
    console.error('Error al editar categoría:', error);
    res.status(500).json({ error: 'Error al editar categoría' });
  }
};

const eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        const categoria = await Categoria.findByPk(id);

        if (!categoria) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        await categoria.destroy();

        res.json({ message: 'Categoría eliminada exitosamente' });

    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        res.status(500).json({ error: 'Error al eliminar categoría' });
    }
};

module.exports = { listarCategorias, crearCategoria, editarCategoria, eliminarCategoria };