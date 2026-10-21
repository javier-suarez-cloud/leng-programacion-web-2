import imgQueso from '../assets/img/quesos-chillan.jpg'
import imgMiel from '../assets/img/miel-chillan.jpg'
import imgTejidos from '../assets/img/tejidos-chillan.jpg'
import imgGreda from '../assets/img/greda-quinchamali.jpg'

export const productos = [
  {
    id: 1,
    nombre: 'Queso Chanco de San Carlos',
    precio: 4500,
    categoria: 'Lácteos',
    imagen: imgQueso,
    descripcion: 'Queso artesanal de vaca, maduración media, tradicional de Ñuble.'
  },
  {
    id: 2,
    nombre: 'Miel de Quillón',
    precio: 3500,
    categoria: 'Miel',
    imagen: imgMiel,
    descripcion: 'Miel multifloral de productores locales, sin aditivos.'
  },
  {
    id: 3,
    nombre: 'Poncho tejido de Coihueco',
    precio: 22000,
    categoria: 'Textil',
    imagen: imgTejidos,
    descripcion: 'Poncho de lana natural, tejido a telar por artesanas de la zona.'
  },
  {
    id: 4,
    nombre: 'Chanchito de greda de Quinchamalí',
    precio: 8000,
    categoria: 'Artesanía',
    imagen: imgGreda,
    descripcion: 'Pieza de greda negra con decoración blanca, típica de la alfarería de Quinchamalí.'
  }
]
