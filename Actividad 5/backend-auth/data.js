const bcrypt = require('bcryptjs');

// Usuarios de prueba (las contraseñas se guardan encriptadas con bcrypt)
const usuarios = [
  { id: 1, email: 'admin@nuble.cl', password: bcrypt.hashSync('admin123', 10), rol: 'admin' },
  { id: 2, email: 'viewer@nuble.cl', password: bcrypt.hashSync('viewer123', 10), rol: 'viewer' }
];

const emprendedores = [
  { id: 1, nombre: 'Miel Las Trancas', comuna: 'Pinto', rubro: 'Apicultura', descripcion: 'Miel de montaña 100% natural.', contacto: '+56 9 1234 5678' },
  { id: 2, nombre: 'Quesos San Carlos', comuna: 'San Carlos', rubro: 'Lácteos', descripcion: 'Quesos artesanales madurados.', contacto: 'ventas@quesossancarlos.cl' },
  { id: 3, nombre: 'Telar Coihueco', comuna: 'Coihueco', rubro: 'Textiles', descripcion: 'Ponchos y mantas tejidas a telar.', contacto: 'telar@coihueco.cl' }
];

module.exports = { usuarios, emprendedores };