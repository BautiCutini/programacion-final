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
    obtenerBalance,
    filtrarTransacciones
}