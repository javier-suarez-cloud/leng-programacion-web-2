import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateEmprendedorDto } from './dto/create-emprendedor.dto'
import { UpdateEmprendedorDto } from './dto/update-emprendedor.dto'
import { Emprendedor } from './entities/emprendedor.entity'

@Injectable()
export class EmprendedoresService {
  constructor(
    @InjectRepository(Emprendedor)
    private repo: Repository<Emprendedor>,
  ) {}

  findAll() {
    return this.repo.find()
  }

  async findOne(id: number) {
    const found = await this.repo.findOne({ where: { id } })
    if (!found) throw new NotFoundException({ error: 'Emprendedor no encontrado' })
    return found
  }

  create(dto: CreateEmprendedorDto) {
    const ent = this.repo.create(dto)
    return this.repo.save(ent)
  }

  async update(id: number, dto: UpdateEmprendedorDto) {
    const prev = await this.findOne(id)
    Object.assign(prev, dto)
    return this.repo.save(prev)
  }

  async remove(id: number) {
    const prev = await this.findOne(id)
    await this.repo.remove(prev)
    return { ok: true }
  }

  async buscar(comuna?: string, rubro?: string) {
    const qb = this.repo.createQueryBuilder('e')
    if (comuna) qb.andWhere('e.comuna = :comuna', { comuna })
    if (rubro) qb.andWhere('e.rubro = :rubro', { rubro })
    return qb.getMany()
  }
}
