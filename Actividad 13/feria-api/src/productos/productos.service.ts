import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductosService {
  private productos = [
    {
      id: 1,
      nombre: 'Miel de Las Trancas',
      categoria: 'Alimentos',
      comuna: 'Pinto',
      precio: 7500,
      descripcion: 'Miel artesanal producida en Ñuble.',
      imagen: '/img/miel.jpg'
    },
    {
      id: 2,
      nombre: 'Canasto de mimbre',
      categoria: 'Artesanía',
      comuna: 'Chillán',
      precio: 15990,
      descripcion: 'Canasto elaborado artesanalmente.',
      imagen: '/img/canasto.jpg'
    }
  ];

  findAll() {
    return this.productos;
  }

  findOne(id: number) {
    const producto = this.productos.find(p => p.id === id);
    if (!producto) throw new NotFoundException('Producto no encontrado');
    return producto;
  }

  create(datos: any) {
    const nuevo = {
      id: Math.max(0, ...this.productos.map(p => p.id)) + 1,
      ...datos,
      precio: Number(datos.precio)
    };
    this.productos.push(nuevo);
    return nuevo;
  }
}
