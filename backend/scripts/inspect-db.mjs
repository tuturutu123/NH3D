import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const q = async (sql) => (await pool.query(sql)).rows;

const main = async () => {
  const counts = await q(`
    SELECT
      (SELECT COUNT(*) FROM "Categoria") AS categorias,
      (SELECT COUNT(*) FROM "Producto") AS productos,
      (SELECT COUNT(*) FROM "PedidoItem") AS pedido_items,
      (SELECT COUNT(*) FROM "Valoracion") AS valoraciones,
      (SELECT COUNT(*) FROM "Pedido") AS pedidos
  `);
  console.log('COUNTS:', JSON.stringify(counts[0]));

  const cats = await q(`SELECT id, nombre FROM "Categoria" ORDER BY id`);
  console.log('CATEGORIAS:', JSON.stringify(cats));

  const prods = await q(`SELECT id, nombre, categoria_id FROM "Producto" ORDER BY id LIMIT 15`)
    .catch(async () => q(`SELECT id, nombre, "categoriaId" FROM "Producto" ORDER BY id LIMIT 15`));
  console.log('PRODUCTOS:', JSON.stringify(prods));
};

main()
  .then(() => pool.end())
  .catch((e) => { console.error('ERROR:', e.message); pool.end(); process.exit(1); });
