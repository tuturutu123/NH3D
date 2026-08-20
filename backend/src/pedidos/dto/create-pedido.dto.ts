import { IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PedidoItemDto {
  @IsNumber()
  productoId!: number;

  @IsNumber()
  @Min(1)
  cantidad!: number;

  @IsNumber()
  @Min(0)
  precioUnit!: number;
}

export class CreatePedidoDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PedidoItemDto)
  items!: PedidoItemDto[];

  @IsNumber()
  @Min(0)
  total!: number;
}
