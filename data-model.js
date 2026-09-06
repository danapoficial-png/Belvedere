/* Modelo compartido por la web, el editor y las funciones de guardado. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.BelvedereModel = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const languages = ['de','it','fr','en','es'];
  const categories = ['antipasti','paste','pizze','carne'];
  const clone = value => JSON.parse(JSON.stringify(value));
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const local = (value, language = 'de') => typeof value === 'string' ? value : value?.[language] || value?.de || '';
  const assetPath = path => typeof path === 'string' && /^assets\/[a-z0-9][a-z0-9/_-]*\.(?:webp|png|jpg|jpeg|svg)$/.test(path) && !path.includes('//');
  const uploadPath = path => ['assets/hero.webp','assets/table.webp','assets/pasta.webp','assets/special.webp','assets/logo-custom.webp'].includes(path) || /^assets\/uploads\/gallery-[a-z0-9-]{1,60}\.webp$/.test(path);
  const fail = message => { throw new Error(message); };
  function string(value, limit, name, required = false) {
    if (typeof value !== 'string' || value.length > limit || (required && !value.trim())) fail('Revisa '+name+'.');
    return value;
  }
  function localized(value, limit, name) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) fail('Revisa '+name+'.');
    const result = {};
    for (const language of languages) result[language] = string(value[language] ?? '',limit,name);
    return result;
  }
  function dish(value, special = false) {
    if (!value || typeof value !== 'object') fail('Plato inválido.');
    const id = string(value.id,80,'el identificador',true);
    if (!/^[a-z0-9-]+$/.test(id)) fail('Identificador de plato inválido.');
    const price = String(value.price ?? '').trim().replace(',','.');
    if (!(special && price === '') && !/^\d{1,4}(?:\.\d{1,2})?$/.test(price)) fail('El precio debe ser un número válido en CHF.');
    if (!special && !categories.includes(value.category)) fail('Categoría inválida.');
    return {id,category:special?'special':value.category,name:string(value.name,180,'el nombre del plato',true),price:price===''?'':Number(price).toFixed(2),description:localized(value.description,1400,'la descripción')};
  }
  function validate(input) {
    if (!input || input.schemaVersion !== 2) fail('Esta copia no es compatible con el editor Belvedere 2.');
    const result = {schemaVersion:2,revision:string(input.revision,100,'la versión',true),defaultLanguage:languages.includes(input.defaultLanguage)?input.defaultLanguage:'de',media:{},text:{},contact:{},hours:{}};
    if (!/^[a-zA-Z0-9_-]+$/.test(result.revision)) fail('Versión inválida.');
    for (const key of ['hero','table','pasta','logoGold','logoWine']) {
      if (!assetPath(input.media?.[key])) fail('Referencia de imagen inválida: '+key);
      result.media[key] = input.media[key];
    }
    const texts = input.text || {};
    if (Object.keys(texts).length>180) fail('Demasiados textos.');
    for (const [key,value] of Object.entries(texts)) {
      if (!/^[a-z][a-zA-Z0-9]{0,60}$/.test(key) || ['constructor','prototype','__proto__'].includes(key)) fail('Clave de texto inválida.');
      result.text[key] = localized(value,5000,'el texto');
    }
    result.contact.phone = string(input.contact?.phone,30,'el teléfono',true);
    if (!/^\+?[\d ()-]{6,30}$/.test(result.contact.phone)) fail('Teléfono inválido.');
    result.contact.email = string(input.contact?.email,160,'el correo',true);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.contact.email)) fail('Correo inválido.');
    result.contact.whatsapp = string(input.contact?.whatsapp,25,'WhatsApp',true).replace(/\D/g,'');
    if (!/^\d{6,20}$/.test(result.contact.whatsapp)) fail('Número de WhatsApp inválido.');
    for (let day=0;day<7;day++) {
      const ranges = input.hours?.[day];
      if (!Array.isArray(ranges) || ranges.length>3) fail('Horario inválido.');
      let end=0;
      result.hours[day] = ranges.map(range => {
        if (!Array.isArray(range) || range.length!==2 || !range.every(Number.isInteger) || range[0]<0 || range[1]>1440 || range[0]>=range[1] || range[0]<end) fail('Los horarios se solapan o no son válidos.');
        end=range[1];return [...range];
      });
    }
    result.notice = {visible:input.notice?.visible===true,text:localized(input.notice?.text,4000,'el aviso')};
    if (!Array.isArray(input.menu) || input.menu.length>400) fail('Carta inválida o demasiado grande.');
    result.menu=input.menu.map(value=>dish(value));
    const special=input.special;
    if (!special || !['reserve','menu','info'].includes(special.button)) fail('Propuesta especial inválida.');
    result.special={visible:special.visible===true,title:localized(special.title,180,'el título'),description:localized(special.description,7000,'la propuesta'),date:string(special.date||'',10,'la fecha'),price:string(special.price||'',120,'el precio de la propuesta'),image:string(special.image||'',180,'la imagen'),button:special.button,menu:[]};
    if (result.special.date && (!/^\d{4}-\d{2}-\d{2}$/.test(result.special.date) || new Date(result.special.date+'T12:00:00Z').toISOString().slice(0,10)!==result.special.date)) fail('Fecha inválida.');
    if (result.special.image && !assetPath(result.special.image)) fail('Imagen especial inválida.');
    if (result.special.visible && !result.special.title.de.trim()) fail('Escribe el título principal de la propuesta.');
    if (!Array.isArray(special.menu) || special.menu.length>60) fail('Menú especial inválido.');
    result.special.menu=special.menu.map(value=>dish(value,true));
    if (result.special.visible && result.special.button==='menu' && !result.special.menu.length) fail('Añade los platos o elige otro botón para la propuesta.');
    if (!Array.isArray(input.gallery) || input.gallery.length>60 || input.gallery.length<1) fail('La galería debe contener entre 1 y 60 imágenes.');
    result.gallery=input.gallery.map(image=>{
      if (!assetPath(image.src)) fail('Referencia de galería inválida.');
      return {id:string(image.id,80,'el identificador de la foto',true),src:image.src,caption:localized(image.caption,250,'el pie de foto')};
    });
    for (const list of [result.menu,result.special.menu,result.gallery]) if (new Set(list.map(item=>item.id)).size!==list.length) fail('Hay identificadores repetidos.');
    if (JSON.stringify(result).length>700000) fail('El contenido supera el tamaño permitido.');
    return result;
  }
  function serialize(value) { return '/* Contenido editable de Belvedere. */\nwindow.BELVEDERE_SITE = '+JSON.stringify(validate(value),null,2).replace(/</g,'\\u003c')+';\n'; }
  function parse(source) {
    const marker='window.BELVEDERE_SITE = ';
    const at=source.indexOf(marker);
    if (at<0) fail('No se encontró el contenido de Belvedere 2.');
    return validate(JSON.parse(source.slice(at+marker.length).trim().replace(/;\s*$/,'')));
  }
  function parseMenuText(source,category='antipasti') {
    const rows=[];let pending=[];
    for (const line of String(source).replace(/\r/g,'').split('\n').map(s=>s.trim()).filter(Boolean)) {
      const match=line.match(/^(.*?)\s*(?:CHF\s*)?(\d{1,4}(?:[.,]\d{1,2}|[.,]?[–—-]))\s*(?:CHF)?\s*$/i);
      if (!match) { pending.push(line);continue; }
      const parts=[...pending,match[1].replace(/[.·_\s]+$/,'').trim()].filter(Boolean);pending=[];
      if (!parts.length) continue;
      let name=parts.shift(),description=parts.join(' ');
      if (name.includes('|')) { const split=name.split('|').map(s=>s.trim());name=split.shift();description=[...split,description].filter(Boolean).join(' '); }
      rows.push({id:'dish-import-'+(rows.length+1),category,name,price:match[2].replace(/[–—-]$/,'00').replace(',','.'),description:{de:description,it:'',fr:'',en:'',es:''}});
    }
    return {dishes:rows,unmatched:pending.join('\n')};
  }
  function replaceMenuCategory(input,category,incoming) {
    if(!categories.includes(category)&&category!=='special')fail('Selecciona un menú válido.');
    if(!Array.isArray(incoming)||!incoming.length)fail('No se reconocieron platos. El menú anterior se conserva.');
    const next=clone(input),items=incoming.map(item=>dish({...item,category},category==='special'));
    if(category==='special')next.special.menu=items;
    else {
      const first=next.menu.findIndex(d=>d.category===category);
      const rest=next.menu.filter(d=>d.category!==category);
      rest.splice(first<0?rest.length:first,0,...items);next.menu=rest;
    }
    // Validate only the imported dishes here: other fields may still be unfinished in the dialog.
    if(new Set(items.map(d=>d.id)).size!==items.length)fail('Hay identificadores repetidos.');
    return next;
  }
  return {languages,categories,clone,escape,local,assetPath,uploadPath,validate,serialize,parse,parseMenuText,replaceMenuCategory};
});
