import { IsInt, IsString, IsOptional, Min, Max } from 'class-validator';

export class UpdateValoracionDto {
  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsString()
  @IsOptional()
  comentario?: string;
}
