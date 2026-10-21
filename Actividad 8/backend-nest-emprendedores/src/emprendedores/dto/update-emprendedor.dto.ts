import { PartialType } from '@nestjs/swagger'
import { CreateEmprendedorDto } from './create-emprendedor.dto'

export class UpdateEmprendedorDto extends PartialType(CreateEmprendedorDto) {}
