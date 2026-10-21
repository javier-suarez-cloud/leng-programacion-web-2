const jwt = require('jsonwebtoken');

// Verifica que la petición traiga un token JWT válido en el header Authorization
function verificarToken(req, res, next) {
  const header = req.headers.authorization || '';
  const [tipo, token] = header.split(' ');

  if (tipo !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

// Deja pasar solo a usuarios con rol admin (se usa después de verificarToken)
function soloAdmin(req, res, next) {
  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({ error: 'Acceso permitido solo para administradores' });
  }
  next();
}

module.exports = { verificarToken, soloAdmin };