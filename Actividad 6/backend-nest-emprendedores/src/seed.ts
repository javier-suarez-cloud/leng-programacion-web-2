import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DataSource } from 'typeorm'
import { Emprendedor } from './emprendedores/entities/emprendedor.entity'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule)
  const ds = app.get(DataSource)
  const repo = ds.getRepository(Emprendedor)

  const base = [
    { nombre: 'Catedral Gifts', comuna: 'Chillán', rubro: 'Artesanía', descripcion: 'Souvenirs inspirados en la catedral.', contacto: 'catedral@negocio.cl' },
    { nombre: 'Miel Las Trancas', comuna: 'Pinto', rubro: 'Apicultura', descripcion: 'Miel de montaña 100% natural.', contacto: '+56 9 1234 5678' },
    { nombre: 'Quesos San Carlos', comuna: 'San Carlos', rubro: 'Lácteos', descripcion: 'Quesos artesanales madurados.', contacto: 'ventas@quesossancarlos.cl' }
  ]

  await repo.save(base)
  console.log('Datos de ejemplo insertados')
  await app.close()
}

bootstrap()
