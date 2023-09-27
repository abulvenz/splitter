var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};function t(e){return e&&e.__esModule?e.default:e}var n={},r={},o=e.parcelRequire94c2;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},e.parcelRequire94c2=o),o.register("dBs8J",function(e,t){function n(e,t,n,r,o,i){return{tag:e,key:t,attrs:n,children:r,text:o,dom:i,domSize:void 0,state:void 0,events:void 0,instance:void 0}}n.normalize=function(e){return Array.isArray(e)?n("[",void 0,void 0,n.normalizeChildren(e),void 0,void 0):null==e||"boolean"==typeof e?null:"object"==typeof e?e:n("#",void 0,void 0,String(e),void 0,void 0)},n.normalizeChildren=function(e){var t=[];if(e.length){// Note: this is a *very* perf-sensitive check.
// Fun fact: merging the loop like this is somehow faster than splitting
// it, noticeably so.
for(var r=null!=e[0]&&null!=e[0].key,o=1;o<e.length;o++)if((null!=e[o]&&null!=e[o].key)!==r)throw TypeError("Vnodes must either always have keys or never have keys!");for(var o=0;o<e.length;o++)t[o]=n.normalize(e[o])}return t},e.exports=n}),o.register("e2F9W",function(e,t){var n=o("dBs8J");e.exports=function(e){return null==e&&(e=""),n("<",void 0,void 0,e,void 0,void 0)}}),o.register("7PZrX",function(e,t){var n=o("dBs8J"),r=o("5sRXF");e.exports=function(){var e=r.apply(0,arguments);return e.tag="[",e.children=n.normalizeChildren(e.children),e}}),o.register("5sRXF",function(e,t){var n=o("dBs8J");// Call via `hyperscriptVnode.apply(startOffset, arguments)`
//
// The reason I do it this way, forwarding the arguments and passing the start
// offset in `this`, is so I don't have to create a temporary array in a
// performance-critical path.
//
// In native ES6, I'd instead add a final `...args` parameter to the
// `hyperscript` and `fragment` factories and define this as
// `hyperscriptVnode(...args)`, since modern engines do optimize that away. But
// ES5 (what Mithril requires thanks to IE support) doesn't give me that luxury,
// and engines aren't nearly intelligent enough to do either of these:
//
// 1. Elide the allocation for `[].slice.call(arguments, 1)` when it's passed to
//    another function only to be indexed.
// 2. Elide an `arguments` allocation when it's passed to any function other
//    than `Function.prototype.apply` or `Reflect.apply`.
//
// In ES6, it'd probably look closer to this (I'd need to profile it, though):
// module.exports = function(attrs, ...children) {
//     if (attrs == null || typeof attrs === "object" && attrs.tag == null && !Array.isArray(attrs)) {
//         if (children.length === 1 && Array.isArray(children[0])) children = children[0]
//     } else {
//         children = children.length === 0 && Array.isArray(attrs) ? attrs : [attrs, ...children]
//         attrs = undefined
//     }
//
//     if (attrs == null) attrs = {}
//     return Vnode("", attrs.key, attrs, children)
// }
e.exports=function(){var e,t=arguments[this],r=this+1;if(null==t?t={}:("object"!=typeof t||null!=t.tag||Array.isArray(t))&&(t={},r=this),arguments.length===r+1)e=arguments[r],Array.isArray(e)||(e=[e]);else for(e=[];r<arguments.length;)e.push(arguments[r++]);return n("",t.key,t,e)}}),o.register("k7iQv",function(e,t){/** @constructor */var n=function(e){if(!(this instanceof n))throw Error("Promise must be called with `new`");if("function"!=typeof e)throw TypeError("executor must be a function");var t=this,r=[],o=[],i=u(r,!0),a=u(o,!1),l=t._instance={resolvers:r,rejectors:o},s="function"==typeof setImmediate?setImmediate:setTimeout;function u(e,n){return function i(u){var d;try{if(n&&null!=u&&("object"==typeof u||"function"==typeof u)&&"function"==typeof(d=u.then)){if(u===t)throw TypeError("Promise can't be resolved w/ itself");c(d.bind(u))}else s(function(){n||0!==e.length||console.error("Possible unhandled promise rejection:",u);for(var t=0;t<e.length;t++)e[t](u);r.length=0,o.length=0,l.state=n,l.retry=function(){i(u)}})}catch(e){a(e)}}}function c(e){var t=0;function n(e){return function(n){t++>0||e(n)}}var r=n(a);try{e(n(i),r)}catch(e){r(e)}}c(e)};n.prototype.then=function(e,t){var r,o,i=this._instance;function a(e,t,n,a){t.push(function(t){if("function"!=typeof e)n(t);else try{r(e(t))}catch(e){o&&o(e)}}),"function"==typeof i.retry&&a===i.state&&i.retry()}var l=new n(function(e,t){r=e,o=t});return a(e,i.resolvers,r,!0),a(t,i.rejectors,o,!1),l},n.prototype.catch=function(e){return this.then(null,e)},n.prototype.finally=function(e){return this.then(function(t){return n.resolve(e()).then(function(){return t})},function(t){return n.resolve(e()).then(function(){return n.reject(t)})})},n.resolve=function(e){return e instanceof n?e:new n(function(t){t(e)})},n.reject=function(e){return new n(function(t,n){n(e)})},n.all=function(e){return new n(function(t,n){var r=e.length,o=0,i=[];if(0===e.length)t([]);else for(var a=0;a<e.length;a++)!function(a){function l(e){o++,i[a]=e,o===r&&t(i)}null!=e[a]&&("object"==typeof e[a]||"function"==typeof e[a])&&"function"==typeof e[a].then?e[a].then(l,n):l(e[a])}(a)})},n.race=function(e){return new n(function(t,n){for(var r=0;r<e.length;r++)e[r].then(t,n)})},e.exports=n}),o.register("j25vk",function(e,t){e.exports=o("6JDlc")(window)}),o.register("6JDlc",function(e,t){var n=o("dBs8J");e.exports=function(e){var t,r=e&&e.document,o={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"};function i(e){return e.attrs&&e.attrs.xmlns||o[e.tag]}//sanity check to discourage people from doing `vnode.state = ...`
function a(e,t){if(e.state!==t)throw Error("`vnode.state` must not be modified")}//Note: the hook is passed as the `this` argument to allow proxying the
//arguments without requiring a full array allocation to do so. It also
//takes advantage of the fact the current `vnode` is the first argument in
//all lifecycle methods.
function l(e){var t=e.state;try{return this.apply(t,arguments)}finally{a(e,t)}}// IE11 (at least) throws an UnspecifiedError when accessing document.activeElement when
// inside an iframe. Catch and swallow this error, and heavy-handidly return null.
function s(){try{return r.activeElement}catch(e){return null}}//create
function u(e,t,n,r,o,i,a){for(var l=n;l<r;l++){var s=t[l];null!=s&&c(e,s,o,a,i)}}function c(e,t,o,a,s){var d=t.tag;if("string"==typeof d)switch(t.state={},null!=t.attrs&&_(t.attrs,t,o),d){case"#":t.dom=r.createTextNode(t.children),y(e,t.dom,s);break;case"<":f(e,t,a,s);break;case"[":(function(e,t,n,o,i){var a=r.createDocumentFragment();if(null!=t.children){var l=t.children;u(a,l,0,l.length,n,null,o)}t.dom=a.firstChild,t.domSize=a.childNodes.length,y(e,a,i)})(e,t,o,a,s);break;default:(function(e,t,o,a,l){var s=t.tag,c=t.attrs,d=c&&c.is,f=(a=i(t)||a)?d?r.createElementNS(a,s,{is:d}):r.createElementNS(a,s):d?r.createElement(s,{is:d}):r.createElement(s);if(t.dom=f,null!=c&&//attrs
function(e,t,n){for(var r in t)j(e,r,null,t[r],n)}(t,c,a),y(e,f,l),!b(t)&&(null!=t.text&&(""!==t.text?f.textContent=t.text:t.children=[n("#",void 0,void 0,t.text,void 0,void 0)]),null!=t.children)){var m=t.children;u(f,m,0,m.length,o,null,a),"select"===t.tag&&null!=c&&function(e,t){if("value"in t){if(null===t.value)-1!==e.dom.selectedIndex&&(e.dom.value=null);else{var n=""+t.value// eslint-disable-line no-implicit-coercion
;(e.dom.value!==n||-1===e.dom.selectedIndex)&&(e.dom.value=n)}}"selectedIndex"in t&&j(e,"selectedIndex",null,t.selectedIndex,void 0)}(t,c)}})(e,t,o,a,s)}else(function(e,t){var r;if("function"==typeof e.tag.view){if(e.state=Object.create(e.tag),null!=(r=e.state.view).$$reentrantLock$$)return;r.$$reentrantLock$$=!0}else{if(e.state=void 0,null!=(r=e.tag).$$reentrantLock$$)return;r.$$reentrantLock$$=!0,e.state=null!=e.tag.prototype&&"function"==typeof e.tag.prototype.view?new e.tag(e):e.tag(e)}if(_(e.state,e,t),null!=e.attrs&&_(e.attrs,e,t),e.instance=n.normalize(l.call(e.state.view,e)),e.instance===e)throw Error("A view cannot return the vnode it received as argument");r.$$reentrantLock$$=null})(t,o),null!=t.instance?(c(e,t.instance,o,a,s),t.dom=t.instance.dom,t.domSize=null!=t.dom?t.instance.domSize:0):t.domSize=0}var d={caption:"table",thead:"table",tbody:"table",tfoot:"table",tr:"tbody",th:"tr",td:"tr",colgroup:"table",col:"colgroup"};function f(e,t,n,o){var i,a=t.children.match(/^\s*?<(\w+)/im)||[],l=r.createElement(d[a[1]]||"div");"http://www.w3.org/2000/svg"===n?(l.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+t.children+"</svg>",l=l.firstChild):l.innerHTML=t.children,t.dom=l.firstChild,t.domSize=l.childNodes.length,// Capture nodes to remove, so we don't confuse them.
t.instance=[];for(var s=r.createDocumentFragment();i=l.firstChild;)t.instance.push(i),s.appendChild(i);y(e,s,o)}//update
/**
	 * @param {Element|Fragment} parent - the parent element
	 * @param {Vnode[] | null} old - the list of vnodes of the last `render()` call for
	 *                               this part of the tree
	 * @param {Vnode[] | null} vnodes - as above, but for the current `render()` call.
	 * @param {Function[]} hooks - an accumulator of post-render hooks (oncreate/onupdate)
	 * @param {Element | null} nextSibling - the next DOM node if we're dealing with a
	 *                                       fragment that is not the last item in its
	 *                                       parent
	 * @param {'svg' | 'math' | String | null} ns) - the current XML namespace, if any
	 * @returns void
	 */// This function diffs and patches lists of vnodes, both keyed and unkeyed.
//
// We will:
//
// 1. describe its general structure
// 2. focus on the diff algorithm optimizations
// 3. discuss DOM node operations.
// ## Overview:
//
// The updateNodes() function:
// - deals with trivial cases
// - determines whether the lists are keyed or unkeyed based on the first non-null node
//   of each list.
// - diffs them and patches the DOM if needed (that's the brunt of the code)
// - manages the leftovers: after diffing, are there:
//   - old nodes left to remove?
// 	 - new nodes to insert?
// 	 deal with them!
//
// The lists are only iterated over once, with an exception for the nodes in `old` that
// are visited in the fourth part of the diff and in the `removeNodes` loop.
// ## Diffing
//
// Reading https://github.com/localvoid/ivi/blob/ddc09d06abaef45248e6133f7040d00d3c6be853/packages/ivi/src/vdom/implementation.ts#L617-L837
// may be good for context on longest increasing subsequence-based logic for moving nodes.
//
// In order to diff keyed lists, one has to
//
// 1) match nodes in both lists, per key, and update them accordingly
// 2) create the nodes present in the new list, but absent in the old one
// 3) remove the nodes present in the old list, but absent in the new one
// 4) figure out what nodes in 1) to move in order to minimize the DOM operations.
//
// To achieve 1) one can create a dictionary of keys => index (for the old list), then iterate
// over the new list and for each new vnode, find the corresponding vnode in the old list using
// the map.
// 2) is achieved in the same step: if a new node has no corresponding entry in the map, it is new
// and must be created.
// For the removals, we actually remove the nodes that have been updated from the old list.
// The nodes that remain in that list after 1) and 2) have been performed can be safely removed.
// The fourth step is a bit more complex and relies on the longest increasing subsequence (LIS)
// algorithm.
//
// the longest increasing subsequence is the list of nodes that can remain in place. Imagine going
// from `1,2,3,4,5` to `4,5,1,2,3` where the numbers are not necessarily the keys, but the indices
// corresponding to the keyed nodes in the old list (keyed nodes `e,d,c,b,a` => `b,a,e,d,c` would
//  match the above lists, for example).
//
// In there are two increasing subsequences: `4,5` and `1,2,3`, the latter being the longest. We
// can update those nodes without moving them, and only call `insertNode` on `4` and `5`.
//
// @localvoid adapted the algo to also support node deletions and insertions (the `lis` is actually
// the longest increasing subsequence *of old nodes still present in the new list*).
//
// It is a general algorithm that is fireproof in all circumstances, but it requires the allocation
// and the construction of a `key => oldIndex` map, and three arrays (one with `newIndex => oldIndex`,
// the `LIS` and a temporary one to create the LIS).
//
// So we cheat where we can: if the tails of the lists are identical, they are guaranteed to be part of
// the LIS and can be updated without moving them.
//
// If two nodes are swapped, they are guaranteed not to be part of the LIS, and must be moved (with
// the exception of the last node if the list is fully reversed).
//
// ## Finding the next sibling.
//
// `updateNode()` and `createNode()` expect a nextSibling parameter to perform DOM operations.
// When the list is being traversed top-down, at any index, the DOM nodes up to the previous
// vnode reflect the content of the new list, whereas the rest of the DOM nodes reflect the old
// list. The next sibling must be looked for in the old list using `getNextSibling(... oldStart + 1 ...)`.
//
// In the other scenarios (swaps, upwards traversal, map-based diff),
// the new vnodes list is traversed upwards. The DOM nodes at the bottom of the list reflect the
// bottom part of the new vnodes list, and we can use the `v.dom`  value of the previous node
// as the next sibling (cached in the `nextSibling` variable).
// ## DOM node moves
//
// In most scenarios `updateNode()` and `createNode()` perform the DOM operations. However,
// this is not the case if the node moved (second and fourth part of the diff algo). We move
// the old DOM nodes before updateNode runs because it enables us to use the cached `nextSibling`
// variable rather than fetching it using `getNextSibling()`.
//
// The fourth part of the diff currently inserts nodes unconditionally, leading to issues
// like #1791 and #1999. We need to be smarter about those situations where adjascent old
// nodes remain together in the new list in a way that isn't covered by parts one and
// three of the diff algo.
function m(e,t,n,r,o,i){if(t!==n&&(null!=t||null!=n)){if(null==t||0===t.length)u(e,n,0,n.length,r,o,i);else if(null==n||0===n.length)w(e,t,0,t.length);else{var a=null!=t[0]&&null!=t[0].key,l=null!=n[0]&&null!=n[0].key,s=0,d=0;if(!a)for(;d<t.length&&null==t[d];)d++;if(!l)for(;s<n.length&&null==n[s];)s++;if(null===l&&null==a)return;// both lists are full of nulls
if(a!==l)w(e,t,d,t.length),u(e,n,s,n.length,r,o,i);else if(l){// bottom-up
for(// keyed diff
var f,m,y,b,k,S,E=t.length-1,j=n.length-1;E>=d&&j>=s&&(b=t[E],k=n[j],b.key===k.key);)b!==k&&p(e,b,k,r,o,i),null!=k.dom&&(o=k.dom),E--,j--;// top-down
for(;E>=d&&j>=s&&(m=t[d],y=n[s],m.key===y.key);)d++,s++,m!==y&&p(e,m,y,r,v(t,d,o),i);// swaps and list reversals
for(;E>=d&&j>=s&&s!==j&&m.key===k.key&&b.key===y.key;)g(e,b,S=v(t,d,o)),b!==y&&p(e,b,y,r,S,i),++s<=--j&&g(e,m,o),m!==k&&p(e,m,k,r,o,i),null!=k.dom&&(o=k.dom),d++,b=t[--E],k=n[j],m=t[d],y=n[s];// bottom up once again
for(;E>=d&&j>=s&&b.key===k.key;)b!==k&&p(e,b,k,r,o,i),null!=k.dom&&(o=k.dom),E--,j--,b=t[E],k=n[j];if(s>j)w(e,t,d,E+1);else if(d>E)u(e,n,s,j+1,r,o,i);else{// inspired by ivi https://github.com/ivijs/ivi/ by Boris Kaul
var f,z,O=o,T=j-s+1,N=Array(T),C=0,A=0,P=2147483647,I=0;for(A=0;A<T;A++)N[A]=-1;for(A=j;A>=s;A--){null==f&&(f=function(e,t,n){for(var r=Object.create(null);t<n;t++){var o=e[t];if(null!=o){var i=o.key;null!=i&&(r[i]=t)}}return r}(t,d,E+1));var _=f[(k=n[A]).key];null!=_&&(P=_<P?_:-1// becomes -1 if nodes were re-ordered
,N[A-s]=_,b=t[_],t[_]=null,b!==k&&p(e,b,k,r,o,i),null!=k.dom&&(o=k.dom),I++)}if(o=O,I!==E-d+1&&w(e,t,d,E+1),0===I)u(e,n,s,j+1,r,o,i);else if(-1===P)for(C=// the indices of the indices of the items that are part of the
// longest increasing subsequence in the oldIndices list
(z=function(e){for(var t=[0],n=0,r=0,o=0,i=h.length=e.length,o=0;o<i;o++)h[o]=e[o];for(var o=0;o<i;++o)if(-1!==e[o]){var a=t[t.length-1];if(e[a]<e[o]){h[o]=a,t.push(o);continue}for(n=0,r=t.length-1;n<r;){// Fast integer average without overflow.
// eslint-disable-next-line no-bitwise
var l=(n>>>1)+(r>>>1)+(n&r&1);e[t[l]]<e[o]?n=l+1:r=l}e[o]<e[t[n]]&&(n>0&&(h[o]=t[n-1]),t[n]=o)}for(n=t.length,r=t[n-1];n-- >0;)t[n]=r,r=h[r];return h.length=0,t}(N)).length-1,A=j;A>=s;A--)y=n[A],-1===N[A-s]?c(e,y,r,i,o):z[C]===A-s?C--:g(e,y,o),null!=y.dom&&(o=n[A].dom);else for(A=j;A>=s;A--)y=n[A],-1===N[A-s]&&c(e,y,r,i,o),null!=y.dom&&(o=n[A].dom)}}else{// Don't index past the end of either list (causes deopts).
var L=t.length<n.length?t.length:n.length;for(// Rewind if necessary to the first non-null index on either side.
// We could alternatively either explicitly create or remove nodes when `start !== oldStart`
// but that would be optimizing for sparse lists which are more rare than dense ones.
s=s<d?s:d;s<L;s++)(m=t[s])!==(y=n[s])&&(null!=m||null!=y)&&(null==m?c(e,y,r,i,v(t,s+1,o)):null==y?x(e,m):p(e,m,y,r,v(t,s+1,o),i));t.length>L&&w(e,t,s,t.length),n.length>L&&u(e,n,s,n.length,r,o,i)}}}}function p(e,t,r,o,a,u){var d,h,v=t.tag;if(v===r.tag){if(r.state=t.state,r.events=t.events,function(e,t){do{if(null!=e.attrs&&"function"==typeof e.attrs.onbeforeupdate){var n=l.call(e.attrs.onbeforeupdate,e,t);if(void 0!==n&&!n)break}if("string"!=typeof e.tag&&"function"==typeof e.state.onbeforeupdate){var n=l.call(e.state.onbeforeupdate,e,t);if(void 0!==n&&!n)break}return!1}while(!1)// eslint-disable-line no-constant-condition
return e.dom=t.dom,e.domSize=t.domSize,e.instance=t.instance,// One would think having the actual latest attributes would be ideal,
// but it doesn't let us properly diff based on our current internal
// representation. We have to save not only the old DOM info, but also
// the attributes used to create it, as we diff *that*, not against the
// DOM directly (with a few exceptions in `setAttr`). And, of course, we
// need to save the children and text as they are conceptually not
// unlike special "attributes" internally.
e.attrs=t.attrs,e.children=t.children,e.text=t.text,!0}(r,t))return;if("string"==typeof v)switch(null!=r.attrs&&L(r.attrs,r,o),v){case"#":t.children.toString()!==r.children.toString()&&(t.dom.nodeValue=r.children),r.dom=t.dom;break;case"<":t.children!==r.children?(k(e,t),f(e,r,u,a)):(r.dom=t.dom,r.domSize=t.domSize,r.instance=t.instance);break;case"[":(function(e,t,n,r,o,i){m(e,t.children,n.children,r,o,i);var a=0,l=n.children;if(n.dom=null,null!=l){for(var s=0;s<l.length;s++){var u=l[s];null!=u&&null!=u.dom&&(null==n.dom&&(n.dom=u.dom),a+=u.domSize||1)}1!==a&&(n.domSize=a)}})(e,t,r,o,a,u);break;default:d=u,h=r.dom=t.dom,d=i(r)||d,"textarea"===r.tag&&(null==r.attrs&&(r.attrs={}),null!=r.text&&(r.attrs.value=r.text//FIXME handle multiple children
,r.text=void 0)),function(e,t,n,r){var o;if(null!=n)for(var i in n)j(e,i,t&&t[i],n[i],r);if(null!=t)for(var i in t)null!=(o=t[i])&&(null==n||null==n[i])&&function(e,t,n,r){if(!("key"===t||"is"===t||null==n||z(t))){if("o"!==t[0]||"n"!==t[1]||z(t)){if("style"===t)A(e.dom,n,null);else if(O(e,t,r)&&"className"!==t&&("value"!==t||"option"!==e.tag&&("select"!==e.tag||-1!==e.dom.selectedIndex||e.dom!==s()))&&("input"!==e.tag||"type"!==t))e.dom[t]=null;else{var o=t.indexOf(":");-1!==o&&(t=t.slice(o+1)),!1!==n&&e.dom.removeAttribute("className"===t?"class":t)}}else I(e,t,void 0)}}(e,i,o,r)}(r,t.attrs,r.attrs,d),b(r)||(null!=t.text&&null!=r.text&&""!==r.text?t.text.toString()!==r.text.toString()&&(t.dom.firstChild.nodeValue=r.text):(null!=t.text&&(t.children=[n("#",void 0,void 0,t.text,void 0,t.dom.firstChild)]),null!=r.text&&(r.children=[n("#",void 0,void 0,r.text,void 0,void 0)]),m(h,t.children,r.children,o,null,d)))}else(function(e,t,r,o,i,a){if(r.instance=n.normalize(l.call(r.state.view,r)),r.instance===r)throw Error("A view cannot return the vnode it received as argument");L(r.state,r,o),null!=r.attrs&&L(r.attrs,r,o),null!=r.instance?(null==t.instance?c(e,r.instance,o,a,i):p(e,t.instance,r.instance,o,i,a),r.dom=r.instance.dom,r.domSize=r.instance.domSize):null!=t.instance?(x(e,t.instance),r.dom=void 0,r.domSize=0):(r.dom=t.dom,r.domSize=t.domSize)})(e,t,r,o,a,u)}else x(e,t),c(e,r,o,u,a)}// Lifted from ivi https://github.com/ivijs/ivi/
// takes a list of unique numbers (-1 is special and can
// occur multiple times) and returns an array with the indices
// of the items that are part of the longest increasing
// subsequece
var h=[];function v(e,t,n){for(;t<e.length;t++)if(null!=e[t]&&null!=e[t].dom)return e[t].dom;return n}// This covers a really specific edge case:
// - Parent node is keyed and contains child
// - Child is removed, returns unresolved promise in `onbeforeremove`
// - Parent node is moved in keyed diff
// - Remaining children still need moved appropriately
//
// Ideally, I'd track removed nodes as well, but that introduces a lot more
// complexity and I'm not exactly interested in doing that.
function g(e,t,n){var o=r.createDocumentFragment();(function e(t,n,r){// Dodge the recursion overhead in a few of the most common cases.
for(;null!=r.dom&&r.dom.parentNode===t;){if("string"!=typeof r.tag){if(null!=(r=r.instance))continue}else if("<"===r.tag)for(var o=0;o<r.instance.length;o++)n.appendChild(r.instance[o]);else if("["!==r.tag)n.appendChild(r.dom);else if(1===r.children.length){if(null!=(r=r.children[0]))continue}else for(var o=0;o<r.children.length;o++){var i=r.children[o];null!=i&&e(t,n,i)}break}})(e,o,t),y(e,o,n)}function y(e,t,n){null!=n?e.insertBefore(t,n):e.appendChild(t)}function b(e){if(null==e.attrs||null==e.attrs.contenteditable&&// attribute
null// property
==e.attrs.contentEditable)return!1;var t=e.children;if(null!=t&&1===t.length&&"<"===t[0].tag){var n=t[0].children;e.dom.innerHTML!==n&&(e.dom.innerHTML=n)}else if(null!=e.text||null!=t&&0!==t.length)throw Error("Child node of a contenteditable must be trusted");return!0}//remove
function w(e,t,n,r){for(var o=n;o<r;o++){var i=t[o];null!=i&&x(e,i)}}function x(e,t){var n,r,o=0,i=t.state;if("string"!=typeof t.tag&&"function"==typeof t.state.onbeforeremove){var s=l.call(t.state.onbeforeremove,t);null!=s&&"function"==typeof s.then&&(o=1,n=s)}if(t.attrs&&"function"==typeof t.attrs.onbeforeremove){var s=l.call(t.attrs.onbeforeremove,t);null!=s&&"function"==typeof s.then&&(// eslint-disable-next-line no-bitwise
o|=2,r=s)}// If we can, try to fast-path it and avoid all the overhead of awaiting
if(a(t,i),o){if(null!=n){var u=function(){// eslint-disable-next-line no-bitwise
!(1&o)||(o&=2)||c()};n.then(u,u)}if(null!=r){var u=function(){// eslint-disable-next-line no-bitwise
!(2&o)||(o&=1)||c()};r.then(u,u)}}else E(t),S(e,t);function c(){a(t,i),E(t),S(e,t)}}function k(e,t){for(var n=0;n<t.instance.length;n++)e.removeChild(t.instance[n])}function S(e,t){// Dodge the recursion overhead in a few of the most common cases.
for(;null!=t.dom&&t.dom.parentNode===e;){if("string"!=typeof t.tag){if(null!=(t=t.instance))continue}else if("<"===t.tag)k(e,t);else{if("["!==t.tag&&(e.removeChild(t.dom),!Array.isArray(t.children)))break;if(1===t.children.length){if(null!=(t=t.children[0]))continue}else for(var n=0;n<t.children.length;n++){var r=t.children[n];null!=r&&S(e,r)}}break}}function E(e){if("string"!=typeof e.tag&&"function"==typeof e.state.onremove&&l.call(e.state.onremove,e),e.attrs&&"function"==typeof e.attrs.onremove&&l.call(e.attrs.onremove,e),"string"!=typeof e.tag)null!=e.instance&&E(e.instance);else{var t=e.children;if(Array.isArray(t))for(var n=0;n<t.length;n++){var r=t[n];null!=r&&E(r)}}}function j(e,t,n,o,i){if(!("key"===t||"is"===t||null==o||z(t))&&(n!==o||"value"===t||"checked"===t||"selectedIndex"===t||"selected"===t&&e.dom===s()||"option"===e.tag&&e.dom.parentNode===r.activeElement||"object"==typeof o)){if("o"===t[0]&&"n"===t[1])return I(e,t,o);if("xlink:"===t.slice(0,6))e.dom.setAttributeNS("http://www.w3.org/1999/xlink",t.slice(6),o);else if("style"===t)A(e.dom,n,o);else if(O(e,t,i)){if("value"===t&&(("input"===e.tag||"textarea"===e.tag)&&e.dom.value===""+o&&e.dom===s()||"select"===e.tag&&null!==n&&e.dom.value===""+o||"option"===e.tag&&null!==n&&e.dom.value===""+o))return;// If you assign an input type that is not supported by IE 11 with an assignment expression, an error will occur.
"input"===e.tag&&"type"===t?e.dom.setAttribute(t,o):e.dom[t]=o}else"boolean"==typeof o?o?e.dom.setAttribute(t,""):e.dom.removeAttribute(t):e.dom.setAttribute("className"===t?"class":t,o)}}function z(e){return"oninit"===e||"oncreate"===e||"onupdate"===e||"onremove"===e||"onbeforeremove"===e||"onbeforeupdate"===e}function O(e,t,n){// Filter out namespaced keys
return void 0===n&&// If it's a custom element, just keep it.
(e.tag.indexOf("-")>-1||null!=e.attrs&&e.attrs.is||// If it's a normal element, let's try to avoid a few browser bugs.
"href"!==t&&"list"!==t&&"form"!==t&&"width"!==t&&"height"// && key !== "type"
!==t)&&t in e.dom}//style
var T=/[A-Z]/g;function N(e){return"-"+e.toLowerCase()}function C(e){return"-"===e[0]&&"-"===e[1]?e:"cssFloat"===e?"float":e.replace(T,N)}function A(e,t,n){if(t===n);else if(null==n)e.style.cssText="";else if("object"!=typeof n)e.style.cssText=n;else if(null==t||"object"!=typeof t)// Add new style properties
for(var r in // `old` is missing or a string, `style` is an object.
e.style.cssText="",n){var o=n[r];null!=o&&e.style.setProperty(C(r),String(o))}else{// Both old & new are (different) objects.
// Update style properties that have changed
for(var r in n){var o=n[r];null!=o&&(o=String(o))!==String(t[r])&&e.style.setProperty(C(r),o)}// Remove style properties that no longer exist
for(var r in t)null!=t[r]&&null==n[r]&&e.style.removeProperty(C(r))}}// Here's an explanation of how this works:
// 1. The event names are always (by design) prefixed by `on`.
// 2. The EventListener interface accepts either a function or an object
//    with a `handleEvent` method.
// 3. The object does not inherit from `Object.prototype`, to avoid
//    any potential interference with that (e.g. setters).
// 4. The event name is remapped to the handler before calling it.
// 5. In function-based event handlers, `ev.target === this`. We replicate
//    that below.
// 6. In function-based event handlers, `return false` prevents the default
//    action and stops event propagation. We replicate that below.
function P(){// Save this, so the current redraw is correctly tracked.
this._=t}//event
function I(e,t,n){null!=e.events?e.events[t]!==n&&(null!=n&&("function"==typeof n||"object"==typeof n)?(null==e.events[t]&&e.dom.addEventListener(t.slice(2),e.events,!1),e.events[t]=n):(null!=e.events[t]&&e.dom.removeEventListener(t.slice(2),e.events,!1),e.events[t]=void 0)):null!=n&&("function"==typeof n||"object"==typeof n)&&(e.events=new P,e.dom.addEventListener(t.slice(2),e.events,!1),e.events[t]=n)}//lifecycle
function _(e,t,n){"function"==typeof e.oninit&&l.call(e.oninit,t),"function"==typeof e.oncreate&&n.push(l.bind(e.oncreate,t))}function L(e,t,n){"function"==typeof e.onupdate&&n.push(l.bind(e.onupdate,t))}return P.prototype=Object.create(null),P.prototype.handleEvent=function(e){var t,n=this["on"+e.type];"function"==typeof n?t=n.call(e.currentTarget,e):"function"==typeof n.handleEvent&&n.handleEvent(e),this._&&!1!==e.redraw&&(0,this._)(),!1===t&&(e.preventDefault(),e.stopPropagation())},function(e,r,o){if(!e)throw TypeError("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.");var i=[],a=s(),l=e.namespaceURI;null==e.vnodes&&(e.textContent=""),r=n.normalizeChildren(Array.isArray(r)?r:[r]);var u=t;try{t="function"==typeof o?o:void 0,m(e,e.vnodes,r,i,null,"http://www.w3.org/1999/xhtml"===l?void 0:l)}finally{t=u}e.vnodes=r,null!=a&&s()!==a&&"function"==typeof a.focus&&a.focus();for(var c=0;c<i.length;c++)i[c]()}}}),o.register("iZais",function(e,t){var n=o("dBs8J");e.exports=function(e,t,r){var o=[],i=!1,a=!1;function l(){if(i)throw Error("Nested m.redraw.sync() call");i=!0;for(var t=0;t<o.length;t+=2)try{e(o[t],n(o[t+1]),s)}catch(e){r.error(e)}i=!1}function s(){a||(a=!0,t(function(){a=!1,l()}))}return s.sync=l,{mount:function(t,r){if(null!=r&&null==r.view&&"function"!=typeof r)throw TypeError("m.mount(element, component) expects a component, not a vnode");var i=o.indexOf(t);i>=0&&(o.splice(i,2),e(t,[],s)),null!=r&&(o.push(t,r),e(t,n(r),s))},redraw:s}}}),o.register("5y2KI",function(e,t){var n=o("cITMw");e.exports=function(e,t,r){var o=0;function i(e){return new t(e)}function a(e){return function(o,a){"string"!=typeof o?(a=o,o=o.url):null==a&&(a={});var l=new t(function(t,r){e(n(o,a.params),a,function(e){if("function"==typeof a.type){if(Array.isArray(e))for(var n=0;n<e.length;n++)e[n]=new a.type(e[n]);else e=new a.type(e)}t(e)},r)});if(!0===a.background)return l;var s=0;function u(){0==--s&&"function"==typeof r&&r()}return function e(t){var n=t.then;return(// Set the constructor, so engines know to not await or resolve
// this as a native promise. At the time of writing, this is
// only necessary for V8, but their behavior is the correct
// behavior per spec. See this spec issue for more details:
// https://github.com/tc39/ecma262/issues/1577. Also, see the
// corresponding comment in `request/tests/test-request.js` for
// a bit more background on the issue at hand.
t.constructor=i,t.then=function(){s++;var r=n.apply(t,arguments);return r.then(u,function(e){if(u(),0===s)throw e}),e(r)},t)}(l)}}function l(e,t){for(var n in e.headers)if(({}).hasOwnProperty.call(e.headers,n)&&t.test(n))return!0;return!1}return(// In case the global Promise is some userland library's where they rely on
// `foo instanceof this.constructor`, `this.constructor.resolve(value)`, or
// similar. Let's *not* break them.
i.prototype=t.prototype,i.__proto__=t// eslint-disable-line no-proto
,{request:a(function(t,n,r,o){var i,a=null!=n.method?n.method.toUpperCase():"GET",s=n.body,u=(null==n.serialize||n.serialize===JSON.serialize)&&!(s instanceof e.FormData),c=n.responseType||("function"==typeof n.extract?"":"json"),d=new e.XMLHttpRequest,f=!1,m=d,p=d.abort;for(var h in d.abort=function(){f=!0,p.call(this)},d.open(a,t,!1!==n.async,"string"==typeof n.user?n.user:void 0,"string"==typeof n.password?n.password:void 0),u&&null!=s&&!l(n,/^content-type$/i)&&d.setRequestHeader("Content-Type","application/json; charset=utf-8"),"function"==typeof n.deserialize||l(n,/^accept$/i)||d.setRequestHeader("Accept","application/json, text/*"),n.withCredentials&&(d.withCredentials=n.withCredentials),n.timeout&&(d.timeout=n.timeout),d.responseType=c,n.headers)({}).hasOwnProperty.call(n.headers,h)&&d.setRequestHeader(h,n.headers[h]);d.onreadystatechange=function(e){// Don't throw errors on xhr.abort().
if(!f&&4===e.target.readyState)try{var i,a=e.target.status>=200&&e.target.status<300||304===e.target.status||/^file:\/\//i.test(t),l=e.target.response;if("json"===c?e.target.responseType||"function"==typeof n.extract||(l=JSON.parse(e.target.responseText)):c&&"text"!==c||null!=l||(l=e.target.responseText),"function"==typeof n.extract?(l=n.extract(e.target,n),a=!0):"function"==typeof n.deserialize&&(l=n.deserialize(l)),a)r(l);else{try{i=e.target.responseText}catch(e){i=l}var s=Error(i);s.code=e.target.status,s.response=l,o(s)}}catch(e){o(e)}},"function"==typeof n.config&&(d=n.config(d,n,t)||d)!==m&&(i=d.abort,d.abort=function(){f=!0,i.call(this)}),null==s?d.send():"function"==typeof n.serialize?d.send(n.serialize(s)):s instanceof e.FormData?d.send(s):d.send(JSON.stringify(s))}),jsonp:a(function(t,n,r,i){var a=n.callbackName||"_mithril_"+Math.round(1e16*Math.random())+"_"+o++,l=e.document.createElement("script");e[a]=function(t){delete e[a],l.parentNode.removeChild(l),r(t)},l.onerror=function(){delete e[a],l.parentNode.removeChild(l),i(Error("JSONP request failed"))},l.src=t+(0>t.indexOf("?")?"?":"&")+encodeURIComponent(n.callbackKey||"callback")+"="+encodeURIComponent(a),e.document.documentElement.appendChild(l)})})}}),o.register("cITMw",function(e,t){var n=o("iRA82"),r=o("jN4Zp");// Returns `path` from `template` + `params`
e.exports=function(e,t){if(/:([^\/\.-]+)(\.{3})?:/.test(e))throw SyntaxError("Template parameter names *must* be separated");if(null==t)return e;var o=e.indexOf("?"),i=e.indexOf("#"),a=i<0?e.length:i,l=o<0?a:o,s=e.slice(0,l),u={};r(u,t);var c=s.replace(/:([^\/\.-]+)(\.{3})?/g,function(e,n,r){return(// If no such parameter exists, don't interpolate it.
(delete u[n],null==t[n])?e:r?t[n]:encodeURIComponent(String(t[n])))}),d=c.indexOf("?"),f=c.indexOf("#"),m=f<0?c.length:f,p=d<0?m:d,h=c.slice(0,p);o>=0&&(h+=e.slice(o,a)),d>=0&&(h+=(o<0?"?":"&")+c.slice(d,m));var v=n(u);return v&&(h+=(o<0&&d<0?"?":"&")+v),i>=0&&(h+=e.slice(i)),f>=0&&(h+=(i<0?"":"&")+c.slice(f)),h}}),o.register("iRA82",function(e,t){e.exports=function(e){if("[object Object]"!==Object.prototype.toString.call(e))return"";var t=[];for(var n in e)(function e(n,r){if(Array.isArray(r))for(var o=0;o<r.length;o++)e(n+"["+o+"]",r[o]);else if("[object Object]"===Object.prototype.toString.call(r))for(var o in r)e(n+"["+o+"]",r[o]);else t.push(encodeURIComponent(n)+(null!=r&&""!==r?"="+encodeURIComponent(r):""))})(n,e[n]);return t.join("&")}}),o.register("jN4Zp",function(e,t){e.exports=Object.assign||function(e,t){t&&Object.keys(t).forEach(function(n){e[n]=t[n]})}}),o.register("4Ppi2",function(e,t){var n=o("7EF0O");e.exports=o("eFHZ8")(window,n)}),o.register("7EF0O",function(e,t){var n=o("j25vk");e.exports=o("iZais")(n,requestAnimationFrame,console)}),o.register("eFHZ8",function(e,t){var n=o("dBs8J"),r=o("iVcuU"),i=o("2uPnQ"),a=o("cITMw"),l=o("7lWrV"),s=o("8KlxE"),u=o("jN4Zp"),c={};e.exports=function(e,t){function o(t,n,r){if(t=a(t,n),null!=d){d();var o=r?r.state:null,i=r?r.title:null;r&&r.replace?e.history.replaceState(o,i,y.prefix+t):e.history.pushState(o,i,y.prefix+t)}else e.location.href=y.prefix+t}var d,f,m,p,h,v=c,g=y.SKIP={};function y(r,a,b){if(null==r)throw Error("Ensure the DOM element that was passed to `m.route` is not undefined");// 0 = start
// 1 = init
// 2 = ready
var w,x=0,k=Object.keys(b).map(function(e){if("/"!==e[0])throw SyntaxError("Routes must start with a `/`");if(/:([^\/\.-]+)(\.{3})?:/.test(e))throw SyntaxError("Route parameter names must be separated with either `/`, `.`, or `-`");return{route:e,component:b[e],check:s(e)}}),S="function"==typeof setImmediate?setImmediate:setTimeout,E=i.resolve(),j=!1;if(d=null,null!=a){var z=l(a);if(!k.some(function(e){return e.check(z)}))throw ReferenceError("Default route doesn't match any known routes")}function O(){j=!1;// Consider the pathname holistically. The prefix might even be invalid,
// but that's not our problem.
var n=e.location.hash;"#"!==y.prefix[0]&&(n=e.location.search+n,"?"!==y.prefix[0]&&"/"!==(n=e.location.pathname+n)[0]&&(n="/"+n));// This seemingly useless `.concat()` speeds up the tests quite a bit,
// since the representation is consistently a relatively poorly
// optimized cons string.
var r=n.concat().replace(/(?:%[a-f89][a-f0-9])+/gim,decodeURIComponent).slice(y.prefix.length),i=l(r);function s(){if(r===a)throw Error("Could not resolve default route "+a);o(a,null,{replace:!0})}u(i.params,e.history.state),function e(n){// 0 = init
// 1 = scheduled
// 2 = done
for(;n<k.length;n++)if(k[n].check(i)){var o=k[n].component,a=k[n].route,l=o,u=h=function(a){if(u===h){if(a===g)return e(n+1);f=null!=a&&("function"==typeof a.view||"function"==typeof a)?a:"div",m=i.params,p=r,h=null,v=o.render?o:null,2===x?t.redraw():(x=2,t.redraw.sync())}};// There's no understating how much I *wish* I could
// use `async`/`await` here...
o.view||"function"==typeof o?(o={},u(l)):o.onmatch?E.then(function(){return o.onmatch(i.params,r,a)}).then(u,s):u("div");return}s()}(0)}return(// Set it unconditionally so `m.route.set` and `m.route.Link` both work,
// even if neither `pushState` nor `hashchange` are supported. It's
// cleared if `hashchange` is used, since that makes it automatically
// async.
d=function(){j||(j=!0,S(O))},"function"==typeof e.history.pushState?(w=function(){e.removeEventListener("popstate",d,!1)},e.addEventListener("popstate",d,!1)):"#"===y.prefix[0]&&(d=null,w=function(){e.removeEventListener("hashchange",O,!1)},e.addEventListener("hashchange",O,!1)),t.mount(r,{onbeforeupdate:function(){return!(!(x=x?2:1)||c===v)},oncreate:O,onremove:w,view:function(){if(x&&c!==v){// Wrap in a fragment to preserve existing key semantics
var e=[n(f,m.key,m)];return v&&(e=v.render(e[0])),e}}}))}return y.set=function(e,t,n){null!=h&&((n=n||{}).replace=!0),h=null,o(e,t,n)},y.get=function(){return p},y.prefix="#!",y.Link={view:function(e){var t,n,o=e.attrs.options,i={};u(i,e.attrs),// The first two are internal, but the rest are magic attributes
// that need censored to not screw up rendering.
i.selector=i.options=i.key=i.oninit=i.oncreate=i.onbeforeupdate=i.onupdate=i.onbeforeremove=i.onremove=null;// Do this now so we can get the most current `href` and `disabled`.
// Those attributes may also be specified in the selector, and we
// should honor that.
var a=r(e.attrs.selector||"a",i,e.children);return(a.attrs.disabled=!!a.attrs.disabled)?(a.attrs.href=null,a.attrs["aria-disabled"]="true",// If you *really* do want to do this on a disabled link, use
// an `oncreate` hook to add it.
a.attrs.onclick=null):(t=a.attrs.onclick,n=a.attrs.href,a.attrs.href=y.prefix+n,a.attrs.onclick=function(e){var r;"function"==typeof t?r=t.call(e.currentTarget,e):null==t||"object"!=typeof t||"function"==typeof t.handleEvent&&t.handleEvent(e),!1===r||e.defaultPrevented||// Ignore everything but left clicks
0!==e.button&&0!==e.which&&1!==e.which||// Let the browser handle `target=_blank`, etc.
e.currentTarget.target&&"_self"!==e.currentTarget.target||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||(e.preventDefault(),e.redraw=!1,y.set(n,null,o))}),a}},y.param=function(e){return m&&null!=e?m[e]:m},y}}),o.register("iVcuU",function(e,t){var n=o("dBs8J"),r=o("5sRXF"),i=/(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g,a={},l={}.hasOwnProperty;function s(e){for(var t in e)if(l.call(e,t))return!1;return!0}e.exports=function(e){if(null==e||"string"!=typeof e&&"function"!=typeof e&&"function"!=typeof e.view)throw Error("The selector must be either a string or a component.");var t=r.apply(1,arguments);return"string"==typeof e&&(t.children=n.normalizeChildren(t.children),"["!==e)?function(e,t){var r=t.attrs,o=n.normalizeChildren(t.children),i=l.call(r,"class"),a=i?r.class:r.className;if(t.tag=e.tag,t.attrs=null,t.children=void 0,!s(e.attrs)&&!s(r)){var u={};for(var c in r)l.call(r,c)&&(u[c]=r[c]);r=u}for(var c in e.attrs)l.call(e.attrs,c)&&"className"!==c&&!l.call(r,c)&&(r[c]=e.attrs[c]);for(var c in(null!=a||null!=e.attrs.className)&&(r.className=null!=a?null!=e.attrs.className?String(e.attrs.className)+" "+String(a):a:null!=e.attrs.className?e.attrs.className:null),i&&(r.class=null),r)if(l.call(r,c)&&"key"!==c){t.attrs=r;break}return Array.isArray(o)&&1===o.length&&null!=o[0]&&"#"===o[0].tag?t.text=o[0].children:t.children=o,t}(a[e]||function(e){for(var t,n="div",r=[],o={};t=i.exec(e);){var l=t[1],s=t[2];if(""===l&&""!==s)n=s;else if("#"===l)o.id=s;else if("."===l)r.push(s);else if("["===t[3][0]){var u=t[6];u&&(u=u.replace(/\\(["'])/g,"$1").replace(/\\\\/g,"\\")),"class"===t[4]?r.push(u):o[t[4]]=""===u?u:u||!0}}return r.length>0&&(o.className=r.join(" ")),a[e]={tag:n,attrs:o}}(e),t):(t.tag=e,t)}}),o.register("2uPnQ",function(t,n){var r=o("k7iQv");"undefined"!=typeof window?(void 0===window.Promise?window.Promise=r:window.Promise.prototype.finally||(window.Promise.prototype.finally=r.prototype.finally),t.exports=window.Promise):void 0!==e?(void 0===e.Promise?e.Promise=r:e.Promise.prototype.finally||(e.Promise.prototype.finally=r.prototype.finally),t.exports=e.Promise):t.exports=r}),o.register("7lWrV",function(e,t){var n=o("gZZfO");// Returns `{path, params}` from `url`
e.exports=function(e){var t=e.indexOf("?"),r=e.indexOf("#"),o=r<0?e.length:r,i=t<0?o:t,a=e.slice(0,i).replace(/\/{2,}/g,"/");return a?("/"!==a[0]&&(a="/"+a),a.length>1&&"/"===a[a.length-1]&&(a=a.slice(0,-1))):a="/",{path:a,params:t<0?{}:n(e.slice(t+1,o))}}}),o.register("gZZfO",function(e,t){e.exports=function(e){if(""===e||null==e)return{};"?"===e.charAt(0)&&(e=e.slice(1));for(var t=e.split("&"),n={},r={},o=0;o<t.length;o++){var i=t[o].split("="),a=decodeURIComponent(i[0]),l=2===i.length?decodeURIComponent(i[1]):"";"true"===l?l=!0:"false"===l&&(l=!1);var s=a.split(/\]\[?|\[/),u=r;a.indexOf("[")>-1&&s.pop();for(var c=0;c<s.length;c++){var d=s[c],f=s[c+1],m=""==f||!isNaN(parseInt(f,10));if(""===d){var a=s.slice(0,c).join();null==n[a]&&(n[a]=Array.isArray(u)?u.length:0),d=n[a]++}else if("__proto__"===d)break;if(c===s.length-1)u[d]=l;else{// Read own properties exclusively to disallow indirect
// prototype pollution
var p=Object.getOwnPropertyDescriptor(u,d);null!=p&&(p=p.value),null==p&&(u[d]=p=m?[]:{}),u=p}}}return r}}),o.register("8KlxE",function(e,t){var n=o("7lWrV");// Compiles a template into a function that takes a resolved path (without query
// strings) and returns an object containing the template parameters with their
// parsed values. This expects the input of the compiled template to be the
// output of `parsePathname`. Note that it does *not* remove query parameters
// specified in the template.
e.exports=function(e){var t=n(e),r=Object.keys(t.params),o=[],i=RegExp("^"+t.path.replace(// `:lang-:locale` in routes. This is all merged into one pass so I
// don't also accidentally escape `-` and make it harder to detect it to
// ban it from template parameters.
/:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g,function(e,t,n){return null==t?"\\"+e:(o.push({k:t,r:"..."===n}),"..."===n)?"(.*)":"."===n?"([^/]+)\\.":"([^/]+)"+(n||"")})+"$");return function(e){// First, check the params. Usually, there isn't any, and it's just
// checking a static set.
for(var n=0;n<r.length;n++)if(t.params[r[n]]!==e.params[r[n]])return!1;// If no interpolations exist, let's skip all the ceremony
if(!o.length)return i.test(e.path);var a=i.exec(e.path);if(null==a)return!1;for(var n=0;n<o.length;n++)e.params[o[n].k]=o[n].r?a[n+1]:decodeURIComponent(a[n+1]);return!0}}});// jshint esversion: 6
var i={},a={},l=o("iVcuU");l.trust=o("e2F9W"),l.fragment=o("7PZrX"),a=l;var s={},u=o("2uPnQ"),c=o("7EF0O");s=o("5y2KI")(window,u,c.redraw);var c=o("7EF0O"),d=function(){return a.apply(this,arguments)};d.m=a,d.trust=a.trust,d.fragment=a.fragment,d.mount=c.mount,d.route=o("4Ppi2"),d.render=o("j25vk"),d.redraw=c.redraw,d.request=s.request,d.jsonp=s.jsonp,d.parseQueryString=o("gZZfO"),d.buildQueryString=o("iRA82"),d.parsePathname=o("7lWrV"),d.buildPathname=o("cITMw"),d.vnode=o("dBs8J"),d.PromisePolyfill=o("k7iQv"),i=d;var f={},m={};function p(){}Object.defineProperty(m,"__esModule",{value:!0,configurable:!0}),Object.defineProperty(m,"default",{get:()=>h,set:void 0,enumerable:!0,configurable:!0});var h=function(e){function t(t){return new Proxy(p,{apply:(n,r,o)=>e(t,[],...o),get:(n,r)=>{let o=[r],i=new Proxy(p,{get:(e,t)=>(o.push(t),i),apply:(n,r,i)=>e(t,o,...i)});return i}})}return new Proxy(e=>t(e),{get:(e,n)=>t(e[n]||n)})},v=m&&m.__esModule?m:{default:m},g=function(e){return e.replace(/([A-Z])/g,function(e){return"-"+e[0].toLowerCase()})};f=function(e){return(0,v.default)(function(t,n){for(var r=arguments.length,o=Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];var a=n.map(g).join("."),l=a.length?[t,a].join(".").replace(".$","#"):t;return e.apply(void 0,[l].concat(o))})};// jshint esversion: 6
const y={en:{description_simple:"This strategy sorts expenses and incomes by amounts and settles debts and credits by creating transactions between users. It processes financial transactions one after the other.",description_advanced:'In contrast to the "Simple" strategy, this method also considers positive and negative amounts and generates transactions between users. However, transactions are created in a specific order, depending on users\' financial obligations.',description_largest_bulk:"This strategy aims to efficiently balance debts and credits. It sorts users based on their financial obligations and conducts transactions between the most indebted and least indebted users. This process is iteratively repeated until all debts are settled or a certain number of steps is reached."},de:{simple:"naive \xdcberweisungskette",advanced:"bessere \xdcberweisungskette","largest bulk":"die dicksten Brocken zuerst",description_simple:`Diese Strategie ordnet Ausgaben und Einnahmen nach Betr\xe4gen und gleicht Schulden und Guthaben aus, indem sie Transaktionen zwischen den Nutzern erstellt. Dabei werden die finanziellen Transaktionen nacheinander verarbeitet.`,description_advanced:`Im Gegensatz zur "Simple" Strategie ber\xfccksichtigt diese Methode auch positive und negative Betr\xe4ge und erstellt Transaktionen zwischen den Nutzern. Die Transaktionen werden jedoch in einer bestimmten Reihenfolge erstellt, abh\xe4ngig von den finanziellen Verpflichtungen der Nutzer.`,description_largest_bulk:`Diese Strategie zielt darauf ab, Schulden und Guthaben effizient auszugleichen. Sie sortiert die Nutzer basierend auf ihren finanziellen Verpflichtungen und f\xfchrt Transaktionen zwischen dem am meisten verschuldeten und dem am wenigsten verschuldeten Nutzer durch. Dieser Prozess wird iterativ wiederholt, bis alle Schulden ausgeglichen sind oder eine bestimmte Anzahl von Schritten erreicht ist.`,clear:"l\xf6schen","Add User":"Neuer Nutzer",Sum:"Summe","Select link":"Link kopieren","Share the current state by copying this link.":"Teile den aktuellen Stand durch Kopieren dieses Links.","The link will change with each change you make.":"Der Link \xe4ndert sich bei jeder \xc4nderung der Daten.","What?":"Was?",Expense:"Ausgabenbeschreibung","How much?":"Wie teuer war`s?","Who payed it?":"Wer hat`s bezahlt?","Who enjoyed it?":"Wer waren die Nutznie\xdfer?","Copied!":"Kopiert!","John Doe":"Max Mustermann",pays:"zahlt",Split:"Teilen"}};let b=(e,t)=>e.indexOf(t)>=0,w="de";function x(e){return(console.log("t:::",e,w),b(Object.keys(y),w))?y[w][e]?y[w][e]:(console.log("Translate me for "+w+": '"+e+"'"),e):e}x.setLanguage=e=>{w=e},x.getLanguages=()=>[...Object.keys(y)],x.currentLanguage=()=>w;// prettier-ignore
const{address:k,aside:S,footer:E,header:j,h1:z,h2:O,h3:T,h4:N,h5:C,h6:A,hgroup:P,main:I,nav:_,section:L,article:R,blockquote:$,dd:D,dir:M,div:U,dl:F,dt:J,figcaption:H,figure:Z,hr:B,li:W,ol:q,p:K,pre:V,ul:Q,a:G,abbr:X,b:Y,bdi:ee,bdo:et,br:en,cite:er,code:eo,data:ei,dfn:ea,em:el,i:es,kdm:eu,mark:ec,q:ed,rb:ef,rp:em,rt:ep,rtc:eh,ruby:ev,s:eg,samp:ey,small:eb,span:ew,strong:ex,sub:ek,sup:eS,time:eE,tt:ej,u:ez,wbr:eO,area:eT,audio:eN,img:eC,map:eA,track:eP,video:eI,embed:e_,iframe:eL,noembed:eR,object:e$,param:eD,picture:eM,source:eU,canvas:eF,noscript:eJ,script:eH,del:eZ,ins:eB,caption:eW,col:eq,colgroup:eK,table:eV,tbody:eQ,td:eG,tfoot:eX,th:eY,thead:e0,tr:e1,button:e2,datalist:e3,fieldset:e4,form:e8,formfield:e7,input:e9,label:e5,legend:e6,meter:te,optgroup:tt,option:tn,output:tr,progress:to,select:ti,textarea:ta,details:tl,dialog:ts,menu:tu,menuitem:tc,summary:td,content:tf,element:tm,slot:tp,template:th}=/*@__PURE__*/t(f)(/*@__PURE__*/t(i)),tv=(e=[])=>e[0],tg=(e=[])=>e[e.length-1],ty=(e,t)=>(e.push(t),e),tb=(e,t)=>e.indexOf(t)>=0,tw=(e,t)=>t(e),tx=e=>Math.round(100*e)/100,tk=JSON.parse(localStorage.getItem("data"))||{users:[],expenses:[],selectedStrategy:"largest bulk"};console.log(window.location.search);const tS=()=>(window.location.search=/*@__PURE__*/t(i).buildQueryString({data:btoa(encodeURIComponent(JSON.stringify(tk)).replace(/%([0-9A-F]{2})/g,function(e,t){return String.fromCharCode("0x"+t)}))}),!0),tE=()=>tk.users,tj=()=>tk.expenses,tz=()=>tS()&&localStorage.setItem("data",JSON.stringify(tk)),tO={name:""},tT=(e,t)=>-((e.user===t?-e.amount:0)+(tb(e.users,t)?e.amount/e.users.length:0)),tN=(e,t)=>tT(t,e)||0,tC=e=>tj().map(t=>tT(t,e)).reduce((e,t)=>e+t,0),tA=()=>tx(tj().map(e=>e.amount).reduce((e,t)=>e+t,0)),tP=()=>tE().map(e=>({user:e,sum:tC(e.name)})),tI=e=>(tE().push({name:e}),tz(),!0),t_=[{name:"simple",description:()=>x("description_simple"),calculateTransactions:(e,t)=>{let n=[],r=tP().sort((e,t)=>e.sum-t.sum);return(//  result.push(startingPoint);
r.forEach((e,t)=>{0!==e.sum&&t<r.length-1&&(n.push({name:e.user.name,transactions:[{receiver:r[t+1].user.name,amount:e.sum}]}),r[t+1].sum+=e.sum)}),n)}},{name:"advanced",description:()=>x("description_advanced"),calculateTransactions:(e,t)=>{let n=[],r=tP().sort((e,t)=>e.sum<0&&t.sum>0||e.sum>0&&t.sum<0?e.sum-t.sum:t.sum-e.sum);return(//  result.push(startingPoint);
r.forEach((e,t)=>{0!==e.sum&&t<r.length-1&&(n.push({name:e.user.name,transactions:[{receiver:r[t+1].user.name,amount:e.sum}]}),r[t+1].sum+=e.sum)}),n)}},{name:"largest bulk",description:()=>x("description_largest_bulk"),calculateTransactions:(e,t)=>{let n=[],r=tP(),o=()=>r.every(e=>0===e.sum),i=0;for(;!o()&&i++<10;){r.sort((e,t)=>e.sum-t.sum);let e=tv(r),t=tg(r),o=n.find(t=>t.name===e.user.name)||tg(ty(n,{name:e.user.name,transactions:[]})),i=e.sum+t.sum>0?e.sum:-t.sum;e.sum=e.sum-i,t.sum=t.sum+i,o.transactions.push({receiver:t.user.name,amount:i}),r=r.filter(e=>0!==tx(e.sum))}return console.log(n),n}}],tL=e=>t_.find(t=>t.name===e)||tv(t_),tR=()=>{tj().push({title:tD.title,amount:tD.amount,user:tD.user,users:Object.keys(tD.users).filter(e=>tD.users[e])}),Object.assign(tD,{title:"",amount:0,user:"",users:{}}),tz(),tU=!tU};let t$=/*@__PURE__*/t(i).parseQueryString(window.location.search);t$.data&&Object.assign(tk,JSON.parse(decodeURIComponent(atob(t$.data).split("").map(function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)}).join("")))),x.setLanguage(tk.language),tk.selectedStrategy||(tk.selectedStrategy="largest bulk");const tD={title:"",amount:0,user:"",users:{}},tM=["$","€","\xa5","\xa3"];let tU=!0;const tF=()=>tU=!tU;let tJ="";const tH=e=>{tk.expenses.splice(e,1)},tZ=()=>{let e=!1;return{view:t=>{let{a:n,b:r}=t.attrs;return U({onmouseenter:t=>{console.log(t),e=!0},onmouseleave:t=>{console.log(t),e=!1}},e?n:r)}}};/*@__PURE__*/t(i).mount(document.body,{view:e=>[U.container([[U.row(/*@__PURE__*/t(i)("div",{class:"col-md-6 col-sm-12"},z("Splitter",e2.small({onclick:e=>(tk.users=[],tk.expenses=[])},x("clear")),ew.small(tA()),ti({value:tk.currency,oninput:e=>(tk.currency=e.target.value,tz())},tM.map(e=>tn(e))),ti({value:tk.language,oninput:e=>{tk.language=e.target.value,x.setLanguage(e.target.value),tz()}},x.getLanguages().map(e=>tn(e))))),/*@__PURE__*/t(i)("div",{class:"col-md-6 col-sm-12 mt15"},e9({placeHolder:x("John Doe"),value:tO.name,oninput:e=>tO.name=e.target.value}),e2({onclick:e=>tI(tO.name)&&(tO.name="")},ew({class:"icon-user"}),x("Add User"))))],B(),tU?U.w3AnimateRight([eV.fullHeight(e0(e1(eY(),tE().map(e=>eY(e.name)))),eQ(tj().map((e,n)=>e1({"data-label":e.title},eG(/*@__PURE__*/t(i)(tZ,{key:n,b:[e.title,"(",e.amount,tk.currency,")"],a:e2.small.secondary({onclick:e=>tH(n)},/*@__PURE__*/t(i).trust("&times;"))})),tE().map(e=>e.name).map(t=>eG({"data-label":t},tx(tN(t,e)))))),e1(eG(Y(x("Sum"))),tE().map(e=>tw(tx(tC(e.name)),t=>eG[({true:"positive",false:"negative"})[t>0]]({"data-label":e.name},t,tk.currency)))))),e2.primary({onclick:e=>{tF()}},ew({class:"icon-cart"}),"+")]):U.w3AnimateLeft([e5(x("What?")),e9({placeHolder:x("Expense"),value:tD.title,oninput:e=>tD.title=e.target.value}),en(),e5(x("How much?")),e9({type:"number",value:tD.amount,oninput:e=>tD.amount=parseFloat(e.target.value)}),tk.currency,en(),e5(x("Who payed it?")),ti({value:tD.user,oninput:e=>tD.user=e.target.value},tE().map(e=>tn(e.name))),en(),e5(x("Who enjoyed it?")),U.buttonGroup(e2({onclick:e=>tE().map(e=>e.name).forEach(e=>tD.users[e]=!0)},"ALL"),e2({onclick:e=>tE().map(e=>e.name).forEach(e=>tD.users[e]=!1)},"NONE")),U.buttonGroup(tE().map(e=>e2[({true:"inverse",false:""})[!!tD.users[e.name]]]({onclick:t=>tD.users[e.name]=!tD.users[e.name]},e.name))),// pre(JSON.stringify(nextExpense)),
    e2.secondary({onclick:e=>tF()},/*@__PURE__*/t(i).trust("&times;")),e2.tertiary({onclick:e=>{tR()}},"+")])]),B(),O(x("Split")),ti({value:tk.selectedStrategy,oninput:e=>{tk.selectedStrategy=e.target.value,tz()}},t_.map(e=>tn({value:e.name},x(e.name)))),K(tL(tk.selectedStrategy).description()),tk.selectedStrategy?tL(tk.selectedStrategy).calculateTransactions(tj(),tE()).map(e=>K(e.transactions.map(t=>U(Y(e.name)," ",x("pays")," ",Y(t.receiver)," ",ec(-tx(t.amount)),"",tk.currency)))):null,B(),U.container(U.row(U["col-md-2"](ew({class:"icon-share"}),x("Share the current state by copying this link.")),U["col-md-7 col-sm-12"](V.overflowHidden.$linktext(window.location.href),x("The link will change with each change you make."),tJ?U.toast(tJ):null),U["col-md-3"](e2({onclick:e=>(function(e){if(tJ="",document.selection){// IE
        var n=document.body.createTextRange();n.moveToElementText(document.getElementById(e)),n.select()}else if(window.getSelection){var n=document.createRange();n.selectNode(document.getElementById(e)),window.getSelection().removeAllRanges(),window.getSelection().addRange(n)}try{tJ=document.execCommand("copy")?x("Copied!"):x("Unable to copy!")}catch(e){tJ=x("Unsupported Browser!")}setTimeout(()=>{tJ="",/*@__PURE__*/t(i).redraw()},2e3)})("linktext")},x("Select link")))))]});//# sourceMappingURL=index.fdd231af.js.map

//# sourceMappingURL=index.fdd231af.js.map
