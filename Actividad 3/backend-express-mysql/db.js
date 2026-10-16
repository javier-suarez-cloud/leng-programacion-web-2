require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});


// Helpers de acceso a datos
async function all() {
  const [rows] = await pool.query(
    'SELECT id, nombre, descripcion, COALESCE(ubicacion, "") ubicacion FROM atractivos ORDER BY id'
  );
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query(
    'SELECT id, nombre, descripcion, COALESCE(ubicacion, "") ubicacion FROM atractivos WHERE id = ?',
    [id]
  );
  return rows[0] || null;
}

async function search({ nombre = '', ubicacion = '' }) {
  let sql = 'SELECT id, nombre, descripcion, COALESCE(ubicacion, "") ubicacion FROM atractivos WHERE 1=1';
  const params = [];
  if (nombre) { sql += ' AND LOWER(nombre) LIKE ?'; params.push(`%${nombre.toLowerCase()}%`); }
  if (ubicacion) { sql += ' AND LOWER(ubicacion) LIKE ?'; params.push(`%${ubicacion.toLowerCase()}%`); }
  sql += ' ORDER BY id';
  const [rows] = await pool.query(sql, params);
  return rows;
}

async function create({ nombre, descripcion, ubicacion = '' }) {
  const [res] = await pool.query(
    'INSERT INTO atractivos (nombre, descripcion, ubicacion) VALUES (?,?,?)',
    [nombre.trim(), descripcion.trim(), (ubicacion || '').trim()]
  );
  return findById(res.insertId);
}

async function update(id, { nombre, descripcion, ubicacion = '' }) {
  const [res] = await pool.query(
    'UPDATE atractivos SET nombre=?, descripcion=?, ubicacion=? WHERE id=?',
    [nombre.trim(), descripcion.trim(), (ubicacion || '').trim(), id]
  );
  if (res.affectedRows === 0) return null;
  return findById(id);
}

async function remove(id) {
  const [res] = await pool.query('DELETE FROM atractivos WHERE id=?', [id]);
  return res.affectedRows > 0;
}

module.exports = { all, findById, search, create, update, remove };
