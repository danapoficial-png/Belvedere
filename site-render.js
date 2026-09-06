/* Aplica el mismo contenido a la web pública y a la vista previa del editor. */
(() => {
  'use strict';
  const M=window.BelvedereModel;
  const site=M.validate(window.BELVEDERE_SITE);
  window.BELVEDERE_SITE=site;
  const inline=window.BELVEDERE_INLINE_ASSETS || {};
  const asset=path=>inline[path] || path+'?v='+encodeURIComponent(site.revision);
  const config=window.BELVEDERE_CONFIG;
  Object.assign(config,site.contact,{defaultLanguage:site.defaultLanguage,openingHours:site.hours,noticeVisible:site.notice.visible,specialMenu:{visible:false,dishes:[]}});
  if (window.BELVEDERE_EDITOR_PREVIEW) config.previewMode=true;
  document.documentElement.dataset.contentRevision=site.revision;
  window.BELVEDERE_MENU=site.menu.map(d=>({...d,description:d.description.de}));
  window.BELVEDERE_DISH_TRANSLATIONS=Object.fromEntries(M.languages.map(l=>[l,site.menu.map(d=>M.local(d.description,l))]));
  for (const [key,translations] of Object.entries(site.text)) {
    for (const language of M.languages) window.BELVEDERE_TRANSLATIONS[language][key]=M.escape(M.local(translations,language)).replace(/\n/g,'<br>');
  }
  for (const language of M.languages) window.BELVEDERE_TRANSLATIONS[language].noticeText=M.escape(M.local(site.notice.text,language)).replace(/\n/g,'<br>');
  for (const [selector,key] of [['.hero-image','hero'],['.about-main-photo img','table'],['.about-food-photo img','pasta'],['.brand-logo-gold','logoGold'],['.brand-logo-wine','logoWine']]) {
    document.querySelectorAll(selector).forEach(img=>{const original=site.media[key];const path=img.classList.contains('brand-logo')&&['assets/logo-gold.svg','assets/logo-wine.svg'].includes(original)?original.replace('logo-','logo-header-').replace('.svg','.png'):original;img.src=asset(path);});
  }
  const track=document.getElementById('galleryTrack');track.replaceChildren();
  site.gallery.forEach((photo,index)=>{
    const key='photoUser'+index;
    for(const language of M.languages) window.BELVEDERE_TRANSLATIONS[language][key]=M.escape(M.local(photo.caption,language));
    const button=document.createElement('button');button.type='button';button.className='gallery-item';button.dataset.full=asset(photo.src);button.dataset.captionKey=key;
    button.innerHTML='<span class="gallery-photo"><img loading="lazy" width="1200" height="900"><span class="gallery-zoom" aria-hidden="true">+</span></span><span class="gallery-caption"><span></span><span aria-hidden="true">'+String(index+1).padStart(2,'0')+'</span></span>';
    const img=button.querySelector('img');img.src=asset(photo.src);img.alt=M.local(photo.caption);img.dataset.i18nAlt=key;
    const caption=button.querySelector('.gallery-caption span');caption.dataset.i18n=key;caption.textContent=M.local(photo.caption);
    track.append(button);
  });
  const days={de:['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],it:['Domenica','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato'],fr:['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],en:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],es:['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']};
  const specialLabels={de:['BESONDERS EMPFOHLEN','Tisch reservieren','Menü ansehen','Mehr erfahren'],it:['DA NON PERDERE','Prenota un tavolo','Scopri il menù','Scopri di più'],fr:['À DÉCOUVRIR','Réserver une table','Voir le menu','En savoir plus'],en:['SOMETHING SPECIAL','Book a table','View the menu','Find out more'],es:['TE LO RECOMENDAMOS','Reservar mesa','Ver menú','Más información']};
  let lang=site.defaultLanguage;
  const section=document.getElementById('specialFeature');
  const dialog=document.getElementById('specialDialog');
  const time=minutes=>String(Math.floor(minutes/60)).padStart(2,'0')+':'+String(minutes%60).padStart(2,'0');
  window.BelvedereRenderExtras=language=>{
    lang=language;
    const dl=document.querySelector('.hours dl');dl.replaceChildren();
    let groups=[];
    for(const day of [1,2,3,4,5,6,0]){
      const ranges=site.hours[day];const previous=groups[groups.length-1];
      if(previous && JSON.stringify(previous.ranges)===JSON.stringify(ranges)){previous.last=day;} else groups.push({first:day,last:day,ranges});
    }
    groups.forEach(group=>{
      const div=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');
      dt.textContent=days[language][group.first]+(group.first!==group.last?' – '+days[language][group.last]:'');
      dd.innerHTML=group.ranges.length?group.ranges.map(([a,b])=>time(a)+' – '+(b===1440?'00:00':time(b))).join('<br>'):window.BELVEDERE_TRANSLATIONS[language].closed;
      div.append(dt,dd);dl.append(div);
    });
    section.hidden=!site.special.visible && !window.BELVEDERE_EDITOR_PREVIEW;
    if(!site.special.visible)return;
    const special=site.special,labels=specialLabels[language];
    document.getElementById('specialKicker').textContent=labels[0];
    document.getElementById('specialName').textContent=M.local(special.title,language);
    document.getElementById('specialDescription').textContent=M.local(special.description,language);
    document.getElementById('specialPrice').textContent=special.price;
    document.getElementById('specialDate').textContent=special.date?new Intl.DateTimeFormat(language,{dateStyle:'long',timeZone:'Europe/Zurich'}).format(new Date(special.date+'T12:00:00Z')):'';
    const img=document.getElementById('specialImage');img.hidden=!special.image;
    section.classList.toggle('without-image',!special.image);
    if(special.image){img.src=asset(special.image);img.alt=M.local(special.title,language);}
    document.getElementById('specialAction').textContent=labels[{reserve:1,menu:2,info:3}[special.button]]+' ↗';
    document.getElementById('specialAction').href=special.button==='reserve'?'#reserve':'#specialFeature';
  };
  function reserve(){
    const notes=document.getElementById('resNotes'),name=M.local(site.special.title,lang);
    if(!notes.value.includes(name))notes.value=(name+'\n'+notes.value).trim();
    const input=document.getElementById('resDate');
    if(site.special.date && !input.value && site.special.date>=input.min)input.value=site.special.date;
  }
  document.getElementById('specialAction').addEventListener('click',event=>{
    if(site.special.button==='reserve'){reserve();return;}
    event.preventDefault();const special=site.special;
    document.getElementById('specialDialogTitle').textContent=M.local(special.title,lang);
    document.getElementById('specialDialogText').textContent=M.local(special.description,lang);
    const list=document.getElementById('specialDishes');list.replaceChildren();
    special.menu.forEach(d=>{
      const article=document.createElement('article');article.className='dish';
      article.innerHTML='<div class="dish-info"><h4>'+M.escape(d.name)+'</h4><p>'+M.escape(M.local(d.description,lang))+'</p></div><div class="dish-price">'+M.escape(d.price)+(d.price?' CHF':'')+'</div>';
      list.append(article);
    });
    document.getElementById('specialDialogReserve').textContent=specialLabels[lang][1]+' ↗';
    dialog.showModal();document.body.classList.add('scroll-locked');
  });
  document.getElementById('specialDialogClose').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>document.body.classList.remove('scroll-locked'));
  document.getElementById('specialDialogReserve').addEventListener('click',()=>{reserve();dialog.close();});
  if(window.BELVEDERE_EDITOR_PREVIEW){
    document.documentElement.classList.add('editor-preview');
    const buttons=[['.hero','hero'],['#specialFeature','special'],['.about-copy','texts'],['#notice','notice'],['#menu','menu'],['#gallery','gallery'],['.hours','hours'],['#contact','contact']];
    buttons.forEach(([selector,key])=>{
      const target=document.querySelector(selector);if(!target)return;
      if(key==='special'&&!site.special.visible){target.hidden=false;target.classList.add('editor-special-empty');target.innerHTML='<p>Propuesta especial · Oculta</p>';}
      const button=document.createElement('button');button.type='button';button.className='inline-edit-button';button.textContent='✎ Editar';target.prepend(button);
      button.addEventListener('click',()=>window.parent.postMessage({type:'belvedere-edit',section:key,category:key==='menu'?document.querySelector('[data-category][aria-selected="true"]')?.dataset.category:undefined,nonce:window.BELVEDERE_EDITOR_NONCE},'*'));
    });
    document.addEventListener('click',event=>{const link=event.target.closest('a');if(link && !link.getAttribute('href')?.startsWith('#'))event.preventDefault();});
  }
})();
