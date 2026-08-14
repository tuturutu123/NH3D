export type CatalogProduct = {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  estado: boolean;
  destacado: boolean;
  oferta: boolean;
  imagenUrl: string | null;
  categoriaId: number;
  descripcion?: string;
  categoria?: { id: number; nombre: string };
};

export const catalogCategories = [
  { id: 1, nombre: 'Mates y Accesorios' },
  { id: 2, nombre: 'Yerbas' },
  { id: 3, nombre: 'Snacks y Golosinas' },
  { id: 4, nombre: 'Bebidas' },
  { id: 5, nombre: 'Comidas' },
  { id: 6, nombre: 'Termos y Botellas' },
  { id: 7, nombre: 'Semillas y Frutos Secos' },
  { id: 8, nombre: 'Condimentos y Especias' },
  { id: 9, nombre: 'Bombillas y Repuestos' },
  { id: 10, nombre: 'Vasos y Tazas' },
];

export const catalogProducts: CatalogProduct[] = [
  {
    id: 1,
    nombre: 'Mate Imperial de Calabaza',
    precio: 8500,
    stock: 25,
    estado: true,
    destacado: true,
    oferta: false,
    imagenUrl: '/categorias/mates.png',
    categoriaId: 1,
    descripcion: 'Mate de calabaza con virola de acero y detalles artesanales.',
    categoria: { id: 1, nombre: 'Mates y Accesorios' },
  },
  {
    id: 2,
    nombre: 'Yerba Mate CBSe Clásica 1kg',
    precio: 4800,
    stock: 48,
    estado: true,
    destacado: true,
    oferta: false,
    imagenUrl: '/categorias/yerba.png',
    categoriaId: 2,
    descripcion: 'Yerba tradicional, suave y aromática para el mate diario.',
    categoria: { id: 2, nombre: 'Yerbas' },
  },
  {
    id: 3,
    nombre: 'Termo Lumigaro 1 Litro',
    precio: 18900,
    stock: 15,
    estado: true,
    destacado: false,
    oferta: false,
    imagenUrl: '/portada.png',
    categoriaId: 6,
    descripcion: 'Termo de acero inoxidable con capacidad ideal para viajes.',
    categoria: { id: 6, nombre: 'Termos y Botellas' },
  },
  {
    id: 4,
    nombre: 'Semillas de Chía 250g',
    precio: 2900,
    stock: 32,
    estado: true,
    destacado: false,
    oferta: true,
    imagenUrl: '/portada.png',
    categoriaId: 7,
    descripcion: 'Semillas naturales ricas en fibra, ideales para tus recetas.',
    categoria: { id: 7, nombre: 'Semillas y Frutos Secos' },
  },
  {
    id: 5,
    nombre: 'Papas Lay’s Clásicas 120g',
    precio: 2200,
    stock: 0,
    estado: true,
    destacado: false,
    oferta: true,
    imagenUrl: '/categorias/snacks.png',
    categoriaId: 3,
    descripcion: 'Snack clásico para acompañar cualquier momento.',
    categoria: { id: 3, nombre: 'Snacks y Golosinas' },
  },
  {
    id: 6,
    nombre: 'Condimento Chimichurri',
    precio: 1800,
    stock: 28,
    estado: true,
    destacado: true,
    oferta: false,
    imagenUrl: '/portada.png',
    categoriaId: 8,
    descripcion: 'Condimento tradicional para carnes y parrillas.',
    categoria: { id: 8, nombre: 'Condimentos y Especias' },
  },
  {
    id: 7,
    nombre: 'Bombilla Acero Inoxidable',
    precio: 2700,
    stock: 20,
    estado: true,
    destacado: false,
    oferta: true,
    imagenUrl: '/portada.png',
    categoriaId: 9,
    descripcion: 'Bombilla resistente y práctica para uso diario.',
    categoria: { id: 9, nombre: 'Bombillas y Repuestos' },
  },
  {
    id: 8,
    nombre: 'Vaso Térmico 473ml',
    precio: 12900,
    stock: 18,
    estado: true,
    destacado: true,
    oferta: false,
    imagenUrl: '/portada.png',
    categoriaId: 10,
    descripcion: 'Vaso térmico para bebida caliente o fría con aislamiento.',
    categoria: { id: 10, nombre: 'Vasos y Tazas' },
  },
  {
    id: 9,
    nombre: 'Yerba Mate CBSe Clásica 500g',
    precio: 2600,
    stock: 14,
    estado: true,
    destacado: false,
    oferta: false,
    imagenUrl: '/categorias/yerba.png',
    categoriaId: 2,
    descripcion: 'Presentación práctica para mate de todos los días.',
    categoria: { id: 2, nombre: 'Yerbas' },
  },
  {
    id: 10,
    nombre: 'Mates y accesorios combo',
    precio: 16500,
    stock: 9,
    estado: true,
    destacado: true,
    oferta: true,
    imagenUrl: '/categorias/mates.png',
    categoriaId: 1,
    descripcion: 'Combo ideal para iniciar o renovar tu rutina de mate.',
    categoria: { id: 1, nombre: 'Mates y Accesorios' },
  },
];

export function getCatalogProductById(id: number) {
  return catalogProducts.find((product) => product.id === id) ?? null;
}
