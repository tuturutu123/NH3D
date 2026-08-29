import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nombre?: string;
}
