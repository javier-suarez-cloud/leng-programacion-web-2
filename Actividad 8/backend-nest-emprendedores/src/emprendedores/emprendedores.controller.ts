import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateEmprendedorDto } from './dto/create-emprendedor.dto'
import { UpdateEmprendedorDto } from './dto/update-emprendedor.dto'
import { EmprendedoresService } from './emprendedores.service'

@ApiTags('emprendedores')
@Controller('emprendedores')
export class EmprendedoresController {
  constructor(private readonly service: EmprendedoresService) {}

  @Get()
  findAll() {
    return this.service.findAll()
  }

  @Get('buscar')
  buscar(@Query('comuna') comuna?: string, @Query('rubro') rubro?: string) {
    return this.service.buscar(comuna, rubro)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id))
  }

  @Post()
  create(@Body() dto: CreateEmprendedorDto) {
    return this.service.create(dto)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEmprendedorDto) {
    return this.service.update(Number(id), dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id))
  }
}
