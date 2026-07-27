const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_por_defecto';

function generarToken(user) {
  return jwt.sign (
    { id: user.id, email: user.email }, 
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: 'Formato de token inválido' });
  }

  try {
    // TODO: Verificar y decodificar el token con jwt.verify()
    // Si es válido, guardar los datos del usuario en req.user y llamar a next()
    // Si es inválido, devolver status 401 con un mensaje de error
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

module.exports = { generarToken, verificarToken };