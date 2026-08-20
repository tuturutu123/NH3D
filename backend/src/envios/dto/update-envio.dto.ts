import { IsString, IsOptional, IsIn } from 'class-validator';

export class UpdateEnvioDto {
  @IsString()
  @IsOptional()
  @IsIn(['PENDIENTE', 'EN_TRANSITO', 'ENTREGADO', 'CANCELADO'])
  estado?: string;

  @IsString()
  @IsOptional()
  tracking?: string;

  @IsString()
  @IsOptional()
  metodo?: string;

  @IsOptional()
  costo?: number;
}
