var Z=Array.isArray,he=Array.from,W=Object.defineProperty,R=Object.getOwnPropertyDescriptor;const ve=2,me=4,L=8,ee=16,B=64,O=128,w=256,T=512,A=1024,U=2048,F=4096,ye=0;function be(e){return e===this.v}function Ee(e){const t={f:0,reactions:null,equals:be,v:e,version:0};return t.inspect=new Set,t}function we(e,t,n,r=N,o=!0){const f={block:r,deps:null,f:e|T,l:0,fn:t,effects:null,deriveds:null,teardown:null,ctx:h,ondestroy:null};return S!==null&&(f.l=S.l+1),b!==null&&(b.effects===null?b.effects=[f]:b.effects.push(f)),o&&Y(f,n),f}function xe(e,t=N,n=!1,r=!0){let o=ee;return n&&(o|=B),we(o,e,r,t)}function te(e){P(e),I(e,0),m(e,F),e.teardown?.(),e.ondestroy?.(),e.fn=e.effects=e.teardown=e.ondestroy=e.ctx=e.block=e.deps=null}function ke(e,t){P(e);var n=oe(e),r=(g||e.f&O)&&e.deps!==null?A:w;if(m(e,r),!e.equals(n)&&(e.v=n,ue(e,T,t),t))for(var o of e.inspect)o()}function Se(e){P(e),I(e,0),m(e,F),e.effects=e.deps=e.reactions=e.fn=null}const ne=0,Te=1;let q=ne,M=!1,E=!1,d=[],x=[],k=0,b=null,S=null,v=null,p=0,g=!1,N=null,h=null;function ge(){return h!==null&&h.r}function re(e){var t=e.f;if(t&T)return!0;if(t&A){var n=e.deps;if(n!==null)for(var r=n.length,o=0;o<r;o++){var f=n[o];if(re(f)&&(ke(f,!0),e.f&T))return!0;var u=(t&O)!==0,c=f.version;if(u&&c>e.version)return e.version=c,!0}m(e,w)}return!1}function oe(e){const t=e.fn,n=e.f,r=(n&ee)!==0,o=v,f=p,u=b,c=g;v=null,p=0,b=e,g=!E&&(n&O)!==0;try{let i;r?i=t(e.block,e):i=t();let s=e.deps;if(v!==null){let l;if(s!==null){const _=s.length,a=p===0?v:s.slice(0,p).concat(v),D=a.length>16&&_-p>1?new Set(a):null;for(l=p;l<_;l++){const H=s[l];(D!==null?!D.has(H):!a.includes(H))&&fe(e,H)}}if(s!==null&&p>0)for(s.length=p+v.length,l=0;l<v.length;l++)s[p+l]=v[l];else e.deps=s=v;if(!g)for(l=p;l<s.length;l++){const _=s[l],a=_.reactions;a===null?_.reactions=[e]:a[a.length-1]!==e&&a.push(e)}}else s!==null&&p<s.length&&(I(e,p),s.length=p);return i}finally{v=o,p=f,b=u,g=c}}function fe(e,t){const n=t.reactions;let r=0;if(n!==null){r=n.length-1;const o=n.indexOf(e);o!==-1&&(r===0?t.reactions=null:(n[o]=n[r],n.pop()))}r===0&&t.f&O&&(m(t,T),I(t,0))}function I(e,t){const n=e.deps;if(n!==null){const r=t===0?null:n.slice(0,t);let o;for(o=t;o<n.length;o++){const f=n[o];(r===null||!r.includes(f))&&fe(e,f)}}}function P(e){if(e.effects){for(var t=0;t<e.effects.length;t+=1){var n=e.effects[t];n.f&B||te(n)}e.effects=null}if(e.deriveds){for(t=0;t<e.deriveds.length;t+=1)Se(e.deriveds[t]);e.deriveds=null}}function se(e){if(e.f&F)return;const t=S,n=h,r=N,o=e.ctx;S=e,h=o,N=e.block;try{P(e),e.teardown?.();const f=oe(e);e.teardown=typeof f=="function"?f:null}finally{S=t,h=n,N=r}e.f&L&&d.length>0&&Ae(o)}function ce(){if(k>100)throw k=0,new Error("ERR_SVELTE_TOO_MANY_UPDATES: Maximum update depth exceeded. This can happen when a reactive block or effect repeatedly sets a new value. Svelte limits the number of nested updates to prevent infinite loops.");k++}function C(e){var t=e.length;if(t!==0){ce();var n=E;E=!0;try{for(var r=0;r<t;r++){var o=e[r];o.f&(F|U)||re(o)&&(m(o,w),se(o))}}finally{E=n}e.length=0}}function Ne(){if(M=!1,k>101)return;const e=d,t=x;d=[],x=[],C(e),C(t),M||(k=0)}function Y(e,t){const n=e.f;if(t){const r=E;try{E=!0,se(e),m(e,w)}finally{E=r}}else if(q===ne&&(M||(M=!0,queueMicrotask(Ne))),n&me)x.push(e),n&B||le(e,!0);else{const r=d.length;let o=r===0;if(!o){const f=e.l,u=e.block,c=(n&L)!==0;let i,s,l,_=r;for(;;){if(i=d[--_],s=i.l,s<=f){_+1===r?o=!0:(l=(i.f&L)!==0,(s<f||i.block!==u||l&&!c)&&_++,d.splice(_,0,e));break}if(_===0){d.unshift(e);break}}}o&&d.push(e)}}function Ae(e){const t=[];for(let n=0;n<d.length;n++){const r=d[n];r.f&L&&r.ctx===e&&(t.push(r),d.splice(n,1),n--)}C(t)}function Ce(e){V(e)}function V(e,t=!0){const n=q,r=d,o=x;let f;try{ce();const u=[],c=[];q=Te,d=u,x=c,t&&(C(r),C(o)),e!==void 0&&(f=e()),(d.length>0||c.length>0)&&Ce(),k=0}finally{q=n,d=r,x=o}return f}function le(e,t){const n=e.effects;if(n!==null)for(var r=0;r<n.length;r++)Oe(n[r],t)}function Oe(e,t){const n=e.f;(n&U)!==0!==t&&(e.f^=U,!t&&!(n&w)&&Y(e,!1)),le(e,t)}function ue(e,t,n){var r=e.reactions;if(r!==null)for(var o=ge(),f=r.length,u=0;u<f;u++){var c=r[u];if(!((!n||!o)&&c===S)){var i=c.f;m(c,t);var s=(i&A)!==0,l=(i&O)!==0;(i&w||s&&l)&&(c.f&ve?ue(c,A,n):Y(c,!1))}}}const De=~(T|A|w);function m(e,t){e.f=e.f&De|t}function Re(e,t=!1,n){h={x:null,c:null,e:null,m:!1,p:h,d:null,s:e,r:t,l1:[],l2:Ee(!1),u:null},h.function=n}function $e(e){const t=h;if(t!==null){e!==void 0&&(t.x=e);const n=t.e;if(n!==null){t.e=null;for(let r=0;r<n.length;r++)Y(n[r],!1)}h=t.p,t.m=!0}return e||{}}{let e=function(t){t in globalThis||(globalThis[t]=()=>{throw new Error(`${t} is only available inside .svelte and .svelte.js/ts files`)})};e("$state"),e("$effect"),e("$derived"),e("$inspect"),e("$props")}var y,$,G;function ie(){y===void 0&&(y=Node.prototype,$=Element.prototype,G=Text.prototype,y.appendChild,y.cloneNode,$.__click=void 0,G.__nodeValue=" ",$.__className="",R(y,"firstChild").get,R(y,"nextSibling").get,R(y,"textContent").set,R($,"className").set)}function j(){return document.createTextNode("")}function qe(e,t=!1){const n=[];let r=e,o=null;for(;r!==null;){const f=r.nodeType,u=r.nextSibling;if(f===8){const c=r.data;if(c.startsWith("ssr:")){const i=c.slice(4);if(o===null)o=i;else if(i===o){if(t&&n.length===0){const s=j();n.push(s),r.parentNode.insertBefore(s,r)}return n}else n.push(r);r=u;continue}}o!==null&&n.push(r),r=u}return null}function ae(e){var t=e;if(Z(e))for(var n=0,r;n<e.length;n++)r=e[n],n===0&&(t=r),r.isConnected&&r.remove();else e.isConnected&&e.remove();return t}const z=["touchstart","touchmove","touchend"],Le=new Set,J=new Set;function _e(e,t){ie();const n=j();return t.target.appendChild(n),V(()=>de(e,{...t,anchor:n}),!1)}function Me(e,t){ie();const n=t.target,r=n.firstChild,o=qe(r,!0);let f=null;o===null&&(f=j(),n.appendChild(f));let u=!1;try{return V(()=>{const c=de(e,{...t,anchor:f});return u=!0,c},!1)}catch(c){if(!u&&t.recover!==!1&&o!==null)return console.error("ERR_SVELTE_HYDRATION_MISMATCH: Hydration failed because the initial UI does not match what was rendered on the server.",c),ae(o),r.remove(),o[o.length-1]?.nextSibling?.remove(),_e(e,t);throw c}finally{}}function de(e,t){const n=new Set,r=t.target,o={d:null,e:null,i:t.intro||!1,p:null,r:null,t:ye};let f;const u=xe(()=>{t.context&&(Re({}),h.c=t.context),t.props||(t.props={}),t.events&&(t.props.$$events=t.events),f=e(t.anchor,t.props)||{},t.context&&$e()},o,!0);o.e=u;const c=Q.bind(null,r),i=Q.bind(null,document),s=l=>{for(let _=0;_<l.length;_++){const a=l[_];n.has(a)||(n.add(a),r.addEventListener(a,c,z.includes(a)?{passive:!0}:void 0),document.addEventListener(a,i,z.includes(a)?{passive:!0}:void 0))}};return s(he(Le)),J.add(s),pe.set(f,()=>{for(const _ of n)r.removeEventListener(_,c);J.delete(s);const l=o.d;l!==null&&ae(l),te(o.e)}),f}let pe=new WeakMap;function Fe(e){const t=pe.get(e);t||console.warn("Tried to unmount a component that was not mounted."),t?.()}function Q(e,t){var n=e.ownerDocument,r=t.type,o=t.composedPath?.()||[],f=o[0]||t.target;t.target!==f&&W(t,"target",{configurable:!0,value:f});var u=0,c=t.__root;if(c){var i=o.indexOf(c);if(i!==-1&&(e===document||e===window)){t.__root=e;return}var s=o.indexOf(e);if(s===-1)return;i<=s&&(u=i+1)}for(f=o[u]||t.target,W(t,"currentTarget",{configurable:!0,get(){return f||n}});f!==null;){var l=f.parentNode||f.host||null,_="__"+r,a=f[_];if(a!==void 0&&!f.disabled)if(Z(a)){var[K,...D]=a;K.apply(f,[t,...D])}else a.call(f,t);if(t.cancelBubble||l===e||f===e)break;f=l}t.__root=e,f=e}const Ie=Symbol.for("svelte.snippet");function Pe(e){return e[Ie]=!0,e}const Ye=Pe,He=e=>async(t,n,r,{client:o})=>{if(!e.hasAttribute("ssr"))return;let f,u;for(const[s,l]of Object.entries(r))s==="default"?f=X(s,l):(u??={},u[s]=X(s,l));const i=(o!=="only"?Me:_e)(t,{target:e,props:{...n,children:f,$$slots:u}});e.addEventListener("astro:unmount",()=>Fe(i),{once:!0})};function X(e,t){return Ye((r,o)=>{const f=r.parentNode,u=document.createElement("div");u.innerHTML=`<astro-slot${e==="default"?"":` name="${e}"`}>${t}</astro-slot>`,f.insertBefore(u.children[0],r)})}export{He as default};
