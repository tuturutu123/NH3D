/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import type { Multer } from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { PrismaService } from '../prisma/prisma.service';
import { Public } from '../auth/public.decorator';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Controller('productos')
export class ProductosController {
  constructor(private prisma: PrismaService) {}

  @Public()
  @Get()
  findAll(@Query('q') q?: string, @Query('page') page = '1') {
    const take = 24;
    const skip = (Number(page) - 1) * take;
    const where: any = {
      stock: { gt: 0 },
      estado: true,
    };
    if (q && q.trim()) {
      where.OR = [
        { nombre: { contains: q, mode: 'insensitive' } },
        { descripcion: { contains: q, mode: 'insensitive' } },
      ];
    }
    return this.prisma.producto.findMany({
      where,
      include: { categoria: true },
      orderBy: { id: 'desc' },
      take,
      skip,
    });
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prisma.producto.findUnique({
      where: { id: Number(id) },
      include: { categoria: true },
    });
  }

  private parseBoolean(value: unknown): boolean {
    return value === true || value === 'true' || value === 1 || value === '1';
  }

  private async uploadImage(fileBuffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'nh3d_catalogo' },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Upload failed'));
          resolve(result.secure_url);
        },
      );
      streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
  }

  @Post()
  @UseInterceptors(FileInterceptor('imagen', {
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      if (!file.mimetype.match(/^image\/(jpeg|png|webp|gif)$/)) {
        return cb(new BadRequestException('Solo se permiten archivos de imagen (JPEG, PNG, WebP, GIF)'), false);
      }
      cb(null, true);
    },
  }))
  async create(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    let imagenUrl: string | null = null;
    if (file) {
      imagenUrl = await this.uploadImage(file.buffer);
    }
    return this.prisma.producto.create({
      data: {
        nombre: body.nombre,
        precio: parseFloat(body.precio),
        stock: parseInt(body.stock),
        estado: this.parseBoolean(body.estado),
        destacado: this.parseBoolean(body.destacado),
        oferta: this.parseBoolean(body.oferta),
        categoriaId: parseInt(body.categoriaId),
        imagenUrl: imagenUrl,
      },
      select: {
        id: true,
        nombre: true,
        precio: true,
        stock: true,
        estado: true,
        destacado: true,
        oferta: true,
        imagenUrl: true,
        categoriaId: true,
        categoria: { select: { id: true, nombre: true } },
      },
    });
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen', {
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      if (!file.mimetype.match(/^image\/(jpeg|png|webp|gif)$/)) {
        return cb(new BadRequestException('Solo se permiten archivos de imagen (JPEG, PNG, WebP, GIF)'), false);
      }
      cb(null, true);
    },
  }))
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const dataToUpdate: any = {
      nombre: body.nombre,
      precio: parseFloat(body.precio),
      stock: parseInt(body.stock),
      estado: this.parseBoolean(body.estado),
      destacado: this.parseBoolean(body.destacado),
      oferta: this.parseBoolean(body.oferta),
      categoriaId: parseInt(body.categoriaId),
    };
    if (file) {
      dataToUpdate.imagenUrl = await this.uploadImage(file.buffer);
    }
    return this.prisma.producto.update({
      where: { id: parseInt(id) },
      data: dataToUpdate,
      select: {
        id: true,
        nombre: true,
        precio: true,
        stock: true,
        estado: true,
        destacado: true,
        oferta: true,
        imagenUrl: true,
        categoriaId: true,
        categoria: { select: { id: true, nombre: true } },
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prisma.producto.delete({
      where: { id: Number(id) },
      select: { id: true, nombre: true },
    });
  }
}
