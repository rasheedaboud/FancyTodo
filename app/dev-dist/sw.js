if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,o)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let r={};const c=e=>n(e,i),l={module:{uri:i},exports:r,require:c};s[i]=Promise.all(t.map((e=>l[e]||c(e)))).then((e=>(o(...e),r)))}}define(["./workbox-de803542"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"registerSW.js",revision:"3ca0b8505b4bec776b69afdba2768812"},{revision:null,url:"index.html"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{allowlist:[/^\/$/]})),e.registerRoute(/^https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/.*/,new e.CacheFirst({cacheName:"cloudflare",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:31536e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(/^https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap*/,new e.CacheFirst({cacheName:"bootstrap",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:31536e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(/^https:\/\/cdn\.syncfusion\.com\/ej2\/material*/,new e.CacheFirst({cacheName:"syncfusion",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:31536e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
//# sourceMappingURL=sw.js.map
