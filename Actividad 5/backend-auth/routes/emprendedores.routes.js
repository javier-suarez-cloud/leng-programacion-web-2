const express = require('express');
const { emprendedores } = require('../data');
const { verificarToken, soloAdmin } = require('../middleware/auth');

const router = express.Router();
const RUBROS = ['Apicultura', 'Lácteos', 'Textiles', 'Turismo', 'Artesanía', 'Agricultura'];

function validar({ nombre, comuna, rubro, descripcion, contacto }) {
  if (!nombre || nombre.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres.';
  if (!comuna || !comuna.trim()) return 'La comuna es obligatoria.';
  if (!RUBROS.includes(rubro)) return `El rubro debe ser uno de: ${RUBROS.join(', ')}.`;
  if (!descripcion || descripcion.trim().length < 10) return 'La descripción debe tener al menos 10 caracteres.';
  if (!contacto || !contacto.trim()) return 'El contacto es obligatorio.';
  return '';
}

// Rutas públicas: cualquiera puede listar y buscar
router.get('/', (req, res) => {
  res.json(emprendedores);
});

router.get('/buscar', (req, res) => {
  const comuna = (req.query.comuna || '').toLowerCase();
  const rubro = (req.query.rubro || '').toLowerCase();
  const resultado = emprendedores.filter(e =>
    (!comuna || e.comuna.toLowerCase().includes(comuna)) &&
    (!rubro || e.rubro.toLowerCase() === rubro)
  );
  res.json(resultado);
});

// Rutas protegidas: primero verificarToken, luego soloAdmin
router.post('/', verificarToken, soloAdmin, (req, res) => {
  const error = validar(req.body || {});
  if (error) return res.status(400).json({ error });

  const { nombre, comuna, rubro, descripcion, contacto } = req.body;
  const nuevo = {
    id: Math.max(0, ...emprendedores.map(e => e.id)) + 1,
    nombre: nombre.trim(),
    comuna: comuna.trim(),
    rubro,
    descripcion: descripcion.trim(),
    contacto: contacto.trim()
  };
  emprendedores.push(nuevo);
  res.status(201).json(nuevo);
});

router.put('/:id', verificarToken, soloAdmin, (req, res) => {
  const item = emprendedores.find(e => e.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Emprendedor no encontrado' });

  const error = validar(req.body || {});
  if (error) return res.status(400).json({ error });

  const { nombre, comuna, rubro, descripcion, contacto } = req.body;
  Object.assign(item, {
    nombre: nombre.trim(),
    comuna: comuna.trim(),
    rubro,
    descripcion: descripcion.trim(),
    contacto: contacto.trim()
  });
  res.json(item);
});

router.delete('/:id', verificarToken, soloAdmin, (req, res) => {
  const index = emprendedores.findIndex(e => e.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Emprendedor no encontrado' });

  emprendedores.splice(index, 1);
  res.json({ mensaje: 'Emprendedor eliminado correctamente' });
});

module.exports = router;