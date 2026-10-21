import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsString()
  @IsNotEmpty()
  comuna: string;

  @IsInt()
  @Min(0)
  precio: number;

  @IsString()
  @MinLength(10)
  descripcion: string;

  @IsOptional()
  @IsString()
  imagen?: string;

  @IsInt()
  @Min(0)
  stock: number;
}
