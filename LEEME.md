# Belvedere — remodelación local

Una nueva identidad para Ristorante Belvedere: vino oscuro, luz dorada, tipografía editorial y las fotografías del restaurante.

## Abrir y probar

1. Descomprime **Belvedere-Remodelado.zip** por completo.
2. Abre la carpeta **Belvedere** en tu programa o editor.
3. Abre **index.html** en el navegador o en la vista previa de tu programa.

No necesitas instalar paquetes ni ejecutar comandos. También funciona con Live Server o cualquier servidor estático. Mantén los archivos y la carpeta `assets` juntos. No abras `index.html` directamente desde dentro del ZIP.

La web empieza en alemán. El selector **DE / IT / FR / EN / ES** cambia el idioma, incluidos la carta, los textos del formulario y sus respuestas. Las imágenes y las fuentes están incluidas para funcionar sin Internet. Las llamadas, el correo, WhatsApp, Google Maps y el envío real de reservas dependen de sus aplicaciones o servicios correspondientes.

## Qué puedes probar

- Portada con la terraza real del restaurante y animación de entrada.
- Aparición de secciones al desplazarte, cinta de texto en movimiento y detalles animados en los botones.
- Modo vino y modo claro mediante el botón de sol/luna.
- Carta completa: 50 platos y sus precios originales, organizada en cuatro categorías.
- Galería con las 20 fotos originales, desplazamiento táctil y ampliación. Flechas para navegar y Escape para cerrar.
- Navegación de móvil y manejo con teclado.
- Formulario con validación de contacto, fecha futura y horarios del restaurante.
- Pausa de animaciones en el pie de página. También se respeta la preferencia de movimiento reducido del dispositivo.
- Impresión de la carta con las cuatro categorías mediante la función de imprimir del navegador.

## Reservas en esta entrega

El archivo `config.js` incluye **previewMode: true**. El formulario valida los datos y muestra una respuesta de prueba; **no envía ninguna solicitud al restaurante**. Puedes comprobarlo usando una fecha futura dentro del horario de apertura. Los lunes están cerrados.

Para usar el envío real en una fase posterior, cambia `previewMode` a `false`. Se ha conservado el endpoint de reservas que utiliza la web original. Ese servicio externo no forma parte del ZIP; requiere Internet, debe seguir operativo y debe admitir el origen desde el que abras la página. No se ha enviado ninguna reserva real durante la preparación de este paquete. Un envío aceptado por el servicio es una solicitud, pendiente de confirmación del restaurante.

## Editar

| Archivo | Contenido |
| --- | --- |
| `index.html` | Estructura de la página y carta original de respaldo sin JavaScript. |
| `styles.css` | Colores, composición, tamaños, comportamiento adaptable y animaciones. Los colores principales están al principio. |
| `app.js` | Navegación, carta, galería, temas, idiomas y reservas. |
| `content.js` | Nombres, descripciones en alemán, categorías y precios. Con JavaScript, este archivo genera la carta visible. |
| `translations.js` | Textos y descripciones de los platos en los cinco idiomas. |
| `config.js` | Modo de prueba, datos de contacto, aviso de pagos y menú especial opcional. |
| `assets` | Fotos optimizadas, logo original y tipografías locales. |

Si cambias el orden, añades platos o modificas descripciones en `content.js`, actualiza las listas de descripciones de `translations.js` en el mismo orden. Si también quieres actualizar la versión sin JavaScript, modifica los platos de respaldo en `index.html`.

Para activar un menú especial, rellena `specialMenu.dishes` en `config.js` y cambia `specialMenu.visible` a `true`. La categoría aparece solo cuando contiene platos. El aviso de PostFinance se controla con `noticeVisible`.

## Contenido conservado

Contenido consultado el 6 de septiembre de 2026 en:
https://danapoficial-png.github.io/Belvedere/

Se han conservado los 50 platos, precios, horarios, dirección, correo, los destinos de contacto, las 20 fotos de la galería y el aviso visible de PostFinance. La web original utiliza **+41 61 721 45 45** como teléfono y **+41 61 731 42 87** para WhatsApp; ambos destinos se han mantenido. El menú especial original estaba oculto y continúa desactivado.

Esta entrega es una copia independiente para probar y editar. No modifica la página original ni publica nada. No incluye un panel de administración ni el código del servicio externo de reservas.

Fotos y logo: recursos de la página original facilitada. Las imágenes se han convertido a WebP para reducir el tamaño del paquete.

Tipografías: Bodoni Moda y DM Sans, distribuidas bajo SIL Open Font License. Las licencias están en `assets/fonts`.

Verificación del paquete: sintaxis JavaScript, existencia de los recursos locales, integridad de las imágenes, enlaces internos, traducciones y coincidencia de platos y precios con la fuente. No se ha realizado una prueba visual en navegador durante esta preparación.
