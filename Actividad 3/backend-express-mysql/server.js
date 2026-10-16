require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Validación simple
function validar({ nombre, descripcion }) {
  if (!nombre || nombre.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres.';
  if (!descripcion || descripcion.trim().length < 10) return 'La descripción debe tener al menos 10 caracteres.';
  return '';
}


// GET todos
app.get('/atractivos', async (req, res) => {
  const list = await db.all();
  res.json(list);
});

// GET por id
app.get('/atractivos/:id', async (req, res) => {
  const item = await db.findById(Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Atractivo no encontrado' });
  res.json(item);
});

// GET búsqueda ?nombre=&ubicacion=
app.get('/buscar', async (req, res) => {
  const { nombre = '', ubicacion = '' } = req.query;
  const list = await db.search({ nombre, ubicacion });
  res.json(list);
});


// POST crear
app.post('/atractivos', async (req, res) => {
  const error = validar(req.body);
  if (error) return res.status(400).json({ error });
  const nuevo = await db.create(req.body);
  res.status(201).json(nuevo);

});

// PUT actualizar
app.put('/atractivos/:id', async (req, res) => {
  const error = validar(req.body);
  if (error) return res.status(400).json({ error });
  const actualizado = await db.update(Number(req.params.id), req.body);
  if (!actualizado) return res.status(404).json({ error: 'Atractivo no encontrado' });
  res.json(actualizado);
});

// DELETE eliminar
app.delete('/atractivos/:id', async (req, res) => {
  const ok = await db.remove(Number(req.params.id));
  if (!ok) return res.status(404).json({ error: 'Atractivo no encontrado' });
  res.json({ mensaje: 'Atractivo eliminado correctamente' });
});

// 404
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

app.listen(PORT, () => console.log(`API MySQL lista en http://localhost:${PORT}`));
