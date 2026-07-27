const transaccionesvalidator = (req, res, next) => {
  const { monto, tipo, descripcion, usuario_id, fecha, categoria_id } = req.body;
  if (monto === undefined || tipo === undefined || descripcion === undefined || usuario_id === undefined || fecha === undefined || categoria_id === undefined) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
    if (typeof monto !== 'number' || monto <= 0) {
    return res.status(400).json({ error: 'El monto debe ser un número positivo' });
  }
    if (tipo !== 'ingreso' && tipo !== 'gasto') {
    return res.status(400).json({ error: 'El tipo debe ser "ingreso" o "gasto"' });
  }
  next();
}
module.exports= transaccionesvalidator;