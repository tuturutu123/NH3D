export default function ContactoPage() {
  return (
    <div className="min-h-screen py-12 bg-[#faf9f6]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white rounded-2xl overflow-hidden shadow-md">
          <img src="/portada.png" alt="Contacto" className="w-full h-64 object-cover" />
          <div className="p-8">
            <h1 className="text-3xl font-extrabold text-[#2a3c2e] mb-4">Contacto</h1>
            <p className="text-gray-600 mb-2">Teléfono: <a href="tel:+542661234567" className="text-[#324b3b]">266 123-4567</a></p>
            <p className="text-gray-600 mb-2">Email: <a href="mailto:hola@naturatienda.com.ar" className="text-[#324b3b]">hola@naturatienda.com.ar</a></p>
            <p className="text-gray-600 mb-4">Horario de atención: Lunes a Sábado de 9 a 20hs.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form className="space-y-3">
                <input className="w-full border rounded px-3 py-2" placeholder="Nombre" />
                <input className="w-full border rounded px-3 py-2" placeholder="Email" />
                <textarea className="w-full border rounded px-3 py-2" rows={4} placeholder="Mensaje" />
                <button type="submit" className="bg-[#324b3b] text-white px-4 py-2 rounded">Enviar mensaje</button>
              </form>

              <div className="text-gray-600">
                <h3 className="font-semibold text-[#2a3c2e] mb-2">Visítanos</h3>
                <p>Calle Falsa 123, Ciudad</p>
                <iframe title="mapa" className="w-full h-48 mt-3 border rounded" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.123388346215!2d-58.3815926!3d-34.6037235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccbffd3bd8b45%3A0x4f0b8c6d6b3e1f3e!2sCABA!5e0!3m2!1ses!2sar!4v1620000000000!5m2!1ses!2sar"></iframe>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
