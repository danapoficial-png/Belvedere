/* Decoración estacional independiente de los platos y de las reservas. */
(()=>{'use strict';
 const season=window.BELVEDERE_CONFIG?.season||'normal';
 if(season!=='halloween')return;
 const root=document.documentElement;root.dataset.season='halloween';
 const hero=document.querySelector('.hero');if(!hero||hero.querySelector('.season-decoration'))return;
 const template=document.createElement('template');template.innerHTML="<div class=\"season-decoration season-only\" aria-hidden=\"true\"><div class=\"moon\"></div><svg class=\"cobweb\" viewBox=\"0 0 200 200\"><path d=\"M200 0 0 0M200 0 0 55M200 0 26 126M200 0 90 176M200 0 144 200M200 0 200 200M155 0Q156 15 158 12Q156 23 164 26Q169 34 175 39Q187 38 187 46Q192 43 200 49M110 0Q116 30 119 24Q112 44 128 52Q131 68 150 78Q171 75 175 92Q186 84 200 98M65 0Q73 43 78 35Q76 66 91 79Q99 101 125 117Q158 112 162 138Q181 126 200 147M20 0Q29 61 37 46Q39 88 55 105Q64 136 100 156Q141 150 149 184Q175 171 200 196\"/></svg><div class=\"mist\"></div><i class=\"ember\"></i><i class=\"ember\"></i><i class=\"ember\"></i><div class=\"mist second\"></div><div class=\"bat-flight\"><svg viewBox=\"0 0 100 50\"><path d=\"M0 0Q24 8 39 25L44 15 49 20 55 15 60 25Q77 9 100 0L87 32Q74 23 65 40L51 50 35 40Q25 23 13 32Z\"/></svg></div></div>";
 hero.querySelector('.hero-shade').after(template.content.cloneNode(true));
 const reserve=document.querySelector('.header-reserve');if(reserve){template.innerHTML="<svg class=\"pumpkin-icon season-only\" viewBox=\"0 0 26 26\" aria-hidden=\"true\"><path d=\"M13 7c-4-3-10 0-10 7s5 9 10 7c5 2 10 0 10-7S17 4 13 7Z\"/><ellipse cx=\"13\" cy=\"14\" rx=\"5\" ry=\"8\"/><path d=\"M13 7c-1-3 1-5 3-5M13 3c-3-2-5-1-5 1 2 2 4 1 5-1\"/></svg>";reserve.prepend(template.content.cloneNode(true));}
 const candles=document.createElement('div');candles.className='season-candles';candles.setAttribute('aria-hidden','true');candles.innerHTML='<div class="candle"><i class="flame"></i></div><div class="candle tall"><i class="flame"></i></div><div class="candle short"><i class="flame"></i></div>';hero.querySelector('.season-decoration').append(candles);
})();
