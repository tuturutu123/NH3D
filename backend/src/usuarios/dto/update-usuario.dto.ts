import { IsEmail, IsOptional, IsIn } from 'class-validator';

export class UpdateUsuarioDto {
  @IsEmail({}, { message: 'El formato del correo no es válido' })
  @IsOptional()
  email?: string;

  @IsIn(['ADMIN', 'USUARIO'], { message: 'El rol debe ser ADMIN o USUARIO' })
  @IsOptional()
  rol?: string;
}
