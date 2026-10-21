import 'dotenv/config'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Emprendedor } from './emprendedores/entities/emprendedor.entity'
import { EmprendedoresModule } from './emprendedores/emprendedores.module'

@Module({
  imports: [
    // MySQL (recomendado en el curso)
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 3306),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Emprendedor],
      synchronize: true // SOLO en desarrollo (no en producción)
    }),

    // Alternativa SQLite (si no tienes MySQL):
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'data.db',
    //   entities: [Emprendedor],
    //   synchronize: true
    // }),

    EmprendedoresModule
  ],
})
export class AppModule {}
