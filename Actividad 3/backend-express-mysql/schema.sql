CREATE TABLE IF NOT EXISTS atractivos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  descripcion TEXT NOT NULL,
  ubicacion VARCHAR(120) NULL
);

INSERT INTO atractivos (nombre, descripcion, ubicacion) VALUES
('Catedral de Chillán', 'Símbolo arquitectónico y punto de encuentro de la ciudad.', 'Centro'),
('Termas de Chillán', 'Zona de montaña con termas, centro de ski y senderos.', 'Cordillera'),
('Valle Las Trancas', 'Paisajes, bosques y rutas de trekking para todos los niveles.', 'Precordillera');