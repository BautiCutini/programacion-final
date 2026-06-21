const { Transaccion } = require('../models');

const crearTransaccion = async (req, res) => {
  try {
    const { monto, tipo, descripcion, user_id, fecha, categoria_id } = req.body;

    const nuevaTransaccion = await Transaccion.create({
      monto,
      tipo,
      descripcion,
      user_id,
      fecha,
      categoria_id
    });

    return res.status(201).json(nuevaTransaccion);
  } catch (error) {
    console.error('Error al crear transacción:', error.message);
    return res.status(500).json({ error: error.message });
  }
};

const obtenerTransaccion = async (req, res) => {
  try {
    const transacciones = await Transaccion.findAll();
    return res.status(200).json(transacciones);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener transacciones' });
  }
};

const actualizarTransaccion = async (req, res) => {
  try {
    const { id } = req.params;
    const { monto, tipo, descripcion, user_id, fecha, categoria_id } = req.body;

    const transaccion = await Transaccion.findByPk(id);

    if (!transaccion) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }

    await transaccion.update({
      monto,
      tipo,
      descripcion,
      user_id,
      fecha,
      categoria_id
    });

    return res.status(200).json(transaccion);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearTransaccion,
  obtenerTransaccion,
  actualizarTransaccion
};
