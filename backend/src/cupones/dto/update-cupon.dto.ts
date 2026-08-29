import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class UpdateCuponDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  codigo?: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  descuento?: number;

  @IsOptional()
  activo?: boolean;
}
