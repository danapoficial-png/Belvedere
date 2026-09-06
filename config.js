/* Configuración de esta copia local. No requiere instalación ni servidor. */
window.BELVEDERE_CONFIG = {
  // true: comprueba el formulario y muestra una demostración, sin enviar datos.
  // false: usa el servicio de reservas de la web original (requiere Internet).
  previewMode: false,
  reservationEndpoint: 'https://transcendent-treacle-3a6653.netlify.app/api/reservation',
  email: 'ristorante-belvedere@bluewin.ch',
  phone: '+41617314287',
  // La web original usa este número, distinto del teléfono de contacto.
  whatsapp: '41617314287',
  defaultLanguage: 'de',
  noticeVisible: true,
  specialMenu: {
    visible: false,
    title: 'Spezialmenü',
    description: '',
    // Ejemplo: { name: 'Nombre', description: 'Descripción', price: '25.00' }
    dishes: []
  }
};
