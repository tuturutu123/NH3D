import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateCuponDto {
  @IsString()
  @IsNotEmpty()
  codigo!: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  descuento!: number;

  @IsOptional()
  activo?: boolean;
}
