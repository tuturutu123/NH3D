import { IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class CreateEnvioDto {
  @IsNumber()
  pedidoId!: number;

  @IsString()
  metodo!: string;

  @IsNumber()
  @Min(0)
  costo!: number;

  @IsString()
  @IsOptional()
  tracking?: string;
}
