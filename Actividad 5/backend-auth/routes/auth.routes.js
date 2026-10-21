const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { usuarios } = require('../data');

const router = express.Router();
const ROLES = ['admin', 'viewer'];

// POST /auth/register -> crea un usuario de prueba
router.post('/register', async (req, res) => {
  const { email, password, rol = 'viewer' } = req.body || {};

  if (!email || !password || password.length < 6) {
    return res.status(400).json({ error: 'Email y password (mínimo 6 caracteres) son obligatorios.' });
  }
  if (!ROLES.includes(rol)) {
    return res.status(400).json({ error: 'El rol debe ser admin o viewer.' });
  }
  if (usuarios.some(u => u.email === email)) {
    return res.status(409).json({ error: 'El email ya está registrado.' });
  }

  const nuevo = {
    id: Math.max(0, ...usuarios.map(u => u.id)) + 1,
    email,
    password: await bcrypt.hash(password, 10),
    rol
  };
  usuarios.push(nuevo);

  // Nunca se devuelve la contraseña
  res.status(201).json({ id: nuevo.id, email: nuevo.email, rol: nuevo.rol });
});

// POST /auth/login -> valida credenciales y devuelve un token JWT
router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  const usuario = usuarios.find(u => u.email === email);

  if (!usuario || !(await bcrypt.compare(password || '', usuario.password))) {
    return res.status(401).json({ error: 'Credenciales inválidas.' });
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || '2h' }
  );

  res.json({ token, email: usuario.email, rol: usuario.rol });
});

module.exports = router;
