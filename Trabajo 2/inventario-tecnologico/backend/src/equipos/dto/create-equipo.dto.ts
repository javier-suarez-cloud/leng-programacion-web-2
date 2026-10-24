import { IsDateString, IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export const ESTADOS = ['Disponible', 'En uso', 'Mantención', 'Baja'];

export class CreateEquipoDto {
  @IsString()
  @MinLength(3)
  codigoInventario: string;

  @IsString()
  @MinLength(3)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsString()
  @IsNotEmpty()
  modelo: string;

  @IsString()
  @IsNotEmpty()
  ubicacion: string;

  @IsIn(ESTADOS, { message: `estado debe ser uno de: ${ESTADOS.join(', ')}` })
  estado: string;

  @IsDateString()
  fechaAdquisicion: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}