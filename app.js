/* Belvedere: interfaz sin dependencias, compatible con file:// y servidores locales. */
(() => {
  'use strict';
  const root = document.documentElement;
  const config = window.BELVEDERE_CONFIG || {};
  const translations = window.BELVEDERE_TRANSLATIONS || {};
  const languageSelect = document.getElementById('language');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const compactScreen = window.matchMedia('(max-width: 700px)');
  const readPreference = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const savePreference = (key, value) => { try { localStorage.setItem(key, value); } catch { /* Las preferencias son opcionales. */ } };
  let language = window.BELVEDERE_EDITOR_LANGUAGE || readPreference('belvedere-language') || config.defaultLanguage || 'de';
  if (!translations[language]) language = 'de';
  let motionPaused = readPreference('belvedere-motion') === 'paused' || reducedMotion.matches;
  const text = (key, values = {}) => {
    let value = translations[language]?.[key] ?? translations.de?.[key] ?? key;
    Object.entries(values).forEach(([name, replacement]) => { value = value.replaceAll(`{${name}}`, String(replacement)); });
    return value;
  };
  const behaviour = () => motionPaused || reducedMotion.matches ? 'instant' : 'smooth';
  const themeToggle = document.getElementById('themeToggle');
  const motionToggle = document.getElementById('motionToggle');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const galleryTrack = document.getElementById('galleryTrack');
  const galleryItems = [...galleryTrack.querySelectorAll('.gallery-item')];
  let galleryIndex = 0;
  let lightboxIndex = 0;
  let statusState = null;

  function updateMotion() {
    root.classList.toggle('motion-paused', motionPaused);
    motionToggle.setAttribute('aria-pressed', String(motionPaused));
    motionToggle.querySelector('use').setAttribute('href', motionPaused ? '#icon-play' : '#icon-pause');
    motionToggle.querySelector('span').textContent = text(motionPaused ? 'resumeMotion' : 'pauseMotion');
    if (motionPaused) document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  function updateTheme(theme) {
    root.dataset.theme = theme === 'day' ? 'day' : 'wine';
    themeToggle.querySelector('use').setAttribute('href', theme === 'day' ? '#icon-moon' : '#icon-sun');
    document.querySelector('meta[name="theme-color"]').content = theme === 'day' ? '#fcf7ec' : '#461622';
  }

  function setLanguage(nextLanguage, persist = true) {
    language = translations[nextLanguage] ? nextLanguage : 'de';
    root.lang = language;
    languageSelect.value = language;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      // Sólo el diccionario local del proyecto contiene marcado editorial.
      el.innerHTML = text(el.dataset.i18n);
    });
    [['data-i18n-aria','aria-label'], ['data-i18n-alt','alt'], ['data-i18n-ph','placeholder']].forEach(([attribute, target]) => {
      document.querySelectorAll(`[${attribute}]`).forEach(el => el.setAttribute(target, text(el.getAttribute(attribute))));
    });
    document.querySelectorAll('[data-dish-description]').forEach(el => {
      const i = Number(el.dataset.dishDescription);
      el.textContent = window.BELVEDERE_DISH_TRANSLATIONS?.[language]?.[i] || window.BELVEDERE_MENU[i].description;
    });
    updateMenuLabels();
    if(window.BelvedereRenderExtras) window.BelvedereRenderExtras(language);
    updateMotion();
    if (lightbox.open) renderLightbox();
    if (statusState) renderStatus();
    if (persist) savePreference('belvedere-language', language);
    updateHeaderHeight();
  }

  themeToggle.addEventListener('click', () => {
    const theme = root.dataset.theme === 'wine' ? 'day' : 'wine';
    updateTheme(theme);
    savePreference('belvedere-theme', theme);
  });
  motionToggle.addEventListener('click', () => {
    motionPaused = !motionPaused;
    // Una preferencia del sistema por movimiento reducido sigue respetándose en CSS.
    updateMotion();
    savePreference('belvedere-motion', motionPaused ? 'paused' : 'enabled');
  });
  reducedMotion.addEventListener('change', event => {
    motionPaused = event.matches || readPreference('belvedere-motion') === 'paused';
    updateMotion();
  });
  languageSelect.addEventListener('change', event => setLanguage(event.target.value));

  // Navegación móvil con teclado y devolución del foco.
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  const header = document.getElementById('header');
  const main = document.getElementById('main');
  const footer = document.getElementById('contact');
  let mobileOpen = false;
  function toggleMobile(open, restoreFocus = false) {
    mobileOpen = open;
    mobileToggle.setAttribute('aria-expanded', String(open));
    mobileNav.hidden = !open;
    main.inert = open;
    footer.inert = open;
    document.body.classList.toggle('scroll-locked', open || lightbox.open);
    if (open) mobileNav.querySelector('a').focus();
    else if (restoreFocus) mobileToggle.focus();
  }
  mobileToggle.addEventListener('click', () => toggleMobile(!mobileOpen, mobileOpen));
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => toggleMobile(false)));
  header.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { if (mobileOpen) toggleMobile(false); }));
  function updateHeaderHeight() {
    root.style.setProperty('--header-height', `${Math.ceil(header.getBoundingClientRect().height)}px`);
  }
  if ('ResizeObserver' in window) new ResizeObserver(updateHeaderHeight).observe(header);
  window.addEventListener('resize', () => {
    if (window.innerWidth > 960 && mobileOpen) toggleMobile(false);
    updateHeaderHeight();
  });

  // La carta se construye desde las categorías editables; la propuesta va primero.
  const model=window.BelvedereModel,site=window.BELVEDERE_SITE;
  const sections=model.menuSections(site),tabsContainer=document.querySelector('.menu-tabs'),panelsContainer=document.getElementById('menuPanels');
  tabsContainer.replaceChildren();panelsContainer.replaceChildren();
  const recommendation={de:'Besonders empfohlen',it:'Consigliato',fr:'Notre recommandation',en:'Our recommendation',es:'Te lo recomendamos'};
  sections.forEach((category,position)=>{
    const tab=document.createElement('button');tab.type='button';tab.id='tab-'+category.id;tab.dataset.category=category.id;tab.setAttribute('role','tab');tab.setAttribute('aria-controls','panel-'+category.id);tab.setAttribute('aria-selected',String(position===0));tab.tabIndex=position===0?0:-1;
    const number=document.createElement('span');number.className='tab-number';number.textContent=category.special?'★':String(position+(sections[0].special?0:1)).padStart(2,'0');
    const label=document.createElement('span');label.dataset.menuCategoryLabel=category.id;
    tab.append(number,label);if(category.special)tab.classList.add('special-menu-tab');tabsContainer.append(tab);
    const panel=document.createElement('div');panel.id='panel-'+category.id;panel.className='menu-panel';panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',tab.id);panel.tabIndex=0;panel.hidden=position!==0;
    if(category.special){const badge=document.createElement('p');badge.className='menu-recommendation';badge.dataset.menuRecommendation='';panel.append(badge);}
    const heading=document.createElement('h3');heading.dataset.menuCategoryLabel=category.id;panel.append(heading);
    if(category.special){
      const summary=document.createElement('p');summary.dataset.specialMenuSummary='';summary.className='special-menu-summary';panel.append(summary);
      const details=document.createElement('p');details.className='special-menu-meta';details.dataset.specialMenuMeta='';panel.append(details);
    }
    const entries=category.special?site.special.menu:site.menu.filter(d=>d.category===category.id);
    entries.forEach((dish,index)=>{
      const row=document.createElement('article');row.className='dish';
      const info=document.createElement('div');info.className='dish-info';const name=document.createElement('h4');name.textContent=dish.name;
      const description=document.createElement('p');if(category.special)description.dataset.specialDishDescription=index;else description.dataset.dishDescription=site.menu.findIndex(d=>d.id===dish.id);
      const price=document.createElement('div');price.className='dish-price';price.textContent=dish.price?dish.price+' CHF':'';
      info.append(name,description);row.append(info,price);panel.append(row);
    });
    if(category.special){const link=document.createElement('a');link.className='button menu-special-reserve';link.href='#reserve';link.dataset.i18n='reserveTable';link.addEventListener('click',()=>{const notes=document.getElementById('resNotes');if(notes&&!notes.value.trim())notes.value=model.local(site.special.title,language);});panel.append(link);}
    panelsContainer.append(panel);
  });
  function updateMenuLabels(){
    document.querySelectorAll('[data-menu-category-label]').forEach(el=>{const category=sections.find(c=>c.id===el.dataset.menuCategoryLabel);el.textContent=model.local(category.label,language);});
    document.querySelectorAll('[data-menu-recommendation]').forEach(el=>{el.textContent=recommendation[language];});
    document.querySelectorAll('[data-special-dish-description]').forEach(el=>{el.textContent=model.local(site.special.menu[Number(el.dataset.specialDishDescription)].description,language);});
    document.querySelectorAll('[data-special-menu-summary]').forEach(el=>{el.textContent=model.local(site.special.description,language);el.hidden=!el.textContent;});
    document.querySelectorAll('[data-special-menu-meta]').forEach(el=>{const date=site.special.date?new Intl.DateTimeFormat(language,{dateStyle:'long'}).format(new Date(site.special.date+'T12:00:00')):'';el.textContent=[date,site.special.price].filter(Boolean).join(' · ');el.hidden=!el.textContent;});
  }
  const menuTabs = [...document.querySelectorAll('[data-category]')].filter(tab => !tab.hidden);
  const panels = [...document.querySelectorAll('.menu-panel')];
  function selectCategory(category, focus = false) {
    menuTabs.forEach(tab => {
      const selected = tab.dataset.category === category;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
    panels.forEach(panel => {
      const selected = panel.id === `panel-${category}`;
      panel.hidden = !selected;
      panel.classList.toggle('is-selected', selected);
    });
  }
  menuTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectCategory(tab.dataset.category));
    tab.addEventListener('keydown', event => {
      let target = index;
      if (['ArrowDown','ArrowRight'].includes(event.key)) target = (index + 1) % menuTabs.length;
      else if (['ArrowUp','ArrowLeft'].includes(event.key)) target = (index - 1 + menuTabs.length) % menuTabs.length;
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = menuTabs.length - 1;
      else return;
      event.preventDefault();
      selectCategory(menuTabs[target].dataset.category, true);
      if (compactScreen.matches) menuTabs[target].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: behaviour() });
    });
  });
  function syncTabOrientation() { document.querySelector('.menu-tabs').setAttribute('aria-orientation', compactScreen.matches ? 'horizontal' : 'vertical'); }
  compactScreen.addEventListener('change', syncTabOrientation);
  syncTabOrientation();
  selectCategory(sections[0].id);

  // Galería con desplazamiento táctil y ampliación nativa accesible.
  const wrap = index => (index + galleryItems.length) % galleryItems.length;
  const counter = index => `${String(index + 1).padStart(2,'0')} / ${String(galleryItems.length).padStart(2,'0')}`;
  function scrollGallery(index) {
    galleryIndex = wrap(index);
    const target = galleryItems[galleryIndex];
    const left = target.getBoundingClientRect().left - galleryTrack.getBoundingClientRect().left + galleryTrack.scrollLeft;
    galleryTrack.scrollTo({ left, behavior: behaviour() });
    document.getElementById('galleryCount').textContent = counter(galleryIndex);
  }
  let scrollQueued = false;
  galleryTrack.addEventListener('scroll', () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      const start = galleryTrack.getBoundingClientRect().left;
      let nearest = 0, distance = Infinity;
      galleryItems.forEach((item, index) => {
        const delta = Math.abs(item.getBoundingClientRect().left - start);
        if (delta < distance) { distance = delta; nearest = index; }
      });
      if (galleryTrack.scrollWidth - galleryTrack.clientWidth - galleryTrack.scrollLeft < 3) nearest = galleryItems.length - 1;
      galleryIndex = nearest;
      document.getElementById('galleryCount').textContent = counter(galleryIndex);
      scrollQueued = false;
    });
  }, { passive: true });
  document.getElementById('galleryPrev').addEventListener('click', () => scrollGallery(galleryIndex - 1));
  document.getElementById('galleryNext').addEventListener('click', () => scrollGallery(galleryIndex + 1));
  function renderLightbox() {
    const item = galleryItems[lightboxIndex];
    const caption = text(item.dataset.captionKey);
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = caption;
    document.getElementById('lightboxCaption').textContent = caption;
    document.getElementById('lightboxCount').textContent = counter(lightboxIndex);
  }
  function showLightbox(index) {
    lightboxIndex = wrap(index);
    renderLightbox();
    if (!lightbox.open) {
      if (typeof lightbox.showModal !== 'function') {
        window.open(galleryItems[lightboxIndex].dataset.full, '_blank', 'noopener');
        return;
      }
      lightbox.showModal();
      document.body.classList.add('scroll-locked');
    }
  }
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => showLightbox(index));
    item.addEventListener('keydown', event => {
      if (!['ArrowRight','ArrowLeft'].includes(event.key)) return;
      event.preventDefault();
      const next = wrap(index + (event.key === 'ArrowRight' ? 1 : -1));
      galleryItems[next].focus({ preventScroll: true });
      scrollGallery(next);
    });
  });
  document.getElementById('lightboxClose').addEventListener('click', () => lightbox.close());
  document.getElementById('lightboxPrev').addEventListener('click', () => showLightbox(lightboxIndex - 1));
  document.getElementById('lightboxNext').addEventListener('click', () => showLightbox(lightboxIndex + 1));
  lightbox.addEventListener('close', () => document.body.classList.toggle('scroll-locked', mobileOpen));
  lightbox.addEventListener('click', event => {
    const bounds = lightbox.getBoundingClientRect();
    if (event.target === lightbox && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) lightbox.close();
  });
  let swipeStart = null;
  lightboxImage.addEventListener('touchstart', event => { if (event.touches.length === 1) swipeStart = { x:event.touches[0].clientX, y:event.touches[0].clientY }; }, { passive:true });
  lightboxImage.addEventListener('touchend', event => {
    if (!swipeStart) return;
    const dx = event.changedTouches[0].clientX - swipeStart.x;
    const dy = event.changedTouches[0].clientY - swipeStart.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) showLightbox(lightboxIndex + (dx < 0 ? 1 : -1));
    swipeStart = null;
  }, { passive:true });
  document.addEventListener('keydown', event => {
    if (lightbox.open && ['ArrowRight','ArrowLeft'].includes(event.key)) {
      event.preventDefault(); showLightbox(lightboxIndex + (event.key === 'ArrowRight' ? 1 : -1));
    }
    if (!mobileOpen) return;
    if (event.key === 'Escape') { event.preventDefault(); toggleMobile(false, true); }
    if (event.key === 'Tab') {
      const controls = [...header.querySelectorAll('a,button,select'), ...mobileNav.querySelectorAll('a')].filter(el => el.getClientRects().length > 0);
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  // Reservas: envío directo con Netlify Forms, sin abrir el cliente de correo.
  const form = document.getElementById('reservationForm');
  const status = document.getElementById('reservationStatus');
  const submit = form.querySelector('[type="submit"]');
  const dateInput = document.getElementById('resDate');

  const zurichNow = () => {
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Zurich', year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', hourCycle:'h23' }).formatToParts(new Date()).map(part => [part.type,part.value]));
    return { date:`${parts.year}-${parts.month}-${parts.day}`, minutes:Number(parts.hour)*60+Number(parts.minute) };
  };

  const openingHours = config.openingHours || { 0:[[660,1380]], 1:[], 2:[[600,840],[1050,1440]], 3:[[600,840],[1050,1440]], 4:[[600,840],[1050,1440]], 5:[[600,840],[1050,1440]], 6:[[1050,1440]] };

  function renderStatus() {
    status.hidden = !statusState;
    if (!statusState) return;
    status.dataset.kind = statusState.kind;
    status.textContent = text(statusState.key, statusState.values);
  }

  function showStatus(kind, key, values = {}) {
    statusState = { kind, key, values };
    renderStatus();
  }

  dateInput.min = zurichNow().date;
  dateInput.addEventListener('focus', () => { dateInput.min = zurichNow().date; });

  let submitting = false;

  form.addEventListener('submit', async event => {
    event.preventDefault();

    if (window.BELVEDERE_EDITOR_PREVIEW) {showStatus('success','previewSuccess',{name:'',date:'',time:''});return;}
    if (submitting) return;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData);

    Object.keys(payload).forEach(key => {
      payload[key] = String(payload[key]).trim();
      formData.set(key, payload[key]);
    });

    if (!payload.name) {
      showStatus('error','nameError');
      document.getElementById('resName').focus();
      return;
    }

    const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email || '');

    if (!hasEmail) {
      showStatus('error','emailError');
      document.getElementById('resEmail').focus();
      return;
    }

    const now = zurichNow();
    const [hours, minutes] = payload.time.split(':').map(Number);
    const requestedMinutes = hours * 60 + minutes;

    if (payload.date < now.date || (payload.date === now.date && requestedMinutes <= now.minutes)) {
      showStatus('error','pastError');
      dateInput.focus();
      return;
    }

    const day = new Date(`${payload.date}T12:00:00Z`).getUTCDay();

    if (!openingHours[day]?.some(([from,to]) => requestedMinutes >= from && requestedMinutes < to)) {
      showStatus('error','hoursError');
      document.getElementById('resTime').focus();
      return;
    }

    submitting = true;
    submit.disabled = true;
    submit.setAttribute('aria-busy','true');
    showStatus('pending','sending');

    formData.set('form-name', 'reservation');

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
        signal: controller.signal
      });

      if (!response.ok) throw new Error(`Netlify form submission failed: ${response.status}`);

      showStatus('success','sent');
      form.reset();

      const timeField = document.getElementById('resTime');
      const personsField = document.getElementById('resPersons');
      if (timeField) timeField.value = '19:00';
      if (personsField) personsField.value = '2';
    } catch {
      showStatus('error','sendError');
    } finally {
      clearTimeout(timeout);
      submitting = false;
      submit.disabled = false;
      submit.removeAttribute('aria-busy');
    }
  });

  submit.disabled = false;

  document.getElementById('notice').hidden = config.noticeVisible === false;
  document.querySelectorAll('[data-whatsapp]').forEach(link => { if (config.whatsapp) link.href = `https://wa.me/${config.whatsapp.replace(/\D/g,'')}`; });
  const contactPhone = '+41617314287';
  const readablePhone = '+41 61 731 42 87';
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.href = `tel:${contactPhone}`;
    link.textContent = readablePhone;
  });
  if (config.email) document.querySelectorAll('a[href^="mailto:"]').forEach(link => { link.href = `mailto:${config.email}`; link.textContent = config.email; });
  document.getElementById('year').textContent = new Date().getFullYear();

  // Movimiento ligero: sin librerías, sin bucles de render cuando no se desplaza la página.
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } });
    }, { threshold:0.08 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    root.classList.add('js');
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll('.desktop-nav a').forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current','location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin:'-15% 0px -60% 0px' });
    document.querySelectorAll('#about,#menu,#gallery,#contact').forEach(section => sectionObserver.observe(section));
  }
  let framePending = false;
  function updateScroll() {
    const maximum = root.scrollHeight - window.innerHeight;
    document.querySelector('.reading-progress').style.transform = `scaleX(${maximum > 0 ? Math.min(1,Math.max(0,window.scrollY/maximum)) : 0})`;
    header.classList.toggle('scrolled', window.scrollY > 25);
    framePending = false;
  }
  window.addEventListener('scroll', () => {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(updateScroll);
  }, { passive:true });
  updateTheme(readPreference('belvedere-theme'));
  setLanguage(language, false);
  updateMotion();
  updateScroll();
})();
