import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 60 })
  categoria: string;

  @Column({ length: 60 })
  comuna: string;

  @Column('int')
  precio: number;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ length: 255, default: '' })
  imagen: string;

  @Column({ type: 'int', default: 0 })
  stock: number;
}
