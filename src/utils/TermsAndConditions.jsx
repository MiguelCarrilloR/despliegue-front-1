import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-lime-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
        {/* Header with Back Button */}
        <div className="flex items-center mb-8">
          <Link 
            to="/register" 
            className="flex items-center text-lime-600 hover:text-lime-700 transition-duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Volver al registro
          </Link>
        </div>

        {/* Logo and Title */}
        <div className="text-center mb-8">
          <img
            src="https://i.imgur.com/anUuFBV.png"
            alt="Logo Promesas"
            className="mx-auto h-32 w-auto rounded-lg shadow-md mb-6"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Términos y Condiciones de Uso y Tratamiento de Datos
          </h1>
          <p className="text-gray-600">
            Fecha de entrada en vigor: 27 de enero de 2025
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introducción</h2>
            <p className="leading-relaxed">
              Bienvenido/a a la plataforma web "Promesas a la cancha" una herramienta diseñada para conectar a jugadoras de futbol con reclutadores profesionales a través de un entorno seguro y eficiente. Al registrarte y utilizar la Plataforma, aceptas los presentes Términos y Condiciones. Por favor, léelos detenidamente antes de proceder.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Requisitos de Registro</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">2.1. Para Jugadoras:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Debes ser mayor de edad según la legislación de tu país.</li>
                  <li>No debes tener antecedentes penales.</li>
                  <li>La información proporcionada en el registro debe ser veraz, precisa y actualizada.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">2.2. Para Reclutadores:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Debes proporcionar una licencia o documento de certificación que avale tu condición como reclutador profesional.</li>
                  <li>La información proporcionada en el registro debe ser veraz, precisa y actualizada.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Tratamiento de Datos Personales</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">3.1. Responsable del Tratamiento:</h3>
                <p>Promesas a la cancha, será el responsable del tratamiento de los datos personales que proporciones al registrarte en la Plataforma.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">3.2. Finalidad del Tratamiento:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Facilitar el contacto entre jugadoras y reclutadores.</li>
                  <li>Verificar la autenticidad de la información proporcionada.</li>
                  <li>Proveer acceso al chat privado y otras funcionalidades de la Plataforma.</li>
                  <li>Cumplir con requisitos legales y regulatorios aplicables.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">3.3. Datos Recolectados:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Para jugadoras: Nombre completo, edad, años de experiencia deportiva y otros datos relevantes para su perfil profesional.</li>
                  <li>Para reclutadores: Nombre completo, información de contacto, certificación profesional, y otros datos requeridos para la verificación.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Derechos de los Usuarios (Habeas Data)</h2>
            <p className="mb-4">Como usuario de la Plataforma, tienes derecho a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Acceder a tus datos personales almacenados.</li>
              <li>Rectificar información inexacta o desactualizada.</li>
              <li>Solicitar la eliminación de tus datos cuando ya no sean necesarios para los fines descritos.</li>
              <li>Oponerte al tratamiento de tus datos para fines específicos.</li>
            </ul>
            <p className="mt-4">
              Para ejercer estos derechos, puedes contactar al equipo de soporte en{' '}
              <a href="mailto:promesasalacancha@gmail.com" className="text-lime-600 hover:text-lime-700">
                promesasalacancha@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Uso de la Plataforma</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">5.1. Prohibiciones:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Usar la Plataforma para propósitos fraudulentos, ilegales o no relacionados con el objetivo de conectar jugadoras y reclutadores.</li>
                  <li>Compartir información falsa o engañosa.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">5.2. Chat Privado:</h3>
                <p>El chat privado entre jugadoras y reclutadores debe ser utilizado únicamente para fines profesionales. La Plataforma no tolera el uso indebido de esta herramienta y se reserva el derecho de tomar medidas en caso de abuso.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Seguridad de la Información</h2>
            <p className="leading-relaxed">
              Implementamos medidas técnicas y organizativas adecuadas para proteger tus datos personales contra el acceso no autorizado, pérdida o alteración. Sin embargo, reconoces que ninguna plataforma en línea es completamente segura y aceptas asumir ciertos riesgos inherentes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Modificaciones a los Términos</h2>
            <p className="leading-relaxed">
              Nos reservamos el derecho de actualizar estos Términos en cualquier momento. Te notificaremos sobre cambios significativos mediante la Plataforma o a través del correo electrónico proporcionado durante el registro.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contacto</h2>
            <p className="leading-relaxed">
              Si tienes preguntas o inquietudes sobre estos Términos, por favor contáctanos a través del correo{' '}
              <a href="mailto:promesasalacancha@gmail.com" className="text-lime-600 hover:text-lime-700">
                promesasalacancha@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Aceptación</h2>
            <p className="leading-relaxed">
              Al registrarte en la Plataforma, confirmas que has leído, comprendido y aceptado estos Términos y Condiciones en su totalidad.
            </p>
            <p className="mt-4 font-medium">
              Promesas a la cancha agradece tu confianza y se compromete a ofrecerte una experiencia profesional y segura.
            </p>
          </section>
        </div>

        {/* Footer with Back Button */}
        <div className="mt-12 flex justify-center">
          <Link 
            to="/register" 
            className="flex items-center px-6 py-3 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Volver al registro
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;