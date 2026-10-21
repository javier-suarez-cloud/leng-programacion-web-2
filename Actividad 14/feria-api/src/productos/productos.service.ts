import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productosRepo: Repository<Producto>,
  ) {}

  findAll() {
    return this.productosRepo.find({
      order: { id: 'DESC' },
    });
  }

  // Desafío: búsqueda por comuna (sin distinguir mayúsculas)
  buscarPorComuna(comuna: string) {
    return this.productosRepo
      .createQueryBuilder('p')
      .where('LOWER(p.comuna) LIKE :comuna', { comuna: `%${comuna.toLowerCase()}%` })
      .orderBy('p.id', 'DESC')
      .getMany();
  }

  async findOne(id: number) {
    const producto = await this.productosRepo.findOneBy({ id });

    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    return producto;
  }

  async create(dto: CreateProductoDto) {
    const producto = this.productosRepo.create(dto);
    return this.productosRepo.save(producto);
  }

  async update(id: number, dto: UpdateProductoDto) {
    const producto = await this.findOne(id);
    Object.assign(producto, dto);
    return this.productosRepo.save(producto);
  }

  async remove(id: number) {
    const producto = await this.findOne(id);
    await this.productosRepo.remove(producto);

    return {
      mensaje: 'Producto eliminado correctamente',
      id,
    };
  }
}
