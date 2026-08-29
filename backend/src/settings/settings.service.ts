import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const DEFAULT_SETTINGS: Record<string, string> = {
  storeName: 'NH3D · NHproducciones',
  whatsapp: '+54 9 3535 635221',
  email: 'contacto@nhproducciones.com.ar',
  destacadosVisible: 'true',
  ofertasActivas: 'true',
  newsletterHabilitado: 'true',
};

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const rows = await this.prisma.setting.findMany();
    const settings: Record<string, string> = { ...DEFAULT_SETTINGS };
    for (const row of rows) {
      settings[row.key] = row.value;
    }
    return settings;
  }

  async update(data: Record<string, string>) {
    for (const key of Object.keys(data)) {
      await this.prisma.setting.upsert({
        where: { key },
        update: { value: String(data[key]) },
        create: { key, value: String(data[key]) },
      });
    }
    return this.findAll();
  }
}
