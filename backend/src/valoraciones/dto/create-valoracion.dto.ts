import { IsInt, IsString, IsOptional, Min, Max } from 'class-validator';

export class CreateValoracionDto {
  @IsInt()
  productoId!: number;

  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsInt()
  @IsOptional()
  usuarioId?: number;

  @IsString()
  @IsOptional()
  comentario?: string;
}
