import{r as c}from"./react-86a4a8f4.js";import{j as f}from"./@mui-0a4b53b8.js";import"./dom-helpers-4ed993c7.js";import"./react-dom-28705306.js";function m(n){var t=c.useRef(n);return c.useEffect(function(){t.current=n},[n]),t}function w(n){var t=m(n);return c.useCallback(function(){return t.current&&t.current.apply(t,arguments)},[t])}const D=["as","disabled"];function K(n,t){if(n==null)return{};var e={},r=Object.keys(n),o,u;for(u=0;u<r.length;u++)o=r[u],!(t.indexOf(o)>=0)&&(e[o]=n[o]);return e}function v(n){return!n||n.trim()==="#"}function p({tagName:n,disabled:t,href:e,target:r,rel:o,role:u,onClick:i,tabIndex:y=0,type:b}){n||(e!=null||r!=null||o!=null?n="a":n="button");const a={tagName:n};if(n==="button")return[{type:b||"button",disabled:t},a];const l=s=>{if((t||n==="a"&&v(e))&&s.preventDefault(),t){s.stopPropagation();return}i==null||i(s)},j=s=>{s.key===" "&&(s.preventDefault(),l(s))};return n==="a"&&(e||(e="#"),t&&(e=void 0)),[{role:u??"button",disabled:void 0,tabIndex:t?void 0:y,href:e,target:n==="a"?r:void 0,"aria-disabled":t||void 0,rel:n==="a"?o:void 0,onClick:l,onKeyDown:j},a]}const O=c.forwardRef((n,t)=>{let{as:e,disabled:r}=n,o=K(n,D);const[u,{tagName:i}]=p(Object.assign({tagName:e,disabled:r},o));return f(i,Object.assign({},o,u,{ref:t}))});O.displayName="Button";const k=["onKeyDown"];function x(n,t){if(n==null)return{};var e={},r=Object.keys(n),o,u;for(u=0;u<r.length;u++)o=r[u],!(t.indexOf(o)>=0)&&(e[o]=n[o]);return e}function P(n){return!n||n.trim()==="#"}const d=c.forwardRef((n,t)=>{let{onKeyDown:e}=n,r=x(n,k);const[o]=p(Object.assign({tagName:"a"},r)),u=w(i=>{o.onKeyDown(i),e==null||e(i)});return P(r.href)||r.role==="button"?f("a",Object.assign({ref:t},r,o,{onKeyDown:u})):f("a",Object.assign({ref:t},r,{onKeyDown:e}))});d.displayName="Anchor";const R=d;export{R as A};