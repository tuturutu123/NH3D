/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { api } from '../../lib/api';

export interface Categoria {
  id: number;
  nombre: string;
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  estado: boolean;
  destacado: boolean;
  oferta: boolean;
  imagenUrl: string | null;
  categoriaId: number;
  categoria?: Categoria;
}

interface ProductoModalProps {
  isOpen: boolean;
  onClose: () => void;
  producto?: Producto | null; 
  onSuccess: () => void;
}

export default function ProductoModal({ isOpen, onClose, producto, onSuccess }: ProductoModalProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoriaId: '',
    estado: true,
    destacado: false,
    oferta: false,
  });
  
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);

  const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3001';

  useEffect(() => {
    if (isOpen) {
      cargarCategorias();
      if (producto) {
        setFormData({
          nombre: producto.nombre,
          precio: producto.precio.toString(),
          stock: producto.stock.toString(),
          categoriaId: producto.categoriaId.toString(),
          estado: producto.estado,
          destacado: producto.destacado,
          oferta: producto.oferta,
        });
        
        setImagenPreview(
          producto.imagenUrl 
            ? (producto.imagenUrl.startsWith('http') ? producto.imagenUrl : `${backendUrl}${producto.imagenUrl}`) 
            : null
        );
      } else {
        resetForm();
      }
    }
  }, [isOpen, producto, backendUrl]);

  const cargarCategorias = async () => {
    try {
      const res = await api.get('/categorias');
      setCategorias(res.data);
    } catch (err) {
      console.error('Error al cargar categorías');
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      precio: '',
      stock: '',
      categoriaId: '',
      estado: true,
      destacado: false,
      oferta: false,
    });
    setImagenFile(null);
    setImagenPreview(null);
    setError('');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagenFile(file);
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('nombre', formData.nombre);
      data.append('precio', formData.precio);
      data.append('stock', formData.stock);
      data.append('categoriaId', formData.categoriaId);
      data.append('estado', formData.estado.toString());
      data.append('destacado', formData.destacado.toString());
      data.append('oferta', formData.oferta.toString());
      
      if (imagenFile) {
        data.append('imagen', imagenFile);
      }

      let response;
      
      if (producto) {
        response = await api.patch(`/productos/${producto.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        response = await api.post('/productos', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      
      if (response) {
         onSuccess();
         onClose();
      }

    } catch (err: unknown) {
      if (err instanceof Error) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const axiosError = err as any;
          setError(axiosError.response?.data?.message || 'Error al guardar el producto');
      } else {
          setError('Error al guardar el producto');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const inputClass = "w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-xl w-full max-w-2xl my-8">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-[#0a0a0a] rounded-t-xl z-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {producto ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-3 rounded-md text-sm font-medium">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Imagen del producto</label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 flex flex-col items-center justify-center h-48 bg-gray-50 dark:bg-gray-800 relative overflow-hidden group">
                {imagenPreview ? (
                  <>
                    <img src={imagenPreview} alt="Preview" className="w-full h-full object-contain" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm font-medium flex items-center gap-2">
                        <Upload className="h-4 w-4" /> Cambiar
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
                    <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-gray-100">Subir foto</span>
                    <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">PNG, JPG, WEBP hasta 5MB</span>
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className={inputClass}
                  placeholder="Ej: Coca Cola 2.25L"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Precio ($)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.precio}
                    onChange={(e) => setFormData({...formData, precio: e.target.value})}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoría</label>
                <select
                  required
                  value={formData.categoriaId}
                  onChange={(e) => setFormData({...formData, categoriaId: e.target.value})}
                  className={inputClass}
                >
                  <option value="" disabled>Seleccione una categoría</option>
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id.toString()}>{cat.nombre}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">Opciones de visibilidad</h3>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.estado}
                  onChange={(e) => setFormData({...formData, estado: e.target.checked})}
                  className="rounded text-green-600 focus:ring-green-500 h-4 w-4" 
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Producto Activo</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.destacado}
                  onChange={(e) => setFormData({...formData, destacado: e.target.checked})}
                  className="rounded text-green-600 focus:ring-green-500 h-4 w-4" 
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Destacado (Más vendido)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.oferta}
                  onChange={(e) => setFormData({...formData, oferta: e.target.checked})}
                  className="rounded text-green-600 focus:ring-green-500 h-4 w-4" 
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">En Oferta</span>
              </label>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3 sticky bottom-0 bg-white dark:bg-[#0a0a0a] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              {loading ? 'Guardando...' : (producto ? 'Actualizar Producto' : 'Crear Producto')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
