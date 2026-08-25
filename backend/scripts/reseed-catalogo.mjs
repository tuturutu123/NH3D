import 'dotenv/config';
import { Pool } from 'pg';

// Reemplaza TODO el catálogo Natura por el catálogo NH3D.
// ADVERTENCIA: borra también pedidos, items, valoraciones y marcas que referencian productos viejos.
// Uso: node scripts/reseed-catalogo.mjs

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const CATEGORIAS = [
  { nombre: 'Llaveros' },
  { nombre: 'Mates y Bombillas' },
  { nombre: 'Porta Sahumerios' },
  { nombre: 'Dijes y Accesorios' },
  { nombre: 'Soportes y Organizadores' },
  { nombre: 'Juguetes y Juegos' },
  { nombre: 'Personajes y Figuras' },
  { nombre: 'Utilidades del Hogar' },
];

const PRODUCTOS = [
  { nombre: 'Llavero Personalizado con Nombre', precio: 2500, stock: 50, estado: true, destacado: true, oferta: false, imagenUrl: '/categorias/llaveros.png', categoriaId: 1 },
  { nombre: 'Llavero Búho Articulado', precio: 3000, stock: 35, estado: true, destacado: false, oferta: true, imagenUrl: '/categorias/llaveros.png', categoriaId: 1 },
  { nombre: 'Mate Imperial con Virola Personalizada', precio: 12000, stock: 20, estado: true, destacado: true, oferta: false, imagenUrl: '/categorias/mate-arg.jpg', categoriaId: 2 },
  { nombre: 'Porta Sahumerio Luna y Estrellas', precio: 3500, stock: 30, estado: true, destacado: true, oferta: false, imagenUrl: '/categorias/sahumerios.png', categoriaId: 3 },
  { nombre: 'Dije Dragón Articulado', precio: 2800, stock: 25, estado: true, destacado: false, oferta: true, imagenUrl: '/categorias/dijes.png', categoriaId: 4 },
  { nombre: 'Rompecabezas 3D T-Rex', precio: 8500, stock: 15, estado: true, destacado: false, oferta: false, imagenUrl: '/categorias/juguetes.png', categoriaId: 6 },
  { nombre: 'Figura Articulada Panda Flexi', precio: 4500, stock: 22, estado: true, destacado: true, oferta: false, imagenUrl: '/categorias/personajes.png', categoriaId: 7 },
  { nombre: 'Organizador de Escritorio Modular', precio: 9500, stock: 18, estado: true, destacado: false, oferta: false, imagenUrl: '/categorias/utilidades.png', categoriaId: 8 },
  { nombre: 'Combo Regalo 3D: Llavero + Dije + Porta Sahumerio', precio: 7500, stock: 10, estado: true, destacado: true, oferta: true, imagenUrl: '/portada.jpg', categoriaId: 1 },
  { nombre: 'Mate Temático Iron Man', precio: 5500, stock: 12, estado: true, destacado: true, oferta: false, imagenUrl: '/categorias/mate-iroman.jpg', categoriaId: 2 },
  { nombre: 'Mate Temático Batman', precio: 5500, stock: 14, estado: true, destacado: false, oferta: false, imagenUrl: '/categorias/mate-batman.jpg', categoriaId: 2 },
  { nombre: 'Mate Calavera 3D', precio: 5000, stock: 16, estado: true, destacado: true, oferta: false, imagenUrl: '/categorias/calavera-mate.jpg', categoriaId: 2 },
  { nombre: 'Mate Cactus', precio: 4800, stock: 18, estado: true, destacado: false, oferta: true, imagenUrl: '/categorias/mate-captus.jfif', categoriaId: 2 },
  { nombre: 'Soporte Notebook Modelo Benja', precio: 14000, stock: 10, estado: true, destacado: true, oferta: false, imagenUrl: '/categorias/soporte-note-benja.png', categoriaId: 5 },
  { nombre: 'Soporte Notebook Modelo Jere', precio: 13500, stock: 8, estado: true, destacado: false, oferta: false, imagenUrl: '/categorias/soporte-note-jere.jpg', categoriaId: 5 },
  { nombre: 'Soporte Notebook Modelo Mody', precio: 15000, stock: 6, estado: true, destacado: false, oferta: false, imagenUrl: '/categorias/soporte-note-mody.jpg', categoriaId: 5 },
  { nombre: 'Soporte Notebook Modelo Nacho', precio: 13000, stock: 9, estado: true, destacado: false, oferta: true, imagenUrl: '/categorias/soporte-note-nacho.jpg', categoriaId: 5 },
];

async function main() {
  const antes = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM "Categoria") AS categorias,
      (SELECT COUNT(*) FROM "Producto") AS productos,
      (SELECT COUNT(*) FROM "Pedido") AS pedidos,
      (SELECT COUNT(*) FROM "Valoracion") AS valoraciones
  `);
  console.log('Estado actual:', antes.rows[0]);

  await pool.query('BEGIN');
  try {
    await pool.query(`DELETE FROM "Valoracion"`);
    await pool.query(`DELETE FROM "PedidoItem"`);
    await pool.query(`DELETE FROM "Envio"`);
    await pool.query(`DELETE FROM "Pedido"`);
    await pool.query(`DELETE FROM "_MarcaToProducto"`).catch(() => {});
    await pool.query(`DELETE FROM "Marca"`).catch(() => {});
    await pool.query(`DELETE FROM "Producto"`);
    await pool.query(`DELETE FROM "Categoria"`);

    for (const c of CATEGORIAS) {
      await pool.query(
        `INSERT INTO "Categoria" ("nombre") VALUES ($1)`,
        [c.nombre],
      );
    }

    for (const p of PRODUCTOS) {
      await pool.query(
        `INSERT INTO "Producto" ("nombre","precio","stock","estado","destacado","oferta","imagenUrl","categoriaId")
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [p.nombre, p.precio, p.stock, p.estado, p.destacado, p.oferta, p.imagenUrl, p.categoriaId],
      );
    }

    await pool.query(`SELECT setval(pg_get_serial_sequence('"Categoria"','id'), (SELECT MAX("id") FROM "Categoria"))`);
    await pool.query(`SELECT setval(pg_get_serial_sequence('"Producto"','id'), (SELECT MAX("id") FROM "Producto"))`);

    await pool.query('COMMIT');
  } catch (e) {
    await pool.query('ROLLBACK');
    throw e;
  }

  const despues = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM "Categoria") AS categorias,
      (SELECT COUNT(*) FROM "Producto") AS productos
  `);
  console.log('Catálogo NH3D cargado:', despues.rows[0]);
}

main()
  .then(() => pool.end())
  .catch((e) => { console.error('ERROR:', e.message); pool.end(); process.exit(1); });
