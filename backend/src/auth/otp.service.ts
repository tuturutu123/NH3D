import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import * as crypto from 'crypto';

interface OtpEntry {
  codeHash: string;
  expiresAt: number;
  attempts: number;
}

@Injectable()
export class OtpService {
  private otpStore = new Map<string, OtpEntry>();
  private readonly ttlMs = 10 * 60 * 1000;
  private readonly maxAttempts = 5;

  generate(email: string): string {
    const code = crypto.randomInt(100000, 1000000).toString();
    const codeHash = crypto
      .createHash('sha256')
      .update(code)
      .digest('hex');
    this.otpStore.set(email, {
      codeHash,
      expiresAt: Date.now() + this.ttlMs,
      attempts: 0,
    });
    return code;
  }

  verify(email: string, code: string): boolean {
    const entry = this.otpStore.get(email);
    if (!entry) return false;
    if (Date.now() > entry.expiresAt) {
      this.otpStore.delete(email);
      return false;
    }
    if (entry.attempts >= this.maxAttempts) {
      this.otpStore.delete(email);
      return false;
    }
    entry.attempts += 1;
    const hash = crypto.createHash('sha256').update(code).digest('hex');
    if (hash !== entry.codeHash) return false;
    this.otpStore.delete(email);
    return true;
  }

  async sendEmail(email: string, code: string): Promise<void> {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey === 'RE_PLACEHOLDER') {
      console.warn(
        `[OTP] RESEND_API_KEY no configurada, no se envió email. Código para ${email}: ${code}`,
      );
      return;
    }
    const resend = new Resend(apiKey);
    const from = process.env.RESEND_FROM || 'onboarding@resend.dev';
    await resend.emails.send({
      from,
      to: email,
      subject: 'Código de verificación - NH3D',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#fafafa">
          <h2 style="color:#0a0a0a;margin:0 0 8px">Verificación de acceso</h2>
          <p style="color:#52525b;font-size:14px">Usá este código para ingresar al panel de administración:</p>
          <div style="font-size:32px;font-weight:bold;letter-spacing:8px;color:#0891b2;padding:16px 0">${code}</div>
          <p style="color:#a1a1aa;font-size:12px">El código expira en 10 minutos.</p>
        </div>
      `,
    });
  }
}
