const pool = require('../utils/db');
 
const crearTransaccion = async (req, res) => {

  try {
    const { monto,
        tipo,
        descripcion,
        user_id,
        fecha,
        categoria_id } = req.body;
        console.log('body:', req.body);
        console.log('valores:', monto, tipo, descripcion, user_id, fecha, categoria_id);

        const result = await pool.query(
            'insert into transacciones (monto, tipo, descripcion, user_id, fecha, categoria_id) values ($1, $2, $3, $4, $5, $6) returning *',
            [monto, tipo, descripcion, user_id, fecha, categoria_id]
            
            
        );
    return res.status(201).json(result.rows[0]);
 } catch (error) {
    console.error('Error al crear transacción:', error.message);
    return res.status(500).json({ error: error.message });
}
};
const obtenerTransaccion = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM transacciones');
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({
      error: 'Error al obtener transacciones'
    });
  }
};

const actualizarTransaccion = async (req, res) => {
  try {
    const { id } = req.params;
    const { monto, tipo, descripcion, user_id, fecha, categoria_id } = req.body;

    const result = await pool.query(
      'UPDATE transacciones SET monto = $1, tipo = $2, descripcion = $3, user_id = $4, fecha = $5, categoria_id = $6 WHERE id = $7 RETURNING *',
      [monto, tipo, descripcion, user_id, fecha, categoria_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }

    return res.status(200).json({ message: 'Transacción actualizada exitosamente', transaccion: result.rows[0] });
  } catch (error) {
    console.error('Error al actualizar transacción:', error.message);
    return res.status(500).json({ error: error.message });
  }
};

const eliminarTransaccion = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM transacciones WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }

    return res.status(200).json({ message: 'Transacción eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar transacción:', error.message);
    return res.status(500).json({ error: error.message });
  }
};

const obtenerBalance = async (req, res) => {
  try {
    const ingresos = await pool.query(
      "SELECT COALESCE(SUM(monto),0) as total FROM transacciones WHERE tipo = 'ingreso'"
    );
  
    const gastos = await pool.query(
      "SELECT COALESCE(SUM(monto),0) as total FROM transacciones WHERE tipo = 'gasto'"
    );
  
    const totalIngresos = Number(ingresos.rows[0].total);
    const totalGastos = Number(gastos.rows[0].total);
  
    return res.status(200).json({
      ingresos: totalIngresos,
      gastos: totalGastos,
      balance: totalIngresos - totalGastos
    });
  
  } catch (error) {
    return res.status(500).json({
      error: 'Error al obtener balance'
    });
  }
};

const filtrarTransacciones = async (req, res) => {
  try {
    const { fecha, categoria_id } = req.query;
  
    let query = 'SELECT * FROM transacciones WHERE 1=1';
    const values = [];
  
    if (fecha) {
      values.push(fecha);
      query += ` AND fecha = $${values.length}`;
    }
  
    if (categoria_id) {
      values.push(categoria_id);
      query += ` AND categoria_id = $${values.length}`;
    }
  
    const resultado = await pool.query(query, values);
  
    return res.status(200).json(resultado.rows);
  
  } catch (error) {
    return res.status(500).json({
      error: 'Error al filtrar transacciones'
    });
  }
};

module.exports = {
    crearTransaccion,
    obtenerTransaccion,
    actualizarTransaccion,
    eliminarTransaccion,
    obtenerBalance,
    filtrarTransacciones
}
