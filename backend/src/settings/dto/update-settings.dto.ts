import { Allow } from 'class-validator';

export class UpdateSettingsDto {
  @Allow()
  data!: Record<string, string>;
}
