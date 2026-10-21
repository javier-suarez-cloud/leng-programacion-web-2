import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Emprendedor {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string

  @Column()
  comuna: string

  @Column()
  rubro: string

  @Column({ type: 'text' })
  descripcion: string

  @Column()
  contacto: string
}
