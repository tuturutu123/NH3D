import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateMarcaDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nombre?: string;
}
