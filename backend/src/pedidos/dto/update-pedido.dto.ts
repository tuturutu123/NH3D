import { IsString, IsOptional, IsIn } from 'class-validator';

export class UpdatePedidoDto {
  @IsString()
  @IsOptional()
  @IsIn(['PENDIENTE', 'EN_PROCESO', 'ENVIADO', 'ENTREGADO', 'CANCELADO'])
  estado?: string;
}
