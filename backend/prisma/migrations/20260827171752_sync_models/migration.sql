/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Producto` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Categoria_nombre_key";

-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "stock" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Marca" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Marca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "creadoAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PedidoItem" (
    "id" SERIAL NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioUnit" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PedidoItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Envio" (
    "id" SERIAL NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    "metodo" TEXT NOT NULL,
    "costo" DOUBLE PRECISION NOT NULL,
    "tracking" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',

    CONSTRAINT "Envio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Valoracion" (
    "id" SERIAL NOT NULL,
    "productoId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comentario" TEXT,
    "creadoAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Valoracion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cupon" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "descuento" DOUBLE PRECISION NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Cupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MarcaToProducto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MarcaToProducto_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Marca_nombre_key" ON "Marca"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Envio_pedidoId_key" ON "Envio"("pedidoId");

-- CreateIndex
CREATE UNIQUE INDEX "Cupon_codigo_key" ON "Cupon"("codigo");

-- CreateIndex
CREATE INDEX "_MarcaToProducto_B_index" ON "_MarcaToProducto"("B");

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoItem" ADD CONSTRAINT "PedidoItem_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoItem" ADD CONSTRAINT "PedidoItem_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Envio" ADD CONSTRAINT "Envio_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Valoracion" ADD CONSTRAINT "Valoracion_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Valoracion" ADD CONSTRAINT "Valoracion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MarcaToProducto" ADD CONSTRAINT "_MarcaToProducto_A_fkey" FOREIGN KEY ("A") REFERENCES "Marca"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MarcaToProducto" ADD CONSTRAINT "_MarcaToProducto_B_fkey" FOREIGN KEY ("B") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
