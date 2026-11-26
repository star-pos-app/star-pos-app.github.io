// Suba VERSION cada vez que publique cambios para que los equipos se actualicen
const VERSION='starpos-v27';
const FILES=['./','./index.html','./manifest.webmanifest'];
const EXTRA=['./favicon.png','./apple-touch-icon.png','./starpos-192.png','./starpos-512.png','./starpos-maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES).then(()=>Promise.all(EXTRA.map(u=>c.add(u).catch(()=>0))))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==VERSION).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// Logos de bancos (favicon): se guardan al verse una vez para que también salgan sin internet.
// Con internet: trae la versión más nueva. Sin internet: usa la guardada.
self.addEventListener('fetch',e=>{const u=new URL(e.request.url),logo=(u.hostname==='www.google.com'&&u.pathname.indexOf('/s2/favicons')===0)||u.hostname==='icons.duckduckgo.com';if(e.request.method!=='GET'||(u.origin!==location.origin&&u.hostname!=='cdnjs.cloudflare.com'&&!logo))return;
e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(VERSION).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))))});
