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

const eliminarTransaccion = async (req, res) => {
  try {
    const { id } = req.params;

    const transaccion = await Transaccion.findByPk(id);

    if (!transaccion) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }

    await transaccion.destroy();

    return res.status(200).json({ message: 'Transacción eliminada exitosamente' });
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const obtenerBalance = async (req, res) => {
  try {
    const totalIngresos = await Transaccion.sum('monto', { where: { tipo: 'ingreso' } });
    const totalGastos = await Transaccion.sum('monto', { where: { tipo: 'gasto' } });

    const ingresos = totalIngresos || 0;
    const gastos = totalGastos || 0;

    return res.status(200).json({
      ingresos,
      gastos,
      balance: ingresos - gastos
    });
  } catch (error) {
    console.error('Error al obtener balance:', error.message);
    return res.status(500).json({ error: 'Error al obtener balance' });
  }
};

const filtrarTransacciones = async (req, res) => {
  try {
    const { fecha, categoria_id } = req.query;

    const where = {};

    if (fecha) {
      where.fecha = fecha;
    }

    if (categoria_id) {
      where.categoria_id = categoria_id;
    }

    const transacciones = await Transaccion.findAll({ where });

    return res.status(200).json(transacciones);
  } catch (error) {
    console.error('Error al filtrar transacciones:', error.message);
    return res.status(500).json({ error: 'Error al filtrar transacciones' });
  }
};


module.exports = {
  crearTransaccion,
  obtenerTransaccion,
  actualizarTransaccion,
  eliminarTransaccion,
  obtenerBalance,
  filtrarTransacciones
};
