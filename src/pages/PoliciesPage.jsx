import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logopadel from '../assets/logopadel.svg';

// Component to render section title with domino letter zoom effect
const DominoTitle = ({ text, active }) => (
  <h2 className={`text-2xl font-semibold mb-4 transition-transform ${active ? 'scale-105' : 'scale-100'}`}>
    {text}
  </h2>
);

const PoliciesPage = () => {
  const location = useLocation();
  const currentId = location.hash ? location.hash.substring(1) : '';
  const [openSection, setOpenSection] = useState(currentId);
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      // Open the section corresponding to the hash
      setOpenSection(id);
    }
  }, [location.hash]);

  return (
    <div className="px-4 md:px-16 py-8 max-w-4xl mx-auto">
     <div className="flex justify-center mb-8">
       <img src={logopadel} alt="Logo Padel" className="h-16 w-auto" />
     </div>
     {/* Sections */}
     <section id="shipping" className="mb-12 scroll-mt-20">
      <div className="cursor-pointer bg-white p-4 rounded shadow flex justify-between items-center" onClick={() => setOpenSection(openSection === 'shipping' ? '' : 'shipping')}>
        <DominoTitle text="Política de Envíos" active={openSection === 'shipping'} />
        <span className={`transform transition-transform ${openSection === 'shipping' ? 'rotate-180' : ''}`}>▼</span>
      </div>
      <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${openSection === 'shipping' ? 'max-h-[500px] pt-4' : 'max-h-0'}`}>
        <p className="mb-4">Todos los pedidos se gestionan desde nuestras instalaciones en España y son enviados mediante transportistas nacionales e internacionales de reconocido prestigio. Nuestra política de envíos incluye:</p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li><strong>Envío estándar</strong> (península): entrega estimada entre 2-4 días laborables. Coste: 4,99€.</li>
          <li><strong>Envío exprés</strong> (península): entrega al día siguiente en pedidos realizados antes de las 13:00 h. Coste: 9,99€.</li>
          <li><strong>Envío a Baleares, Canarias, Ceuta y Melilla:</strong> plazo medio de 4-7 días, coste según volumetría y destino (<em>consulte en el carrito</em>).</li>
          <li><strong>Gastos de envío gratuitos</strong> para pedidos superiores a 120€ en península.</li>
        </ul>
        <h4 className="font-semibold mb-2">Seguimiento y entregas</h4>
        <p className="mb-4">Una vez expedido el pedido, recibirás un correo con el número de seguimiento y enlace para consultar el estado en tiempo real. Nuestro servicio de atención revisa incidencias de entrega (retrasos, direcciones erróneas, etc.) y te garantiza una solución rápida.</p>
        <h4 className="font-semibold mb-2">Responsabilidad y daños</h4>
        <p>En caso de recibir el paquete dañado, debes notificarlo al transportista y al servicio de atención al cliente en un plazo máximo de 24 h. Conserva el embalaje original y los productos para tramitar la reclamación.</p>
      </div>
     </section>

     <section id="legal" className="mb-12 scroll-mt-20">
      <div className="cursor-pointer bg-white p-4 rounded shadow flex justify-between items-center" onClick={() => setOpenSection(openSection === 'legal' ? '' : 'legal')}>
        <DominoTitle text="Aviso Legal" active={openSection === 'legal'} />
        <span className={`transform transition-transform ${openSection === 'legal' ? 'rotate-180' : ''}`}>▼</span>
      </div>
      <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${openSection === 'legal' ? 'max-h-[400px] pt-4' : 'max-h-0'}`}>
        <p className="mb-4">En cumplimiento con el artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa a los usuarios de:</p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li><strong>Titular:</strong> Blayne Padel Shop.</li>
          <li><strong>Domicilio social:</strong> Calle Falsa 123, 28080 Madrid, España.</li>
          <li><strong>CIF:</strong> B-12345678.</li>
          <li><strong>Correo electrónico:</strong> info@blaynepadel.com.</li>
          <li><strong>Teléfono de contacto:</strong> +34 912 345 678.</li>
        </ul>
        <p className="mb-4">Blayne Padel Shop ofrece sus servicios conforme a la legislación vigente en España y la Unión Europea. El acceso al sitio implica la aceptación de las condiciones de uso y esta información legal.</p>
        <p>Los contenidos y la marca son propiedad de Blayne Padel Shop, quedando prohibida su reproducción total o parcial sin consentimiento expreso.</p>
      </div>
     </section>

     <section id="terms" className="mb-12 scroll-mt-20">
      <div className="cursor-pointer bg-white p-4 rounded shadow flex justify-between items-center" onClick={() => setOpenSection(openSection === 'terms' ? '' : 'terms')}>
        <DominoTitle text="Términos del Servicio" active={openSection === 'terms'} />
        <span className={`transform transition-transform ${openSection === 'terms' ? 'rotate-180' : ''}`}>▼</span>
      </div>
      <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${openSection === 'terms' ? 'max-h-[450px] pt-4' : 'max-h-0'}`}>
        <p className="mb-4">Estas condiciones regulan el acceso y uso de la plataforma de comercio electrónico de Blayne Padel Shop. Al realizar un pedido, el usuario manifiesta su plena conformidad con los siguientes términos:</p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li><strong>Objeto:</strong> comercialización y venta de material de pádel.</li>
          <li><strong>Proceso de compra:</strong> se formaliza un contrato de compraventa al aceptar el pedido y recibir confirmación por correo.</li>
          <li><strong>Precios:</strong> incluidos impuestos (IVA) y sin gastos de envío salvo que se especifique.</li>
          <li><strong>Disponibilidad:</strong> los productos aparecen en stock en tiempo real, pudiendo variar por alta demanda.</li>
          <li><strong>Modificaciones:</strong> Blayne Padel Shop se reserva el derecho a actualizar precios, productos y condiciones sin previo aviso.</li>
        </ul>
        <p className="mb-4">Para cualquier incidencia o consulta, contacta con nuestro servicio de atención en info@blaynepadel.com antes de iniciar reclamaciones formales.</p>
      </div>
     </section>

     <section id="privacy" className="mb-12 scroll-mt-20">
      <div className="cursor-pointer bg-white p-4 rounded shadow flex justify-between items-center" onClick={() => setOpenSection(openSection === 'privacy' ? '' : 'privacy')}>
        <DominoTitle text="Política de Privacidad" active={openSection === 'privacy'} />
        <span className={`transform transition-transform ${openSection === 'privacy' ? 'rotate-180' : ''}`}>▼</span>
      </div>
      <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${openSection === 'privacy' ? 'max-h-[550px] pt-4' : 'max-h-0'}`}>
        <p className="mb-4">De acuerdo con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), Blayne Padel Shop trata tus datos personales como responsable del tratamiento:</p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li><strong>Finalidades:</strong> gestión de pedidos, facturación, envío de comunicaciones comerciales solo con tu consentimiento.</li>
          <li><strong>Legitimación:</strong> ejecución de contrato y consentimiento.</li>
          <li><strong>Derechos:</strong> acceso, rectificación, supresión, oposición, limitación y portabilidad. Para ejercerlos, escribe a <a href="mailto:datos@blaynepadel.com" className="underline">datos@blaynepadel.com</a>.</li>
          <li><strong>Conservación:</strong> los datos se mantienen mientras exista relación comercial y según plazos legales.</li>
          <li><strong>Cesiones:</strong> ninguna, salvo a transportistas y proveedores de pago para la correcta ejecución del servicio.</li>
        </ul>
        <p>Para más información consulta nuestro <a href="/politicas#cookies" className="underline">Aviso de Cookies</a> y nuestra <a href="/politicas#legal" className="underline">Política Legal</a>.</p>
      </div>
     </section>

     <section id="cookies" className="mb-12 scroll-mt-20">
      <div className="cursor-pointer bg-white p-4 rounded shadow flex justify-between items-center" onClick={() => setOpenSection(openSection === 'cookies' ? '' : 'cookies')}>
        <DominoTitle text="Política de Cookies" active={openSection === 'cookies'} />
        <span className={`transform transition-transform ${openSection === 'cookies' ? 'rotate-180' : ''}`}>▼</span>
      </div>
      <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${openSection === 'cookies' ? 'max-h-[500px] pt-4' : 'max-h-0'}`}>
        <p className="mb-4">Utilizamos cookies propias y de terceros para diversos fines conformes a la normativa vigente:</p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li><strong>Estratégicas:</strong> necesarias para la navegación y uso de funcionalidades.</li>
          <li><strong>Técnicas:</strong> optimizan el rendimiento y la seguridad.</li>
          <li><strong>Analíticas:</strong> recogen datos anónimos para mejorar la plataforma (Google Analytics).</li>
          <li><strong>Publicidad:</strong> gestionan la publicidad personalizada según tus preferencias.</li>
        </ul>
        <p>En el pie de página encontrarás un enlace para configurar o revocar tu consentimiento en cualquier momento. Asimismo, puedes desactivarlas desde las opciones de tu navegador, aunque ello afectará a la funcionalidad de algunos servicios.</p>
      </div>
     </section>

     <section id="returns" className="mb-12 scroll-mt-20">
      <div className="cursor-pointer bg-white p-4 rounded shadow flex justify-between items-center" onClick={() => setOpenSection(openSection === 'returns' ? '' : 'returns')}>
        <DominoTitle text="Cambios y Devoluciones" active={openSection === 'returns'} />
        <span className={`transform transition-transform ${openSection === 'returns' ? 'rotate-180' : ''}`}>▼</span>
      </div>
      <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${openSection === 'returns' ? 'max-h-[500px] pt-4' : 'max-h-0'}`}>
        <p className="mb-4">Según el Real Decreto Legislativo 1/2007, tienes derecho a desistir del contrato sin penalización ni necesidad de justificación en un plazo de 14 días naturales desde la entrega:</p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li><strong>Procedimiento:</strong> notifica tu decisión por <a href="mailto:devoluciones@blaynepadel.com" className="underline">devoluciones@blaynepadel.com</a> o formulario web.</li>
          <li><strong>Plazo de devolución:</strong> dispones de otros 14 días para enviar el producto.</li>
          <li><strong>Estado:</strong> sin usar, con etiquetas y embalaje original.</li>
          <li><strong>Gastos:</strong> de devolución a tu cargo, salvo error o defecto.</li>
        </ul>
        <p>El reembolso se efectuará en el mismo medio de pago en un plazo máximo de 14 días desde la recepción y verificación del producto.</p>
      </div>
     </section>

     <section id="transport" className="mb-12 scroll-mt-20">
      <div className="cursor-pointer bg-white p-4 rounded shadow flex justify-between items-center" onClick={() => setOpenSection(openSection === 'transport' ? '' : 'transport')}>
        <DominoTitle text="Transporte y Pagos" active={openSection === 'transport'} />
        <span className={`transform transition-transform ${openSection === 'transport' ? 'rotate-180' : ''}`}>▼</span>
      </div>
      <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${openSection === 'transport' ? 'max-h-[400px] pt-4' : 'max-h-0'}`}>
        <p className="mb-4">Ofrecemos múltiples opciones de pago y transporte, garantizando la máxima seguridad y rapidez:</p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li><strong>Tarjeta bancaria:</strong> pagos encriptados vía TPV Virtual (RedSys) y certificación PCI DSS.</li>
          <li><strong>PayPal:</strong> cuenta protegida y pagos instantáneos con  Buyer Protection.</li>
          <li><strong>Transferencia bancaria:</strong> confirmación manual del pago antes de preparar el envío.</li>
        </ul>
        <h4 className="font-semibold mb-2">Gestión del pedido</h4>
        <p className="mb-2">Todos los pagos se realizan en Euros (EUR) e incluyen IVA aplicado según la regulación española. El cargo se efectuará al confirmar el pedido y antes de su expedición.</p>
        <h4 className="font-semibold mb-2">Seguridad y privacidad</h4>
        <p>Los datos bancarios se transmiten de forma segura mediante cifrado SSL. Blayne Padel Shop no almacena datos de tarjeta.</p>
      </div>
     </section>
   </div>
  );
 };

 export default PoliciesPage;
