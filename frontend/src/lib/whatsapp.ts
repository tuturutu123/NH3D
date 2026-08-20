interface WhatsAppItem {
  nombre: string;
  precio: number;
  cantidad: number;
}

const PHONE = '5493535635221';

export function buildWhatsAppUrl(items: WhatsAppItem[]): string {
  if (items.length === 0) return `https://wa.me/${PHONE}`;

  let msg = "Hola! 🌿 Vengo de *Natura Tienda de Productos* y quiero realizar el siguiente pedido:\n\n";
  items.forEach((item, i) => {
    msg += `${i + 1}. *${item.nombre}* x${item.cantidad} - $${(item.precio * item.cantidad).toLocaleString('es-AR')}\n`;
  });
  const total = items.reduce((acc, it) => acc + it.precio * it.cantidad, 0);
  msg += `\n*TOTAL A PAGAR: $${total.toLocaleString('es-AR')}*`;
  msg += `\n\nQuedo a la espera de la coordinación del pago y envío en Villa Mercedes. ¡Gracias!`;

  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
}
