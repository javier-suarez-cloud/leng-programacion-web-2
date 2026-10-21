import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  inicio() {
    return { mensaje: 'API Feria Artesanal de Ñuble' };
  }

  @Get('health')
  health() {
    return { status: 'ok', servicio: 'feria-api' };
  }
}
