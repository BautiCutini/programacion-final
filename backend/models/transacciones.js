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

module.exports = {
    crearTransaccion,
    obtenerTransaccion
}