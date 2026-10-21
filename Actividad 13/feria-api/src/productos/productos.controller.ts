import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(Number(id));
  }

  @Post()
  create(@Body() producto: any) {
    return this.productosService.create(producto);
  }
}
