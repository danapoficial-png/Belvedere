/* Traducciones locales. Orden de columnas: clave | DE | IT | FR | EN | ES. */
(() => {
  'use strict';
  const languages = ['de','it','fr','en','es'];
  const dictionary = Object.fromEntries(languages.map(language => [language, {}]));
  const rows = `
skip|Zum Inhalt|Vai al contenuto|Aller au contenu|Skip to content|Ir al contenido
navigation|Hauptnavigation|Navigazione principale|Navigation principale|Main navigation|Navegación principal
navAbout|La casa|La casa|La maison|La casa|La casa
navMenu|Speisekarte|Il menù|La carte|The menu|La carta
navGallery|Momente|Momenti|Instants|Moments|Momentos
navContact|Kontakt|Contatti|Contact|Contact|Contacto
language|Sprache|Lingua|Langue|Language|Idioma
theme|Helle oder dunkle Darstellung wählen|Passa al tema chiaro o scuro|Passer au thème clair ou sombre|Switch between light and dark|Cambiar entre modo claro y oscuro
reserveShort|Reservieren|Prenota|Réserver|Book a table|Reservar
openNav|Navigation öffnen oder schliessen|Apri o chiudi la navigazione|Ouvrir ou fermer la navigation|Open or close navigation|Abrir o cerrar navegación
heroAlt|Die Terrasse des Belvedere im warmen Licht am Abend|La terrazza del Belvedere illuminata di sera|La terrasse du Belvedere éclairée le soir|The Belvedere terrace in the evening light|La terraza del Belvedere iluminada al anochecer
heroEyebrow|EIN STÜCK ITALIEN IN HOFSTETTEN-FLÜH|UN ANGOLO D’ITALIA A HOFSTETTEN-FLÜH|UN PEU D’ITALIE À HOFSTETTEN-FLÜH|A LITTLE ITALY IN HOFSTETTEN-FLÜH|UN RINCÓN DE ITALIA EN HOFSTETTEN-FLÜH
heroText|Gutes Essen. Ein Glas Wein.<br>Und Zeit füreinander.|Buon cibo. Un calice di vino.<br>E il tempo di stare insieme.|Un bon repas. Un verre de vin.<br>Et du temps ensemble.|Good food. A glass of wine.<br>And time for each other.|Buena comida. Una copa de vino.<br>Y tiempo para compartir.
discoverMenu|Speisekarte entdecken|Scopri il menù|Découvrir la carte|Explore the menu|Descubrir la carta
reserveTable|Tisch reservieren|Prenota un tavolo|Réserver une table|Book a table|Reservar mesa
scroll|Ein wenig weiter|Ancora un po’|Un peu plus loin|A little further|Un poco más abajo
aboutTitle|Italien im Herzen.<br><em>Sie am Tisch.</em>|L’Italia nel cuore.<br><em>Voi a tavola.</em>|L’Italie dans le cœur.<br><em>Vous à table.</em>|Italy in our hearts.<br><em>You at our table.</em>|Italia en el corazón.<br><em>Tú en nuestra mesa.</em>
aboutText|Bei uns gehört beides zusammen: die Freude am guten Essen und die Freude, es zu teilen. Wir kochen mit frischen, saisonalen Zutaten, pflegen klassische italienische Rezepte und nehmen uns Zeit für unsere Gäste.|Per noi, il piacere della buona cucina è ancora più bello quando si condivide. Cuciniamo con ingredienti freschi e di stagione, custodiamo le ricette della tradizione italiana e dedichiamo tempo ai nostri ospiti.|Pour nous, le plaisir de bien manger va de pair avec celui de partager. Nous cuisinons des produits frais et de saison, cultivons les recettes italiennes traditionnelles et prenons le temps de vous accueillir.|For us, the joy of good food goes hand in hand with the joy of sharing it. We cook with fresh, seasonal ingredients, cherish classic Italian recipes and take time for our guests.|Para nosotros, disfrutar de la buena comida y compartirla van de la mano. Cocinamos con ingredientes frescos y de temporada, cuidamos las recetas clásicas italianas y dedicamos tiempo a quienes nos visitan.
yourEvening|Ihr Abend bei uns|La vostra serata da noi|Votre soirée chez nous|Your evening with us|Tu velada con nosotros
tableAlt|Liebevoll gedeckter Tisch im Belvedere|Una tavola apparecchiata con cura al Belvedere|Une table dressée avec soin au Belvedere|A carefully set table at Belvedere|Una mesa preparada con mimo en Belvedere
pastaAlt|Ein Pastagericht aus der Küche des Belvedere|Un piatto di pasta della cucina del Belvedere|Un plat de pâtes de la cuisine du Belvedere|A pasta dish from the Belvedere kitchen|Un plato de pasta de la cocina del Belvedere
photoCaption|Ein Platz zum Bleiben.|Un posto dove fermarsi.|Un lieu où s’attarder.|A place to linger.|Un lugar para quedarse.
noticeLabel|GUT ZU WISSEN|DA SAPERE|BON À SAVOIR|GOOD TO KNOW|A TENER EN CUENTA
noticeText|Aufgrund technischer Probleme sind derzeit keine Zahlungen mit PostFinance-Karten möglich. Bitte nutzen Sie andere Karten oder Barzahlung.|A causa di problemi tecnici, al momento non è possibile pagare con carte PostFinance. Vi preghiamo di utilizzare altre carte o contanti.|En raison de problèmes techniques, les cartes PostFinance ne sont actuellement pas acceptées. Merci d’utiliser une autre carte ou de régler en espèces.|Due to technical issues, we currently cannot accept PostFinance cards. Please use another card or pay in cash.|Debido a problemas técnicos, actualmente no se aceptan tarjetas PostFinance. Puedes pagar con otra tarjeta o en efectivo.
menuOrigin|Klassische Rezepte. Mit Liebe gekocht.|Ricette classiche. Cucinate con amore.|Des recettes classiques. Cuisinées avec amour.|Classic recipes. Cooked with love.|Recetas clásicas. Cocinadas con cariño.
menuTitle|Einfach gut.<br><em>Typisch italiano.</em>|Semplicemente buono.<br><em>Autenticamente italiano.</em>|Tout simplement bon.<br><em>Typiquement italien.</em>|Simply good.<br><em>Truly Italian.</em>|Así de bueno.<br><em>Así de italiano.</em>
menuText|Von der ersten Bruschetta bis zum letzten Bissen. Finden Sie Ihr Lieblingsgericht.|Dalla prima bruschetta all’ultimo boccone. Trovate il vostro piatto preferito.|De la première bruschetta à la dernière bouchée. Trouvez votre plat préféré.|From the first bruschetta to the last bite. Find your favourite dish.|Desde la primera bruschetta hasta el último bocado. Encuentra tu plato favorito.
priceNote|Alle Preise in Schweizer Franken (CHF).|Tutti i prezzi sono in franchi svizzeri (CHF).|Tous les prix sont en francs suisses (CHF).|All prices in Swiss francs (CHF).|Todos los precios en francos suizos (CHF).
categories|Speisekategorien|Categorie del menù|Catégories de la carte|Menu categories|Categorías de la carta
catAntipasti|Antipasti|Antipasti|Antipasti|Antipasti|Antipasti
catPasta|Pasta & Risotto|Pasta & Risotto|Pâtes & Risotto|Pasta & Risotto|Pasta y risotto
catPizza|Pizze|Pizze|Pizzas|Pizzas|Pizzas
catMeat|Fisch & Fleisch|Pesce & Carne|Poissons & Viandes|Fish & Meat|Pescado y carne
headingAntipasti|Antipasti, Suppen & Salate|Antipasti, zuppe e insalate|Entrées, soupes et salades|Starters, soups & salads|Entrantes, sopas y ensaladas
headingPasta|Pasta fresca & Risotto|Pasta fresca & Risotto|Pâtes fraîches et risotto|Fresh pasta & risotto|Pasta fresca y risotto
headingPizza|Le nostre pizze|Le nostre pizze|Nos pizzas|Our pizzas|Nuestras pizzas
headingMeat|Pesce & Carne|Pesce & Carne|Poissons et viandes|Fish & meat|Pescado y carne
special|Spezialmenü|Menù speciale|Menu spécial|Special menu|Menú especial
takeawaySmall|Alle Gerichte auch zum Mitnehmen.|Tutti i piatti anche da asporto.|Tous les plats aussi à emporter.|Every dish is also available to take away.|Todos los platos también para llevar.
order|Bestellen|Ordina|Commander|Order|Pedir
galleryOrigin|Ein kleiner Einblick in unser Zuhause.|Uno sguardo a casa nostra.|Un aperçu de notre maison.|A glimpse into our home.|Un vistazo a nuestra casa.
galleryTitle|Hier lässt es sich<br><em>gut sein.</em>|Qui è bello<br><em>stare insieme.</em>|Ici, on prend<br><em>le temps de vivre.</em>|Make yourself<br><em>at home.</em>|Aquí apetece<br><em>quedarse.</em>
previous|Vorheriges Bild|Immagine precedente|Image précédente|Previous image|Imagen anterior
next|Nächstes Bild|Immagine successiva|Image suivante|Next image|Imagen siguiente
galleryLabel|Fotogalerie des Belvedere|Galleria fotografica del Belvedere|Galerie photo du Belvedere|Belvedere photo gallery|Galería de fotos del Belvedere
galleryHint|Ein Bild anklicken und einen Moment länger bleiben.|Cliccate su una foto e fermatevi ancora un momento.|Cliquez sur une photo et restez encore un instant.|Click a picture and stay a little longer.|Toca una foto y quédate un momento más.
eventsTitle|Ein Anlass.<br><em>Viele schöne Momente.</em>|Un’occasione.<br><em>Tanti bei momenti.</em>|Une occasion.<br><em>De beaux souvenirs.</em>|One occasion.<br><em>So many good moments.</em>|Una ocasión.<br><em>Muchos buenos momentos.</em>
eventsText|Ein Geburtstag, ein Wiedersehen oder ein Fest mit Ihren Liebsten. Erzählen Sie uns, was Sie planen.|Un compleanno, un ritrovo o una festa con le persone più care. Raccontateci cosa avete in mente.|Un anniversaire, des retrouvailles ou une fête avec vos proches. Racontez-nous votre projet.|A birthday, a reunion or a celebration with your favourite people. Tell us what you’re planning.|Un cumpleaños, un reencuentro o una celebración con los tuyos. Cuéntanos qué tienes en mente.
eventInquiry|Anlass anfragen|Organizza il tuo evento|Organiser un événement|Enquire about an event|Consultar una celebración
takeawayTitle|Ein Stück Belvedere.<br><em>Für zu Hause.</em>|Un po’ di Belvedere.<br><em>A casa vostra.</em>|Un peu de Belvedere.<br><em>À la maison.</em>|A little Belvedere.<br><em>To take home.</em>|Un poco de Belvedere.<br><em>Para casa.</em>
takeawayText|Heute lieber auf dem eigenen Sofa? Alle unsere Gerichte gibt es auch zum Mitnehmen.|Stasera preferite il vostro divano? Tutti i nostri piatti sono disponibili anche da asporto.|Envie de rester chez vous ce soir ? Tous nos plats sont aussi disponibles à emporter.|Staying in tonight? Every dish on our menu is also available to take away.|¿Hoy prefieres tu sofá? Todos nuestros platos también están disponibles para llevar.
whatsappOrder|Über WhatsApp bestellen|Ordina su WhatsApp|Commander sur WhatsApp|Order via WhatsApp|Pedir por WhatsApp
reserveOrigin|Wir freuen uns auf Sie.|Vi aspettiamo.|Au plaisir de vous accueillir.|We look forward to welcoming you.|Te esperamos.
reserveTitle|Ihr Platz.<br><em>Unser Vergnügen.</em>|Il vostro tavolo.<br><em>Il nostro piacere.</em>|Votre table.<br><em>Notre plaisir.</em>|Your table.<br><em>Our pleasure.</em>|Tu mesa.<br><em>Un placer para nosotros.</em>
reserveText|Ein Abend zu zweit oder eine grosse Runde? Fragen Sie Ihren Tisch an. Wir bestätigen Ihre Reservation persönlich.|Una serata in due o una bella tavolata? Richiedete il vostro tavolo. Confermeremo personalmente la prenotazione.|Un dîner à deux ou une grande tablée ? Demandez votre table. Nous vous confirmerons personnellement la réservation.|Dinner for two or a table for everyone? Request your table. We’ll confirm your reservation personally.|¿Una cena para dos o una mesa para todos? Solicita tu reserva. Te la confirmaremos personalmente.
phoneReserve|GERNE AUCH TELEFONISCH|ANCHE PER TELEFONO|ÉGALEMENT PAR TÉLÉPHONE|YOU CAN ALSO CALL US|TAMBIÉN POR TELÉFONO
hoursTitle|Öffnungszeiten|Orari di apertura|Horaires d’ouverture|Opening hours|Horarios de apertura
monday|Montag|Lunedì|Lundi|Monday|Lunes
closed|Geschlossen|Chiuso|Fermé|Closed|Cerrado
weekdays|Dienstag – Freitag|Martedì – Venerdì|Mardi – Vendredi|Tuesday – Friday|Martes – Viernes
saturday|Samstag|Sabato|Samedi|Saturday|Sábado
sunday|Sonntag|Domenica|Dimanche|Sunday|Domingo
previewNote|Lokale Vorschau: Sie können das Formular testen. Es wird keine Anfrage versendet.|Anteprima locale: potete provare il modulo. Non verrà inviata alcuna richiesta.|Aperçu local : vous pouvez tester le formulaire. Aucune demande ne sera envoyée.|Local preview: you can try the form. No reservation request will be sent.|Vista local de prueba: puedes probar el formulario. No se enviará ninguna solicitud.
name|Ihr Name|Il vostro nome|Votre nom|Your name|Tu nombre
namePlaceholder|Anna Rossi|Anna Rossi|Anna Rossi|Anna Rossi|Anna Rossi
contactField|Telefon oder E-Mail|Telefono o e-mail|Téléphone ou e-mail|Phone or email|Teléfono o correo electrónico
date|Wunschdatum|Data desiderata|Date souhaitée|Preferred date|Fecha deseada
time|Uhrzeit|Orario|Heure|Time|Hora
guests|Anzahl Personen|Numero di persone|Nombre de personnes|Number of guests|Número de personas
guest1|1 Person|1 persona|1 personne|1 guest|1 persona
guest2|2 Personen|2 persone|2 personnes|2 guests|2 personas
guest3|3 Personen|3 persone|3 personnes|3 guests|3 personas
guest4|4 Personen|4 persone|4 personnes|4 guests|4 personas
guest5|5+ Personen — bitte Anzahl unten angeben|5+ persone — indicate il numero qui sotto|5+ personnes — précisez le nombre ci-dessous|5+ guests — please specify below|5+ personas — indica cuántas debajo
notes|Wünsche, Allergien oder Anlass|Preferenze, allergie o occasione|Souhaits, allergies ou occasion|Requests, allergies or occasion|Peticiones, alergias o celebración
optional|(optional)|(facoltativo)|(facultatif)|(optional)|(opcional)
notesPlaceholder|Was dürfen wir für Sie wissen?|Cosa possiamo sapere per accogliervi al meglio?|Que souhaitez-vous nous préciser ?|Anything you’d like us to know?|¿Algo que debamos saber?
send|Tisch anfragen|Richiedi un tavolo|Demander une table|Request a table|Solicitar mesa
confirmationNote|Ihre Anfrage ist erst nach unserer Bestätigung verbindlich.|La prenotazione è valida solo dopo la nostra conferma.|Votre réservation est effective après notre confirmation.|Your reservation is only final once we confirm it.|La reserva será válida cuando recibas nuestra confirmación.
footerTitle|Bis bald<br><em>im Belvedere.</em>|A presto<br><em>al Belvedere.</em>|À bientôt<br><em>au Belvedere.</em>|See you soon<br><em>at Belvedere.</em>|Hasta pronto<br><em>en Belvedere.</em>
findUs|Sie finden uns hier|Ci trovate qui|Retrouvez-nous ici|Find us here|Aquí nos encontrarás
directions|Route planen|Come arrivare|Itinéraire|Get directions|Cómo llegar
pauseMotion|Animationen pausieren|Pausa animazioni|Mettre les animations en pause|Pause animations|Pausar animaciones
resumeMotion|Animationen aktivieren|Attiva animazioni|Activer les animations|Enable animations|Activar animaciones
backTop|Nach oben|Torna su|Retour en haut|Back to top|Volver arriba
largeImage|Bild in Grossansicht|Immagine ingrandita|Image agrandie|Full-size image|Imagen ampliada
close|Schliessen|Chiudi|Fermer|Close|Cerrar
nameError|Bitte geben Sie Ihren Namen ein.|Inserite il vostro nome.|Veuillez indiquer votre nom.|Please enter your name.|Escribe tu nombre.
contactError|Bitte geben Sie eine gültige Telefonnummer oder E-Mail-Adresse ein.|Inserite un numero di telefono o un indirizzo e-mail valido.|Veuillez indiquer un téléphone ou une adresse e-mail valide.|Please enter a valid phone number or email address.|Introduce un teléfono o correo electrónico válido.
pastError|Bitte wählen Sie ein Datum und eine Uhrzeit in der Zukunft.|Scegliete una data e un orario futuri.|Veuillez choisir une date et une heure futures.|Please choose a future date and time.|Elige una fecha y una hora futuras.
hoursError|Bitte wählen Sie eine Zeit innerhalb unserer Öffnungszeiten.|Scegliete un orario entro i nostri orari di apertura.|Veuillez choisir une heure pendant nos horaires d’ouverture.|Please choose a time within our opening hours.|Elige una hora dentro de nuestro horario.
previewSuccess|Test erfolgreich, {name}. Ihre Anfrage für {date} um {time} wurde geprüft, aber nicht versendet.|Prova riuscita, {name}. La richiesta per il {date} alle {time} è stata verificata, ma non inviata.|Test réussi, {name}. Votre demande pour le {date} à {time} a été vérifiée, mais n’a pas été envoyée.|Test complete, {name}. Your request for {date} at {time} was checked but has not been sent.|Prueba completada, {name}. La solicitud para el {date} a las {time} se ha comprobado, pero no se ha enviado.
sending|Ihre Anfrage wird gesendet …|Invio della richiesta …|Envoi de votre demande…|Sending your request…|Enviando tu solicitud…
sent|Vielen Dank! Ihre Anfrage wurde versendet. Bitte warten Sie auf unsere persönliche Bestätigung.|Grazie! La richiesta è stata inviata. Attendete la nostra conferma personale.|Merci ! Votre demande a été envoyée. Veuillez attendre notre confirmation personnelle.|Thank you! Your request has been sent. Please wait for our personal confirmation.|¡Gracias! Tu solicitud se ha enviado. Espera nuestra confirmación personal.
sendError|Der Versand konnte nicht bestätigt werden. Bitte kontaktieren Sie uns telefonisch oder per E-Mail.|Non è stato possibile confermare l’invio. Contattateci per telefono o via e-mail.|L’envoi n’a pas pu être confirmé. Veuillez nous contacter par téléphone ou par e-mail.|We couldn’t confirm that your request was sent. Please contact us by phone or email.|No se ha podido confirmar el envío. Contacta con nosotros por teléfono o correo.
photoTerrace|Abende auf der Terrasse|Serate in terrazza|Soirées en terrasse|Evenings on the terrace|Noches en la terraza
photoPasta|Aus unserer Küche|Dalla nostra cucina|De notre cuisine|From our kitchen|De nuestra cocina
photoDining|Unser Restaurant|Il nostro ristorante|Notre restaurant|Our restaurant|Nuestro restaurante
photoSunset|Ein Moment im Freien|Un momento all’aperto|Un instant au grand air|A moment outdoors|Un momento al aire libre
photoTable|Ihr Tisch wartet|Il vostro tavolo vi aspetta|Votre table vous attend|Your table awaits|Tu mesa te espera
photoDessert|Ein süsser Abschluss|Un dolce finale|Une note sucrée|A sweet finish|Un final dulce
photoDetail|Die kleinen Details|I piccoli dettagli|Les petits détails|The little details|Los pequeños detalles
photoFestive|Festliche Momente|Momenti di festa|Instants de fête|Festive moments|Momentos de celebración
`;
  rows.trim().split('\n').forEach(row => {
    const [key, ...values] = row.split('|');
    languages.forEach((language, index) => { dictionary[language][key] = values[index]; });
  });
  window.BELVEDERE_TRANSLATIONS = dictionary;

  // Descripciones en el mismo orden que content.js; se mantienen los nombres de los platos.
  const descriptions = {
    it: `
Antipasti italiani assortiti
Fette di pane tostato con pomodori marinati
Melanzane gratinate
Carpaccio di manzo
Crema di pomodoro
Crema di zucca
Insalata verde
Insalata mista
Pomodori e mozzarella
Insalata di valeriana con uovo
Insalata di valeriana con uovo e pancetta
Insalata di salsiccia e formaggio
Insalata di salsiccia e formaggio con guarnizione
Insalata di salsiccia e formaggio con patatine fritte
Con salsa di pomodoro
Con olio d’oliva, acciughe, aglio, pomodori e peperoncino
Fagottini ripieni di tartufo con salsa al tartufo
Pasta con cime di rapa e salsiccia piccante di maiale
Risotto ai funghi porcini
Ravioli ripieni di capesante e gambero rosso con salsa allo zafferano
Pasta fatta in casa con gamberi, spinaci e salsa di pomodoro
Pasta fatta in casa con mortadella e spinaci, gratinata con panna e parmigiano
Salsa di pomodoro, mozzarella
Salsa di pomodoro, mozzarella, prosciutto cotto
Salsa di pomodoro, mozzarella, funghi
Salsa di pomodoro, mozzarella, prosciutto cotto e funghi
Salsa di pomodoro, mozzarella, acciughe, capperi
Salsa di pomodoro, mozzarella, prosciutto cotto, funghi, parmigiano
Salsa di pomodoro, mozzarella, spinaci
Salsa di pomodoro, mozzarella, salame
Salsa di pomodoro, mozzarella, ’nduja, melanzane, salame piccante
Salsa di pomodoro, mozzarella, prosciutto cotto, spinaci e uovo
Salsa di pomodoro, mozzarella, prosciutto cotto, funghi, melanzane, carciofi
Salsa di pomodoro, mozzarella, gorgonzola
Salsa di pomodoro, mozzarella, prosciutto cotto, ananas
Salsa di pomodoro, mozzarella, rucola, parmigiano
Salsa di pomodoro, mozzarella, prosciutto crudo
Salsa di pomodoro, mozzarella, prosciutto crudo, rucola, parmigiano
Salsa di pomodoro, mozzarella, tonno
Salsa di pomodoro, mozzarella, prosciutto cotto, pancetta, cipolla, aglio, peperoncino
Margherita, prosciutto, salame o Hawaii (fino a 8 anni)
Gamberetti con salsa al prosecco
Anelli di calamari fritti
Scaloppine di maiale impanate
Cordon bleu di maiale
Scaloppine di maiale con salsa alla panna
Fegato di vitello con salsa alle cipolle
Bistecca di vitello con salsa alle spugnole
Filetto di manzo alla griglia
Ossobuco di vitello`,
    fr: `
Assortiment d’entrées italiennes
Tranches de pain grillé aux tomates marinées
Aubergines gratinées
Carpaccio de bœuf
Velouté de tomates
Velouté de courge
Salade verte
Salade mêlée
Tomates et mozzarella
Salade de rampon avec œuf
Salade de rampon avec œuf et lard
Salade de saucisse et de fromage
Salade de saucisse et de fromage garnie
Salade de saucisse et de fromage avec frites
À la sauce tomate
À l’huile d’olive, anchois, ail, tomates et piment
Pâtes farcies à la truffe, sauce à la truffe
Pâtes aux cime di rapa et à la saucisse de porc piquante
Risotto aux cèpes
Raviolis farcis aux noix de Saint-Jacques et à la crevette rouge, sauce au safran
Pâtes maison aux crevettes, épinards et sauce tomate
Pâtes maison à la mortadelle et aux épinards, gratinées à la crème et au parmesan
Sauce tomate, mozzarella
Sauce tomate, mozzarella, jambon
Sauce tomate, mozzarella, champignons
Sauce tomate, mozzarella, jambon et champignons
Sauce tomate, mozzarella, anchois, câpres
Sauce tomate, mozzarella, jambon, champignons, parmesan
Sauce tomate, mozzarella, épinards
Sauce tomate, mozzarella, salami
Sauce tomate, mozzarella, ’nduja, aubergines, salami piquant
Sauce tomate, mozzarella, jambon, épinards et œuf
Sauce tomate, mozzarella, jambon, champignons, aubergines, artichauts
Sauce tomate, mozzarella, gorgonzola
Sauce tomate, mozzarella, jambon, ananas
Sauce tomate, mozzarella, roquette, parmesan
Sauce tomate, mozzarella, jambon cru
Sauce tomate, mozzarella, jambon cru, roquette, parmesan
Sauce tomate, mozzarella, thon
Sauce tomate, mozzarella, jambon, lard, oignons, ail, piment
Margherita, jambon, salami ou Hawaii (jusqu’à 8 ans)
Crevettes à la sauce au prosecco
Anneaux de calamars frits
Escalopes de porc panées
Cordon bleu de porc
Escalopes de porc à la sauce à la crème
Foie de veau à la sauce aux oignons
Steak de veau à la sauce aux morilles
Filet de bœuf grillé
Osso buco de veau`,
    en: `
Assorted Italian starters
Toasted bread with marinated tomatoes
Gratinated aubergines
Beef carpaccio
Cream of tomato soup
Cream of pumpkin soup
Green salad
Mixed salad
Tomatoes with mozzarella
Lamb’s lettuce with egg
Lamb’s lettuce with egg and bacon
Sausage and cheese salad
Garnished sausage and cheese salad
Sausage and cheese salad with French fries
With tomato sauce
With olive oil, anchovies, garlic, tomatoes and chilli
Truffle-filled pasta parcels with truffle sauce
Pasta with turnip greens and spicy pork sausage
Risotto with porcini mushrooms
Ravioli filled with scallops and red prawns in a saffron sauce
Homemade pasta with prawns, spinach and tomato sauce
Homemade pasta with mortadella and spinach, baked with cream and Parmesan
Tomato sauce, mozzarella
Tomato sauce, mozzarella, ham
Tomato sauce, mozzarella, mushrooms
Tomato sauce, mozzarella, ham and mushrooms
Tomato sauce, mozzarella, anchovies, capers
Tomato sauce, mozzarella, ham, mushrooms, Parmesan
Tomato sauce, mozzarella, spinach
Tomato sauce, mozzarella, salami
Tomato sauce, mozzarella, ’nduja, aubergines, spicy salami
Tomato sauce, mozzarella, ham, spinach and egg
Tomato sauce, mozzarella, ham, mushrooms, aubergines, artichokes
Tomato sauce, mozzarella, Gorgonzola
Tomato sauce, mozzarella, ham, pineapple
Tomato sauce, mozzarella, rocket, Parmesan
Tomato sauce, mozzarella, cured ham
Tomato sauce, mozzarella, cured ham, rocket, Parmesan
Tomato sauce, mozzarella, tuna
Tomato sauce, mozzarella, ham, bacon, onions, garlic, chilli
Margherita, ham, salami or Hawaii (up to age 8)
Prawns in a prosecco sauce
Fried calamari rings
Breaded pork escalopes
Pork cordon bleu
Pork escalopes with cream sauce
Calf’s liver with onion sauce
Veal steak with morel sauce
Grilled beef fillet
Veal ossobuco`,
    es: `
Selección de entrantes italianos
Rebanadas de pan tostado con tomates marinados
Berenjenas gratinadas
Carpaccio de ternera
Crema de tomate
Crema de calabaza
Ensalada verde
Ensalada mixta
Tomates con mozzarella
Ensalada de canónigos con huevo
Ensalada de canónigos con huevo y beicon
Ensalada de salchicha y queso
Ensalada de salchicha y queso con guarnición
Ensalada de salchicha y queso con patatas fritas
Con salsa de tomate
Con aceite de oliva, anchoas, ajo, tomates y guindilla
Saquitos de pasta rellenos de trufa con salsa de trufa
Pasta con grelos y salchicha de cerdo picante
Risotto con boletus
Raviolis rellenos de vieiras y gamba roja con salsa de azafrán
Pasta casera con gambas, espinacas y salsa de tomate
Pasta casera con mortadela y espinacas, gratinada con nata y parmesano
Salsa de tomate, mozzarella
Salsa de tomate, mozzarella, jamón cocido
Salsa de tomate, mozzarella, champiñones
Salsa de tomate, mozzarella, jamón cocido y champiñones
Salsa de tomate, mozzarella, anchoas, alcaparras
Salsa de tomate, mozzarella, jamón cocido, champiñones, parmesano
Salsa de tomate, mozzarella, espinacas
Salsa de tomate, mozzarella, salami
Salsa de tomate, mozzarella, ’nduja, berenjenas, salami picante
Salsa de tomate, mozzarella, jamón cocido, espinacas y huevo
Salsa de tomate, mozzarella, jamón cocido, champiñones, berenjenas, alcachofas
Salsa de tomate, mozzarella, gorgonzola
Salsa de tomate, mozzarella, jamón cocido, piña
Salsa de tomate, mozzarella, rúcula, parmesano
Salsa de tomate, mozzarella, jamón curado
Salsa de tomate, mozzarella, jamón curado, rúcula, parmesano
Salsa de tomate, mozzarella, atún
Salsa de tomate, mozzarella, jamón cocido, beicon, cebolla, ajo, guindilla
Margherita, jamón, salami o Hawaii (hasta los 8 años)
Gambas con salsa de prosecco
Anillas de calamar fritas
Escalopines de cerdo empanados
Cordon bleu de cerdo
Escalopines de cerdo con salsa de nata
Hígado de ternera con salsa de cebolla
Filete de ternera con salsa de colmenillas
Solomillo de ternera a la parrilla
Ossobuco de ternera`
  };
  window.BELVEDERE_DISH_TRANSLATIONS = Object.fromEntries(Object.entries(descriptions).map(([language, value]) => [language,value.trim().split('\n')]));
})();
