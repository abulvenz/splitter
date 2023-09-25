var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};function t(e){return e&&e.__esModule?e.default:e}var n={},r={},o=e.parcelRequire94c2;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var a=Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){r[e]=t},e.parcelRequire94c2=o),o.register("dBs8J",function(e,t){function n(e,t,n,r,o,a){return{tag:e,key:t,attrs:n,children:r,text:o,dom:a,domSize:void 0,state:void 0,events:void 0,instance:void 0}}n.normalize=function(e){return Array.isArray(e)?n("[",void 0,void 0,n.normalizeChildren(e),void 0,void 0):null==e||"boolean"==typeof e?null:"object"==typeof e?e:n("#",void 0,void 0,String(e),void 0,void 0)},n.normalizeChildren=function(e){var t=[];if(e.length){// Note: this is a *very* perf-sensitive check.
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
e.exports=function(){var e,t=arguments[this],r=this+1;if(null==t?t={}:("object"!=typeof t||null!=t.tag||Array.isArray(t))&&(t={},r=this),arguments.length===r+1)e=arguments[r],Array.isArray(e)||(e=[e]);else for(e=[];r<arguments.length;)e.push(arguments[r++]);return n("",t.key,t,e)}}),o.register("k7iQv",function(e,t){/** @constructor */var n=function(e){if(!(this instanceof n))throw Error("Promise must be called with `new`");if("function"!=typeof e)throw TypeError("executor must be a function");var t=this,r=[],o=[],a=u(r,!0),i=u(o,!1),l=t._instance={resolvers:r,rejectors:o},s="function"==typeof setImmediate?setImmediate:setTimeout;function u(e,n){return function a(u){var f;try{if(n&&null!=u&&("object"==typeof u||"function"==typeof u)&&"function"==typeof(f=u.then)){if(u===t)throw TypeError("Promise can't be resolved w/ itself");c(f.bind(u))}else s(function(){n||0!==e.length||console.error("Possible unhandled promise rejection:",u);for(var t=0;t<e.length;t++)e[t](u);r.length=0,o.length=0,l.state=n,l.retry=function(){a(u)}})}catch(e){i(e)}}}function c(e){var t=0;function n(e){return function(n){t++>0||e(n)}}var r=n(i);try{e(n(a),r)}catch(e){r(e)}}c(e)};n.prototype.then=function(e,t){var r,o,a=this._instance;function i(e,t,n,i){t.push(function(t){if("function"!=typeof e)n(t);else try{r(e(t))}catch(e){o&&o(e)}}),"function"==typeof a.retry&&i===a.state&&a.retry()}var l=new n(function(e,t){r=e,o=t});return i(e,a.resolvers,r,!0),i(t,a.rejectors,o,!1),l},n.prototype.catch=function(e){return this.then(null,e)},n.prototype.finally=function(e){return this.then(function(t){return n.resolve(e()).then(function(){return t})},function(t){return n.resolve(e()).then(function(){return n.reject(t)})})},n.resolve=function(e){return e instanceof n?e:new n(function(t){t(e)})},n.reject=function(e){return new n(function(t,n){n(e)})},n.all=function(e){return new n(function(t,n){var r=e.length,o=0,a=[];if(0===e.length)t([]);else for(var i=0;i<e.length;i++)!function(i){function l(e){o++,a[i]=e,o===r&&t(a)}null!=e[i]&&("object"==typeof e[i]||"function"==typeof e[i])&&"function"==typeof e[i].then?e[i].then(l,n):l(e[i])}(i)})},n.race=function(e){return new n(function(t,n){for(var r=0;r<e.length;r++)e[r].then(t,n)})},e.exports=n}),o.register("j25vk",function(e,t){e.exports=o("6JDlc")(window)}),o.register("6JDlc",function(e,t){var n=o("dBs8J");e.exports=function(e){var t,r=e&&e.document,o={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"};function a(e){return e.attrs&&e.attrs.xmlns||o[e.tag]}//sanity check to discourage people from doing `vnode.state = ...`
function i(e,t){if(e.state!==t)throw Error("`vnode.state` must not be modified")}//Note: the hook is passed as the `this` argument to allow proxying the
//arguments without requiring a full array allocation to do so. It also
//takes advantage of the fact the current `vnode` is the first argument in
//all lifecycle methods.
function l(e){var t=e.state;try{return this.apply(t,arguments)}finally{i(e,t)}}// IE11 (at least) throws an UnspecifiedError when accessing document.activeElement when
// inside an iframe. Catch and swallow this error, and heavy-handidly return null.
function s(){try{return r.activeElement}catch(e){return null}}//create
function u(e,t,n,r,o,a,i){for(var l=n;l<r;l++){var s=t[l];null!=s&&c(e,s,o,i,a)}}function c(e,t,o,i,s){var f=t.tag;if("string"==typeof f)switch(t.state={},null!=t.attrs&&L(t.attrs,t,o),f){case"#":t.dom=r.createTextNode(t.children),y(e,t.dom,s);break;case"<":d(e,t,i,s);break;case"[":(function(e,t,n,o,a){var i=r.createDocumentFragment();if(null!=t.children){var l=t.children;u(i,l,0,l.length,n,null,o)}t.dom=i.firstChild,t.domSize=i.childNodes.length,y(e,i,a)})(e,t,o,i,s);break;default:(function(e,t,o,i,l){var s=t.tag,c=t.attrs,f=c&&c.is,d=(i=a(t)||i)?f?r.createElementNS(i,s,{is:f}):r.createElementNS(i,s):f?r.createElement(s,{is:f}):r.createElement(s);if(t.dom=d,null!=c&&//attrs
function(e,t,n){for(var r in t)j(e,r,null,t[r],n)}(t,c,i),y(e,d,l),!w(t)&&(null!=t.text&&(""!==t.text?d.textContent=t.text:t.children=[n("#",void 0,void 0,t.text,void 0,void 0)]),null!=t.children)){var p=t.children;u(d,p,0,p.length,o,null,i),"select"===t.tag&&null!=c&&function(e,t){if("value"in t){if(null===t.value)-1!==e.dom.selectedIndex&&(e.dom.value=null);else{var n=""+t.value// eslint-disable-line no-implicit-coercion
;(e.dom.value!==n||-1===e.dom.selectedIndex)&&(e.dom.value=n)}}"selectedIndex"in t&&j(e,"selectedIndex",null,t.selectedIndex,void 0)}(t,c)}})(e,t,o,i,s)}else(function(e,t){var r;if("function"==typeof e.tag.view){if(e.state=Object.create(e.tag),null!=(r=e.state.view).$$reentrantLock$$)return;r.$$reentrantLock$$=!0}else{if(e.state=void 0,null!=(r=e.tag).$$reentrantLock$$)return;r.$$reentrantLock$$=!0,e.state=null!=e.tag.prototype&&"function"==typeof e.tag.prototype.view?new e.tag(e):e.tag(e)}if(L(e.state,e,t),null!=e.attrs&&L(e.attrs,e,t),e.instance=n.normalize(l.call(e.state.view,e)),e.instance===e)throw Error("A view cannot return the vnode it received as argument");r.$$reentrantLock$$=null})(t,o),null!=t.instance?(c(e,t.instance,o,i,s),t.dom=t.instance.dom,t.domSize=null!=t.dom?t.instance.domSize:0):t.domSize=0}var f={caption:"table",thead:"table",tbody:"table",tfoot:"table",tr:"tbody",th:"tr",td:"tr",colgroup:"table",col:"colgroup"};function d(e,t,n,o){var a,i=t.children.match(/^\s*?<(\w+)/im)||[],l=r.createElement(f[i[1]]||"div");"http://www.w3.org/2000/svg"===n?(l.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+t.children+"</svg>",l=l.firstChild):l.innerHTML=t.children,t.dom=l.firstChild,t.domSize=l.childNodes.length,// Capture nodes to remove, so we don't confuse them.
t.instance=[];for(var s=r.createDocumentFragment();a=l.firstChild;)t.instance.push(a),s.appendChild(a);y(e,s,o)}//update
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
function p(e,t,n,r,o,a){if(t!==n&&(null!=t||null!=n)){if(null==t||0===t.length)u(e,n,0,n.length,r,o,a);else if(null==n||0===n.length)b(e,t,0,t.length);else{var i=null!=t[0]&&null!=t[0].key,l=null!=n[0]&&null!=n[0].key,s=0,f=0;if(!i)for(;f<t.length&&null==t[f];)f++;if(!l)for(;s<n.length&&null==n[s];)s++;if(null===l&&null==i)return;// both lists are full of nulls
if(i!==l)b(e,t,f,t.length),u(e,n,s,n.length,r,o,a);else if(l){// bottom-up
for(// keyed diff
var d,p,y,w,k,S,E=t.length-1,j=n.length-1;E>=f&&j>=s&&(w=t[E],k=n[j],w.key===k.key);)w!==k&&m(e,w,k,r,o,a),null!=k.dom&&(o=k.dom),E--,j--;// top-down
for(;E>=f&&j>=s&&(p=t[f],y=n[s],p.key===y.key);)f++,s++,p!==y&&m(e,p,y,r,v(t,f,o),a);// swaps and list reversals
for(;E>=f&&j>=s&&s!==j&&p.key===k.key&&w.key===y.key;)g(e,w,S=v(t,f,o)),w!==y&&m(e,w,y,r,S,a),++s<=--j&&g(e,p,o),p!==k&&m(e,p,k,r,o,a),null!=k.dom&&(o=k.dom),f++,w=t[--E],k=n[j],p=t[f],y=n[s];// bottom up once again
for(;E>=f&&j>=s&&w.key===k.key;)w!==k&&m(e,w,k,r,o,a),null!=k.dom&&(o=k.dom),E--,j--,w=t[E],k=n[j];if(s>j)b(e,t,f,E+1);else if(f>E)u(e,n,s,j+1,r,o,a);else{// inspired by ivi https://github.com/ivijs/ivi/ by Boris Kaul
var d,O,T=o,C=j-s+1,A=Array(C),N=0,P=0,z=2147483647,I=0;for(P=0;P<C;P++)A[P]=-1;for(P=j;P>=s;P--){null==d&&(d=function(e,t,n){for(var r=Object.create(null);t<n;t++){var o=e[t];if(null!=o){var a=o.key;null!=a&&(r[a]=t)}}return r}(t,f,E+1));var L=d[(k=n[P]).key];null!=L&&(z=L<z?L:-1// becomes -1 if nodes were re-ordered
,A[P-s]=L,w=t[L],t[L]=null,w!==k&&m(e,w,k,r,o,a),null!=k.dom&&(o=k.dom),I++)}if(o=T,I!==E-f+1&&b(e,t,f,E+1),0===I)u(e,n,s,j+1,r,o,a);else if(-1===z)for(N=// the indices of the indices of the items that are part of the
// longest increasing subsequence in the oldIndices list
(O=function(e){for(var t=[0],n=0,r=0,o=0,a=h.length=e.length,o=0;o<a;o++)h[o]=e[o];for(var o=0;o<a;++o)if(-1!==e[o]){var i=t[t.length-1];if(e[i]<e[o]){h[o]=i,t.push(o);continue}for(n=0,r=t.length-1;n<r;){// Fast integer average without overflow.
// eslint-disable-next-line no-bitwise
var l=(n>>>1)+(r>>>1)+(n&r&1);e[t[l]]<e[o]?n=l+1:r=l}e[o]<e[t[n]]&&(n>0&&(h[o]=t[n-1]),t[n]=o)}for(n=t.length,r=t[n-1];n-- >0;)t[n]=r,r=h[r];return h.length=0,t}(A)).length-1,P=j;P>=s;P--)y=n[P],-1===A[P-s]?c(e,y,r,a,o):O[N]===P-s?N--:g(e,y,o),null!=y.dom&&(o=n[P].dom);else for(P=j;P>=s;P--)y=n[P],-1===A[P-s]&&c(e,y,r,a,o),null!=y.dom&&(o=n[P].dom)}}else{// Don't index past the end of either list (causes deopts).
var R=t.length<n.length?t.length:n.length;for(// Rewind if necessary to the first non-null index on either side.
// We could alternatively either explicitly create or remove nodes when `start !== oldStart`
// but that would be optimizing for sparse lists which are more rare than dense ones.
s=s<f?s:f;s<R;s++)(p=t[s])!==(y=n[s])&&(null!=p||null!=y)&&(null==p?c(e,y,r,a,v(t,s+1,o)):null==y?x(e,p):m(e,p,y,r,v(t,s+1,o),a));t.length>R&&b(e,t,s,t.length),n.length>R&&u(e,n,s,n.length,r,o,a)}}}}function m(e,t,r,o,i,u){var f,h,v=t.tag;if(v===r.tag){if(r.state=t.state,r.events=t.events,function(e,t){do{if(null!=e.attrs&&"function"==typeof e.attrs.onbeforeupdate){var n=l.call(e.attrs.onbeforeupdate,e,t);if(void 0!==n&&!n)break}if("string"!=typeof e.tag&&"function"==typeof e.state.onbeforeupdate){var n=l.call(e.state.onbeforeupdate,e,t);if(void 0!==n&&!n)break}return!1}while(!1)// eslint-disable-line no-constant-condition
return e.dom=t.dom,e.domSize=t.domSize,e.instance=t.instance,// One would think having the actual latest attributes would be ideal,
// but it doesn't let us properly diff based on our current internal
// representation. We have to save not only the old DOM info, but also
// the attributes used to create it, as we diff *that*, not against the
// DOM directly (with a few exceptions in `setAttr`). And, of course, we
// need to save the children and text as they are conceptually not
// unlike special "attributes" internally.
e.attrs=t.attrs,e.children=t.children,e.text=t.text,!0}(r,t))return;if("string"==typeof v)switch(null!=r.attrs&&R(r.attrs,r,o),v){case"#":t.children.toString()!==r.children.toString()&&(t.dom.nodeValue=r.children),r.dom=t.dom;break;case"<":t.children!==r.children?(k(e,t),d(e,r,u,i)):(r.dom=t.dom,r.domSize=t.domSize,r.instance=t.instance);break;case"[":(function(e,t,n,r,o,a){p(e,t.children,n.children,r,o,a);var i=0,l=n.children;if(n.dom=null,null!=l){for(var s=0;s<l.length;s++){var u=l[s];null!=u&&null!=u.dom&&(null==n.dom&&(n.dom=u.dom),i+=u.domSize||1)}1!==i&&(n.domSize=i)}})(e,t,r,o,i,u);break;default:f=u,h=r.dom=t.dom,f=a(r)||f,"textarea"===r.tag&&(null==r.attrs&&(r.attrs={}),null!=r.text&&(r.attrs.value=r.text//FIXME handle multiple children
,r.text=void 0)),function(e,t,n,r){var o;if(null!=n)for(var a in n)j(e,a,t&&t[a],n[a],r);if(null!=t)for(var a in t)null!=(o=t[a])&&(null==n||null==n[a])&&function(e,t,n,r){if(!("key"===t||"is"===t||null==n||O(t))){if("o"!==t[0]||"n"!==t[1]||O(t)){if("style"===t)P(e.dom,n,null);else if(T(e,t,r)&&"className"!==t&&("value"!==t||"option"!==e.tag&&("select"!==e.tag||-1!==e.dom.selectedIndex||e.dom!==s()))&&("input"!==e.tag||"type"!==t))e.dom[t]=null;else{var o=t.indexOf(":");-1!==o&&(t=t.slice(o+1)),!1!==n&&e.dom.removeAttribute("className"===t?"class":t)}}else I(e,t,void 0)}}(e,a,o,r)}(r,t.attrs,r.attrs,f),w(r)||(null!=t.text&&null!=r.text&&""!==r.text?t.text.toString()!==r.text.toString()&&(t.dom.firstChild.nodeValue=r.text):(null!=t.text&&(t.children=[n("#",void 0,void 0,t.text,void 0,t.dom.firstChild)]),null!=r.text&&(r.children=[n("#",void 0,void 0,r.text,void 0,void 0)]),p(h,t.children,r.children,o,null,f)))}else(function(e,t,r,o,a,i){if(r.instance=n.normalize(l.call(r.state.view,r)),r.instance===r)throw Error("A view cannot return the vnode it received as argument");R(r.state,r,o),null!=r.attrs&&R(r.attrs,r,o),null!=r.instance?(null==t.instance?c(e,r.instance,o,i,a):m(e,t.instance,r.instance,o,a,i),r.dom=r.instance.dom,r.domSize=r.instance.domSize):null!=t.instance?(x(e,t.instance),r.dom=void 0,r.domSize=0):(r.dom=t.dom,r.domSize=t.domSize)})(e,t,r,o,i,u)}else x(e,t),c(e,r,o,u,i)}// Lifted from ivi https://github.com/ivijs/ivi/
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
for(;null!=r.dom&&r.dom.parentNode===t;){if("string"!=typeof r.tag){if(null!=(r=r.instance))continue}else if("<"===r.tag)for(var o=0;o<r.instance.length;o++)n.appendChild(r.instance[o]);else if("["!==r.tag)n.appendChild(r.dom);else if(1===r.children.length){if(null!=(r=r.children[0]))continue}else for(var o=0;o<r.children.length;o++){var a=r.children[o];null!=a&&e(t,n,a)}break}})(e,o,t),y(e,o,n)}function y(e,t,n){null!=n?e.insertBefore(t,n):e.appendChild(t)}function w(e){if(null==e.attrs||null==e.attrs.contenteditable&&// attribute
null// property
==e.attrs.contentEditable)return!1;var t=e.children;if(null!=t&&1===t.length&&"<"===t[0].tag){var n=t[0].children;e.dom.innerHTML!==n&&(e.dom.innerHTML=n)}else if(null!=e.text||null!=t&&0!==t.length)throw Error("Child node of a contenteditable must be trusted");return!0}//remove
function b(e,t,n,r){for(var o=n;o<r;o++){var a=t[o];null!=a&&x(e,a)}}function x(e,t){var n,r,o=0,a=t.state;if("string"!=typeof t.tag&&"function"==typeof t.state.onbeforeremove){var s=l.call(t.state.onbeforeremove,t);null!=s&&"function"==typeof s.then&&(o=1,n=s)}if(t.attrs&&"function"==typeof t.attrs.onbeforeremove){var s=l.call(t.attrs.onbeforeremove,t);null!=s&&"function"==typeof s.then&&(// eslint-disable-next-line no-bitwise
o|=2,r=s)}// If we can, try to fast-path it and avoid all the overhead of awaiting
if(i(t,a),o){if(null!=n){var u=function(){// eslint-disable-next-line no-bitwise
!(1&o)||(o&=2)||c()};n.then(u,u)}if(null!=r){var u=function(){// eslint-disable-next-line no-bitwise
!(2&o)||(o&=1)||c()};r.then(u,u)}}else E(t),S(e,t);function c(){i(t,a),E(t),S(e,t)}}function k(e,t){for(var n=0;n<t.instance.length;n++)e.removeChild(t.instance[n])}function S(e,t){// Dodge the recursion overhead in a few of the most common cases.
for(;null!=t.dom&&t.dom.parentNode===e;){if("string"!=typeof t.tag){if(null!=(t=t.instance))continue}else if("<"===t.tag)k(e,t);else{if("["!==t.tag&&(e.removeChild(t.dom),!Array.isArray(t.children)))break;if(1===t.children.length){if(null!=(t=t.children[0]))continue}else for(var n=0;n<t.children.length;n++){var r=t.children[n];null!=r&&S(e,r)}}break}}function E(e){if("string"!=typeof e.tag&&"function"==typeof e.state.onremove&&l.call(e.state.onremove,e),e.attrs&&"function"==typeof e.attrs.onremove&&l.call(e.attrs.onremove,e),"string"!=typeof e.tag)null!=e.instance&&E(e.instance);else{var t=e.children;if(Array.isArray(t))for(var n=0;n<t.length;n++){var r=t[n];null!=r&&E(r)}}}function j(e,t,n,o,a){if(!("key"===t||"is"===t||null==o||O(t))&&(n!==o||"value"===t||"checked"===t||"selectedIndex"===t||"selected"===t&&e.dom===s()||"option"===e.tag&&e.dom.parentNode===r.activeElement||"object"==typeof o)){if("o"===t[0]&&"n"===t[1])return I(e,t,o);if("xlink:"===t.slice(0,6))e.dom.setAttributeNS("http://www.w3.org/1999/xlink",t.slice(6),o);else if("style"===t)P(e.dom,n,o);else if(T(e,t,a)){if("value"===t&&(("input"===e.tag||"textarea"===e.tag)&&e.dom.value===""+o&&e.dom===s()||"select"===e.tag&&null!==n&&e.dom.value===""+o||"option"===e.tag&&null!==n&&e.dom.value===""+o))return;// If you assign an input type that is not supported by IE 11 with an assignment expression, an error will occur.
"input"===e.tag&&"type"===t?e.dom.setAttribute(t,o):e.dom[t]=o}else"boolean"==typeof o?o?e.dom.setAttribute(t,""):e.dom.removeAttribute(t):e.dom.setAttribute("className"===t?"class":t,o)}}function O(e){return"oninit"===e||"oncreate"===e||"onupdate"===e||"onremove"===e||"onbeforeremove"===e||"onbeforeupdate"===e}function T(e,t,n){// Filter out namespaced keys
return void 0===n&&// If it's a custom element, just keep it.
(e.tag.indexOf("-")>-1||null!=e.attrs&&e.attrs.is||// If it's a normal element, let's try to avoid a few browser bugs.
"href"!==t&&"list"!==t&&"form"!==t&&"width"!==t&&"height"// && key !== "type"
!==t)&&t in e.dom}//style
var C=/[A-Z]/g;function A(e){return"-"+e.toLowerCase()}function N(e){return"-"===e[0]&&"-"===e[1]?e:"cssFloat"===e?"float":e.replace(C,A)}function P(e,t,n){if(t===n);else if(null==n)e.style.cssText="";else if("object"!=typeof n)e.style.cssText=n;else if(null==t||"object"!=typeof t)// Add new style properties
for(var r in // `old` is missing or a string, `style` is an object.
e.style.cssText="",n){var o=n[r];null!=o&&e.style.setProperty(N(r),String(o))}else{// Both old & new are (different) objects.
// Update style properties that have changed
for(var r in n){var o=n[r];null!=o&&(o=String(o))!==String(t[r])&&e.style.setProperty(N(r),o)}// Remove style properties that no longer exist
for(var r in t)null!=t[r]&&null==n[r]&&e.style.removeProperty(N(r))}}// Here's an explanation of how this works:
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
function z(){// Save this, so the current redraw is correctly tracked.
this._=t}//event
function I(e,t,n){null!=e.events?e.events[t]!==n&&(null!=n&&("function"==typeof n||"object"==typeof n)?(null==e.events[t]&&e.dom.addEventListener(t.slice(2),e.events,!1),e.events[t]=n):(null!=e.events[t]&&e.dom.removeEventListener(t.slice(2),e.events,!1),e.events[t]=void 0)):null!=n&&("function"==typeof n||"object"==typeof n)&&(e.events=new z,e.dom.addEventListener(t.slice(2),e.events,!1),e.events[t]=n)}//lifecycle
function L(e,t,n){"function"==typeof e.oninit&&l.call(e.oninit,t),"function"==typeof e.oncreate&&n.push(l.bind(e.oncreate,t))}function R(e,t,n){"function"==typeof e.onupdate&&n.push(l.bind(e.onupdate,t))}return z.prototype=Object.create(null),z.prototype.handleEvent=function(e){var t,n=this["on"+e.type];"function"==typeof n?t=n.call(e.currentTarget,e):"function"==typeof n.handleEvent&&n.handleEvent(e),this._&&!1!==e.redraw&&(0,this._)(),!1===t&&(e.preventDefault(),e.stopPropagation())},function(e,r,o){if(!e)throw TypeError("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.");var a=[],i=s(),l=e.namespaceURI;null==e.vnodes&&(e.textContent=""),r=n.normalizeChildren(Array.isArray(r)?r:[r]);var u=t;try{t="function"==typeof o?o:void 0,p(e,e.vnodes,r,a,null,"http://www.w3.org/1999/xhtml"===l?void 0:l)}finally{t=u}e.vnodes=r,null!=i&&s()!==i&&"function"==typeof i.focus&&i.focus();for(var c=0;c<a.length;c++)a[c]()}}}),o.register("iZais",function(e,t){var n=o("dBs8J");e.exports=function(e,t,r){var o=[],a=!1,i=!1;function l(){if(a)throw Error("Nested m.redraw.sync() call");a=!0;for(var t=0;t<o.length;t+=2)try{e(o[t],n(o[t+1]),s)}catch(e){r.error(e)}a=!1}function s(){i||(i=!0,t(function(){i=!1,l()}))}return s.sync=l,{mount:function(t,r){if(null!=r&&null==r.view&&"function"!=typeof r)throw TypeError("m.mount(element, component) expects a component, not a vnode");var a=o.indexOf(t);a>=0&&(o.splice(a,2),e(t,[],s)),null!=r&&(o.push(t,r),e(t,n(r),s))},redraw:s}}}),o.register("5y2KI",function(e,t){var n=o("cITMw");e.exports=function(e,t,r){var o=0;function a(e){return new t(e)}function i(e){return function(o,i){"string"!=typeof o?(i=o,o=o.url):null==i&&(i={});var l=new t(function(t,r){e(n(o,i.params),i,function(e){if("function"==typeof i.type){if(Array.isArray(e))for(var n=0;n<e.length;n++)e[n]=new i.type(e[n]);else e=new i.type(e)}t(e)},r)});if(!0===i.background)return l;var s=0;function u(){0==--s&&"function"==typeof r&&r()}return function e(t){var n=t.then;return(// Set the constructor, so engines know to not await or resolve
// this as a native promise. At the time of writing, this is
// only necessary for V8, but their behavior is the correct
// behavior per spec. See this spec issue for more details:
// https://github.com/tc39/ecma262/issues/1577. Also, see the
// corresponding comment in `request/tests/test-request.js` for
// a bit more background on the issue at hand.
t.constructor=a,t.then=function(){s++;var r=n.apply(t,arguments);return r.then(u,function(e){if(u(),0===s)throw e}),e(r)},t)}(l)}}function l(e,t){for(var n in e.headers)if(({}).hasOwnProperty.call(e.headers,n)&&t.test(n))return!0;return!1}return(// In case the global Promise is some userland library's where they rely on
// `foo instanceof this.constructor`, `this.constructor.resolve(value)`, or
// similar. Let's *not* break them.
a.prototype=t.prototype,a.__proto__=t// eslint-disable-line no-proto
,{request:i(function(t,n,r,o){var a,i=null!=n.method?n.method.toUpperCase():"GET",s=n.body,u=(null==n.serialize||n.serialize===JSON.serialize)&&!(s instanceof e.FormData),c=n.responseType||("function"==typeof n.extract?"":"json"),f=new e.XMLHttpRequest,d=!1,p=f,m=f.abort;for(var h in f.abort=function(){d=!0,m.call(this)},f.open(i,t,!1!==n.async,"string"==typeof n.user?n.user:void 0,"string"==typeof n.password?n.password:void 0),u&&null!=s&&!l(n,/^content-type$/i)&&f.setRequestHeader("Content-Type","application/json; charset=utf-8"),"function"==typeof n.deserialize||l(n,/^accept$/i)||f.setRequestHeader("Accept","application/json, text/*"),n.withCredentials&&(f.withCredentials=n.withCredentials),n.timeout&&(f.timeout=n.timeout),f.responseType=c,n.headers)({}).hasOwnProperty.call(n.headers,h)&&f.setRequestHeader(h,n.headers[h]);f.onreadystatechange=function(e){// Don't throw errors on xhr.abort().
if(!d&&4===e.target.readyState)try{var a,i=e.target.status>=200&&e.target.status<300||304===e.target.status||/^file:\/\//i.test(t),l=e.target.response;if("json"===c?e.target.responseType||"function"==typeof n.extract||(l=JSON.parse(e.target.responseText)):c&&"text"!==c||null!=l||(l=e.target.responseText),"function"==typeof n.extract?(l=n.extract(e.target,n),i=!0):"function"==typeof n.deserialize&&(l=n.deserialize(l)),i)r(l);else{try{a=e.target.responseText}catch(e){a=l}var s=Error(a);s.code=e.target.status,s.response=l,o(s)}}catch(e){o(e)}},"function"==typeof n.config&&(f=n.config(f,n,t)||f)!==p&&(a=f.abort,f.abort=function(){d=!0,a.call(this)}),null==s?f.send():"function"==typeof n.serialize?f.send(n.serialize(s)):s instanceof e.FormData?f.send(s):f.send(JSON.stringify(s))}),jsonp:i(function(t,n,r,a){var i=n.callbackName||"_mithril_"+Math.round(1e16*Math.random())+"_"+o++,l=e.document.createElement("script");e[i]=function(t){delete e[i],l.parentNode.removeChild(l),r(t)},l.onerror=function(){delete e[i],l.parentNode.removeChild(l),a(Error("JSONP request failed"))},l.src=t+(0>t.indexOf("?")?"?":"&")+encodeURIComponent(n.callbackKey||"callback")+"="+encodeURIComponent(i),e.document.documentElement.appendChild(l)})})}}),o.register("cITMw",function(e,t){var n=o("iRA82"),r=o("jN4Zp");// Returns `path` from `template` + `params`
e.exports=function(e,t){if(/:([^\/\.-]+)(\.{3})?:/.test(e))throw SyntaxError("Template parameter names *must* be separated");if(null==t)return e;var o=e.indexOf("?"),a=e.indexOf("#"),i=a<0?e.length:a,l=o<0?i:o,s=e.slice(0,l),u={};r(u,t);var c=s.replace(/:([^\/\.-]+)(\.{3})?/g,function(e,n,r){return(// If no such parameter exists, don't interpolate it.
(delete u[n],null==t[n])?e:r?t[n]:encodeURIComponent(String(t[n])))}),f=c.indexOf("?"),d=c.indexOf("#"),p=d<0?c.length:d,m=f<0?p:f,h=c.slice(0,m);o>=0&&(h+=e.slice(o,i)),f>=0&&(h+=(o<0?"?":"&")+c.slice(f,p));var v=n(u);return v&&(h+=(o<0&&f<0?"?":"&")+v),a>=0&&(h+=e.slice(a)),d>=0&&(h+=(a<0?"":"&")+c.slice(d)),h}}),o.register("iRA82",function(e,t){e.exports=function(e){if("[object Object]"!==Object.prototype.toString.call(e))return"";var t=[];for(var n in e)(function e(n,r){if(Array.isArray(r))for(var o=0;o<r.length;o++)e(n+"["+o+"]",r[o]);else if("[object Object]"===Object.prototype.toString.call(r))for(var o in r)e(n+"["+o+"]",r[o]);else t.push(encodeURIComponent(n)+(null!=r&&""!==r?"="+encodeURIComponent(r):""))})(n,e[n]);return t.join("&")}}),o.register("jN4Zp",function(e,t){e.exports=Object.assign||function(e,t){t&&Object.keys(t).forEach(function(n){e[n]=t[n]})}}),o.register("4Ppi2",function(e,t){var n=o("7EF0O");e.exports=o("eFHZ8")(window,n)}),o.register("7EF0O",function(e,t){var n=o("j25vk");e.exports=o("iZais")(n,requestAnimationFrame,console)}),o.register("eFHZ8",function(e,t){var n=o("dBs8J"),r=o("iVcuU"),a=o("2uPnQ"),i=o("cITMw"),l=o("7lWrV"),s=o("8KlxE"),u=o("jN4Zp"),c={};e.exports=function(e,t){function o(t,n,r){if(t=i(t,n),null!=f){f();var o=r?r.state:null,a=r?r.title:null;r&&r.replace?e.history.replaceState(o,a,y.prefix+t):e.history.pushState(o,a,y.prefix+t)}else e.location.href=y.prefix+t}var f,d,p,m,h,v=c,g=y.SKIP={};function y(r,i,w){if(null==r)throw Error("Ensure the DOM element that was passed to `m.route` is not undefined");// 0 = start
// 1 = init
// 2 = ready
var b,x=0,k=Object.keys(w).map(function(e){if("/"!==e[0])throw SyntaxError("Routes must start with a `/`");if(/:([^\/\.-]+)(\.{3})?:/.test(e))throw SyntaxError("Route parameter names must be separated with either `/`, `.`, or `-`");return{route:e,component:w[e],check:s(e)}}),S="function"==typeof setImmediate?setImmediate:setTimeout,E=a.resolve(),j=!1;if(f=null,null!=i){var O=l(i);if(!k.some(function(e){return e.check(O)}))throw ReferenceError("Default route doesn't match any known routes")}function T(){j=!1;// Consider the pathname holistically. The prefix might even be invalid,
// but that's not our problem.
var n=e.location.hash;"#"!==y.prefix[0]&&(n=e.location.search+n,"?"!==y.prefix[0]&&"/"!==(n=e.location.pathname+n)[0]&&(n="/"+n));// This seemingly useless `.concat()` speeds up the tests quite a bit,
// since the representation is consistently a relatively poorly
// optimized cons string.
var r=n.concat().replace(/(?:%[a-f89][a-f0-9])+/gim,decodeURIComponent).slice(y.prefix.length),a=l(r);function s(){if(r===i)throw Error("Could not resolve default route "+i);o(i,null,{replace:!0})}u(a.params,e.history.state),function e(n){// 0 = init
// 1 = scheduled
// 2 = done
for(;n<k.length;n++)if(k[n].check(a)){var o=k[n].component,i=k[n].route,l=o,u=h=function(i){if(u===h){if(i===g)return e(n+1);d=null!=i&&("function"==typeof i.view||"function"==typeof i)?i:"div",p=a.params,m=r,h=null,v=o.render?o:null,2===x?t.redraw():(x=2,t.redraw.sync())}};// There's no understating how much I *wish* I could
// use `async`/`await` here...
o.view||"function"==typeof o?(o={},u(l)):o.onmatch?E.then(function(){return o.onmatch(a.params,r,i)}).then(u,s):u("div");return}s()}(0)}return(// Set it unconditionally so `m.route.set` and `m.route.Link` both work,
// even if neither `pushState` nor `hashchange` are supported. It's
// cleared if `hashchange` is used, since that makes it automatically
// async.
f=function(){j||(j=!0,S(T))},"function"==typeof e.history.pushState?(b=function(){e.removeEventListener("popstate",f,!1)},e.addEventListener("popstate",f,!1)):"#"===y.prefix[0]&&(f=null,b=function(){e.removeEventListener("hashchange",T,!1)},e.addEventListener("hashchange",T,!1)),t.mount(r,{onbeforeupdate:function(){return!(!(x=x?2:1)||c===v)},oncreate:T,onremove:b,view:function(){if(x&&c!==v){// Wrap in a fragment to preserve existing key semantics
var e=[n(d,p.key,p)];return v&&(e=v.render(e[0])),e}}}))}return y.set=function(e,t,n){null!=h&&((n=n||{}).replace=!0),h=null,o(e,t,n)},y.get=function(){return m},y.prefix="#!",y.Link={view:function(e){var t,n,o=e.attrs.options,a={};u(a,e.attrs),// The first two are internal, but the rest are magic attributes
// that need censored to not screw up rendering.
a.selector=a.options=a.key=a.oninit=a.oncreate=a.onbeforeupdate=a.onupdate=a.onbeforeremove=a.onremove=null;// Do this now so we can get the most current `href` and `disabled`.
// Those attributes may also be specified in the selector, and we
// should honor that.
var i=r(e.attrs.selector||"a",a,e.children);return(i.attrs.disabled=!!i.attrs.disabled)?(i.attrs.href=null,i.attrs["aria-disabled"]="true",// If you *really* do want to do this on a disabled link, use
// an `oncreate` hook to add it.
i.attrs.onclick=null):(t=i.attrs.onclick,n=i.attrs.href,i.attrs.href=y.prefix+n,i.attrs.onclick=function(e){var r;"function"==typeof t?r=t.call(e.currentTarget,e):null==t||"object"!=typeof t||"function"==typeof t.handleEvent&&t.handleEvent(e),!1===r||e.defaultPrevented||// Ignore everything but left clicks
0!==e.button&&0!==e.which&&1!==e.which||// Let the browser handle `target=_blank`, etc.
e.currentTarget.target&&"_self"!==e.currentTarget.target||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||(e.preventDefault(),e.redraw=!1,y.set(n,null,o))}),i}},y.param=function(e){return p&&null!=e?p[e]:p},y}}),o.register("iVcuU",function(e,t){var n=o("dBs8J"),r=o("5sRXF"),a=/(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g,i={},l={}.hasOwnProperty;function s(e){for(var t in e)if(l.call(e,t))return!1;return!0}e.exports=function(e){if(null==e||"string"!=typeof e&&"function"!=typeof e&&"function"!=typeof e.view)throw Error("The selector must be either a string or a component.");var t=r.apply(1,arguments);return"string"==typeof e&&(t.children=n.normalizeChildren(t.children),"["!==e)?function(e,t){var r=t.attrs,o=n.normalizeChildren(t.children),a=l.call(r,"class"),i=a?r.class:r.className;if(t.tag=e.tag,t.attrs=null,t.children=void 0,!s(e.attrs)&&!s(r)){var u={};for(var c in r)l.call(r,c)&&(u[c]=r[c]);r=u}for(var c in e.attrs)l.call(e.attrs,c)&&"className"!==c&&!l.call(r,c)&&(r[c]=e.attrs[c]);for(var c in(null!=i||null!=e.attrs.className)&&(r.className=null!=i?null!=e.attrs.className?String(e.attrs.className)+" "+String(i):i:null!=e.attrs.className?e.attrs.className:null),a&&(r.class=null),r)if(l.call(r,c)&&"key"!==c){t.attrs=r;break}return Array.isArray(o)&&1===o.length&&null!=o[0]&&"#"===o[0].tag?t.text=o[0].children:t.children=o,t}(i[e]||function(e){for(var t,n="div",r=[],o={};t=a.exec(e);){var l=t[1],s=t[2];if(""===l&&""!==s)n=s;else if("#"===l)o.id=s;else if("."===l)r.push(s);else if("["===t[3][0]){var u=t[6];u&&(u=u.replace(/\\(["'])/g,"$1").replace(/\\\\/g,"\\")),"class"===t[4]?r.push(u):o[t[4]]=""===u?u:u||!0}}return r.length>0&&(o.className=r.join(" ")),i[e]={tag:n,attrs:o}}(e),t):(t.tag=e,t)}}),o.register("2uPnQ",function(t,n){var r=o("k7iQv");"undefined"!=typeof window?(void 0===window.Promise?window.Promise=r:window.Promise.prototype.finally||(window.Promise.prototype.finally=r.prototype.finally),t.exports=window.Promise):void 0!==e?(void 0===e.Promise?e.Promise=r:e.Promise.prototype.finally||(e.Promise.prototype.finally=r.prototype.finally),t.exports=e.Promise):t.exports=r}),o.register("7lWrV",function(e,t){var n=o("gZZfO");// Returns `{path, params}` from `url`
e.exports=function(e){var t=e.indexOf("?"),r=e.indexOf("#"),o=r<0?e.length:r,a=t<0?o:t,i=e.slice(0,a).replace(/\/{2,}/g,"/");return i?("/"!==i[0]&&(i="/"+i),i.length>1&&"/"===i[i.length-1]&&(i=i.slice(0,-1))):i="/",{path:i,params:t<0?{}:n(e.slice(t+1,o))}}}),o.register("gZZfO",function(e,t){e.exports=function(e){if(""===e||null==e)return{};"?"===e.charAt(0)&&(e=e.slice(1));for(var t=e.split("&"),n={},r={},o=0;o<t.length;o++){var a=t[o].split("="),i=decodeURIComponent(a[0]),l=2===a.length?decodeURIComponent(a[1]):"";"true"===l?l=!0:"false"===l&&(l=!1);var s=i.split(/\]\[?|\[/),u=r;i.indexOf("[")>-1&&s.pop();for(var c=0;c<s.length;c++){var f=s[c],d=s[c+1],p=""==d||!isNaN(parseInt(d,10));if(""===f){var i=s.slice(0,c).join();null==n[i]&&(n[i]=Array.isArray(u)?u.length:0),f=n[i]++}else if("__proto__"===f)break;if(c===s.length-1)u[f]=l;else{// Read own properties exclusively to disallow indirect
// prototype pollution
var m=Object.getOwnPropertyDescriptor(u,f);null!=m&&(m=m.value),null==m&&(u[f]=m=p?[]:{}),u=m}}}return r}}),o.register("8KlxE",function(e,t){var n=o("7lWrV");// Compiles a template into a function that takes a resolved path (without query
// strings) and returns an object containing the template parameters with their
// parsed values. This expects the input of the compiled template to be the
// output of `parsePathname`. Note that it does *not* remove query parameters
// specified in the template.
e.exports=function(e){var t=n(e),r=Object.keys(t.params),o=[],a=RegExp("^"+t.path.replace(// `:lang-:locale` in routes. This is all merged into one pass so I
// don't also accidentally escape `-` and make it harder to detect it to
// ban it from template parameters.
/:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g,function(e,t,n){return null==t?"\\"+e:(o.push({k:t,r:"..."===n}),"..."===n)?"(.*)":"."===n?"([^/]+)\\.":"([^/]+)"+(n||"")})+"$");return function(e){// First, check the params. Usually, there isn't any, and it's just
// checking a static set.
for(var n=0;n<r.length;n++)if(t.params[r[n]]!==e.params[r[n]])return!1;// If no interpolations exist, let's skip all the ceremony
if(!o.length)return a.test(e.path);var i=a.exec(e.path);if(null==i)return!1;for(var n=0;n<o.length;n++)e.params[o[n].k]=o[n].r?i[n+1]:decodeURIComponent(i[n+1]);return!0}}});// jshint esversion: 6
var a={},i={},l=o("iVcuU");l.trust=o("e2F9W"),l.fragment=o("7PZrX"),i=l;var s={},u=o("2uPnQ"),c=o("7EF0O");s=o("5y2KI")(window,u,c.redraw);var c=o("7EF0O"),f=function(){return i.apply(this,arguments)};f.m=i,f.trust=i.trust,f.fragment=i.fragment,f.mount=c.mount,f.route=o("4Ppi2"),f.render=o("j25vk"),f.redraw=c.redraw,f.request=s.request,f.jsonp=s.jsonp,f.parseQueryString=o("gZZfO"),f.buildQueryString=o("iRA82"),f.parsePathname=o("7lWrV"),f.buildPathname=o("cITMw"),f.vnode=o("dBs8J"),f.PromisePolyfill=o("k7iQv"),a=f;var d={},p={};function m(){}Object.defineProperty(p,"__esModule",{value:!0,configurable:!0}),Object.defineProperty(p,"default",{get:()=>h,set:void 0,enumerable:!0,configurable:!0});var h=function(e){function t(t){return new Proxy(m,{apply:(n,r,o)=>e(t,[],...o),get:(n,r)=>{let o=[r],a=new Proxy(m,{get:(e,t)=>(o.push(t),a),apply:(n,r,a)=>e(t,o,...a)});return a}})}return new Proxy(e=>t(e),{get:(e,n)=>t(e[n]||n)})},v=p&&p.__esModule?p:{default:p},g=function(e){return e.replace(/([A-Z])/g,function(e){return"-"+e[0].toLowerCase()})};d=function(e){return(0,v.default)(function(t,n){for(var r=arguments.length,o=Array(r>2?r-2:0),a=2;a<r;a++)o[a-2]=arguments[a];var i=n.map(g).join("."),l=i.length?[t,i].join(".").replace(".$","#"):t;return e.apply(void 0,[l].concat(o))})};// jshint esversion: 6
const y={de:{clear:"l\xf6schen","Add User":"Neuer Nutzer",Sum:"Summe","Select link":"Link kopieren","Share the current state by copying this link.":"Teile den aktuellen Stand durch Kopieren dieses Links.","The link will change with each change you make.":"Der Link \xe4ndert sich bei jeder \xc4nderung der Daten.","What?":"Was?",Expense:"Ausgabenbeschreibung","How much?":"Wie teuer war`s?","Who payed it?":"Wer hat`s bezahlt?","Who enjoyed it?":"Wer waren die Nutznie\xdfer?","Copied!":"Kopiert!","John Doe":"Max Mustermann",pays:"zahlt",Split:"Teilen"}};let w=(e,t)=>e.indexOf(t)>=0,b="de";function x(e){return w(Object.keys(y),b)?y[b][e]?y[b][e]:(console.log("Translate me for "+b+": '"+e+"'"),e):e}x.setLanguage=e=>{b=e},x.getLanguages=()=>[...Object.keys(y),"en"],x.currentLanguage=()=>b;// prettier-ignore
const{address:k,aside:S,footer:E,header:j,h1:O,h2:T,h3:C,h4:A,h5:N,h6:P,hgroup:z,main:I,nav:L,section:R,article:$,blockquote:_,dd:M,dir:U,div:F,dl:J,dt:D,figcaption:W,figure:Z,hr:H,li:q,ol:B,p:K,pre:Q,ul:V,a:X,abbr:G,b:Y,bdi:ee,bdo:et,br:en,cite:er,code:eo,data:ea,dfn:ei,em:el,i:es,kdm:eu,mark:ec,q:ef,rb:ed,rp:ep,rt:em,rtc:eh,ruby:ev,s:eg,samp:ey,small:ew,span:eb,strong:ex,sub:ek,sup:eS,time:eE,tt:ej,u:eO,wbr:eT,area:eC,audio:eA,img:eN,map:eP,track:ez,video:eI,embed:eL,iframe:eR,noembed:e$,object:e_,param:eM,picture:eU,source:eF,canvas:eJ,noscript:eD,script:eW,del:eZ,ins:eH,caption:eq,col:eB,colgroup:eK,table:eQ,tbody:eV,td:eX,tfoot:eG,th:eY,thead:e0,tr:e1,button:e2,datalist:e3,fieldset:e8,form:e4,formfield:e7,input:e9,label:e5,legend:e6,meter:te,optgroup:tt,option:tn,output:tr,progress:to,select:ta,textarea:ti,details:tl,dialog:ts,menu:tu,menuitem:tc,summary:tf,content:td,element:tp,slot:tm,template:th}=/*@__PURE__*/t(d)(/*@__PURE__*/t(a)),tv=(e=[])=>e[0],tg=(e=[])=>e[e.length-1],ty=(e,t)=>(e.push(t),e),tw=(e,t)=>e.indexOf(t)>=0,tb=(e,t)=>t(e),tx=e=>Math.round(100*e)/100,tk=JSON.parse(localStorage.getItem("data"))||{users:[],expenses:[],selectedStrategy:"largest bulk"};console.log(window.location.search);const tS=()=>(window.location.search=/*@__PURE__*/t(a).buildQueryString({data:btoa(encodeURIComponent(JSON.stringify(tk)).replace(/%([0-9A-F]{2})/g,function(e,t){return String.fromCharCode("0x"+t)}))}),!0),tE=()=>tk.users,tj=()=>tk.expenses,tO=()=>tS()&&localStorage.setItem("data",JSON.stringify(tk)),tT={name:""},tC=(e,t)=>-((e.user===t?-e.amount:0)+(tw(e.users,t)?e.amount/e.users.length:0)),tA=(e,t)=>tC(t,e)||0,tN=e=>tj().map(t=>tC(t,e)).reduce((e,t)=>e+t,0),tP=()=>tx(tj().map(e=>e.amount).reduce((e,t)=>e+t,0)),tz=()=>tE().map(e=>({user:e,sum:tN(e.name)})),tI=e=>(tE().push({name:e}),tO(),!0),tL=[{name:"simple",description:x(`The users are sorted by their sum of expenses. Starting with 
       the least amount, the users will pay the next user in the list 
       until the sum is 0. Note that this might potentially result in 
       large transactions.`),calculateTransactions:(e,t)=>{let n=[],r=tz().sort((e,t)=>e.sum-t.sum);return(//  result.push(startingPoint);
r.forEach((e,t)=>{0!==e.sum&&t<r.length-1&&(n.push({name:e.user.name,transactions:[{receiver:r[t+1].user.name,amount:e.sum}]}),r[t+1].sum+=e.sum)}),n)}},{name:"largest bulk",description:x(`We try to reduce the amount 
       of money within the transactions and create few transactions. It starts 
       by paying of the most expensive user with the 
       cheapest user. Then it will try to pay of the 
       second most expensive user with the second cheapest 
       user and so on. This will result in the least amount of transactions.`),calculateTransactions:(e,t)=>{let n=[],r=tz(),o=()=>r.every(e=>0===e.sum),a=0;for(;!o()&&a++<10;){r.sort((e,t)=>e.sum-t.sum);let e=tv(r),t=tg(r),o=n.find(t=>t.name===e.user.name)||tg(ty(n,{name:e.user.name,transactions:[]})),a=e.sum+t.sum>0?e.sum:-t.sum;e.sum=e.sum-a,t.sum=t.sum+a,o.transactions.push({receiver:t.user.name,amount:a}),r=r.filter(e=>0!==tx(e.sum))}return console.log(n),n}}],tR=e=>tL.find(t=>t.name===e)||tv(tL),t$=()=>{tj().push({title:tM.title,amount:tM.amount,user:tM.user,users:Object.keys(tM.users).filter(e=>tM.users[e])}),Object.assign(tM,{title:"",amount:0,user:"",users:{}}),tO(),tF=!tF};let t_=/*@__PURE__*/t(a).parseQueryString(window.location.search);t_.data&&Object.assign(tk,JSON.parse(decodeURIComponent(atob(t_.data).split("").map(function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)}).join("")))),x.setLanguage(tk.language),tk.selectedStrategy||(tk.selectedStrategy="largest bulk");const tM={title:"",amount:0,user:"",users:{}},tU=["$","€","\xa5","\xa3"];let tF=!0;const tJ=()=>tF=!tF;let tD="";const tW=e=>{tk.expenses.splice(e,1)},tZ=()=>{let e=!1;return{view:t=>{let{a:n,b:r}=t.attrs;return F({onmouseenter:t=>{console.log(t),e=!0},onmouseleave:t=>{console.log(t),e=!1}},e?n:r)}}};/*@__PURE__*/t(a).mount(document.body,{view:e=>[F.container([[F.row(/*@__PURE__*/t(a)("div",{class:"col-md-6 col-sm-12"},O("Splitter",e2.small({onclick:e=>(tk.users=[],tk.expenses=[])},x("clear")),eb.small(tP()),ta({value:tk.currency,oninput:e=>(tk.currency=e.target.value,tO())},tU.map(e=>tn(e))),ta({value:tk.language,oninput:e=>{tk.language=e.target.value,x.setLanguage(e.target.value),tO()}},x.getLanguages().map(e=>tn(e))))),/*@__PURE__*/t(a)("div",{class:"col-md-6 col-sm-12 mt15"},e9({placeHolder:x("John Doe"),value:tT.name,oninput:e=>tT.name=e.target.value}),e2({onclick:e=>tI(tT.name)&&(tT.name="")},eb({class:"icon-user"}),x("Add User"))))],H(),tF?F.w3AnimateRight([eQ.fullHeight(e0(e1(eY(),tE().map(e=>eY(e.name)))),eV(tj().map((e,n)=>e1({"data-label":e.title},eX(/*@__PURE__*/t(a)(tZ,{key:n,b:[e.title,"(",e.amount,tk.currency,")"],a:e2.small.secondary({onclick:e=>tW(n)},/*@__PURE__*/t(a).trust("&times;"))})),tE().map(e=>e.name).map(t=>eX({"data-label":t},tx(tA(t,e)))))),e1(eX(Y(x("Sum"))),tE().map(e=>tb(tx(tN(e.name)),t=>eX[({true:"positive",false:"negative"})[t>0]]({"data-label":e.name},t,tk.currency)))))),e2.primary({onclick:e=>{tJ()}},eb({class:"icon-cart"}),"+")]):F.w3AnimateLeft([e5(x("What?")),e9({placeHolder:x("Expense"),value:tM.title,oninput:e=>tM.title=e.target.value}),en(),e5(x("How much?")),e9({type:"number",value:tM.amount,oninput:e=>tM.amount=parseFloat(e.target.value)}),tk.currency,en(),e5(x("Who payed it?")),ta({value:tM.user,oninput:e=>tM.user=e.target.value},tE().map(e=>tn(e.name))),en(),e5(x("Who enjoyed it?")),F.buttonGroup(e2({onclick:e=>tE().map(e=>e.name).forEach(e=>tM.users[e]=!0)},"ALL"),e2({onclick:e=>tE().map(e=>e.name).forEach(e=>tM.users[e]=!1)},"NONE")),F.buttonGroup(tE().map(e=>e2[({true:"inverse",false:""})[!!tM.users[e.name]]]({onclick:t=>tM.users[e.name]=!tM.users[e.name]},e.name))),// pre(JSON.stringify(nextExpense)),
    e2.secondary({onclick:e=>tJ()},/*@__PURE__*/t(a).trust("&times;")),e2.tertiary({onclick:e=>{t$()}},"+")])]),H(),T(x("Split")),ta({value:tk.selectedStrategy,oninput:e=>tk.selectedStrategy=e.target.value},tL.map(e=>tn(e.name))),K(tR(tk.selectedStrategy).description),tk.selectedStrategy?tR(tk.selectedStrategy).calculateTransactions(tj(),tE()).map(e=>K(e.transactions.map(t=>F(Y(e.name)," ",x("pays")," ",Y(t.receiver)," ",ec(-tx(t.amount)),"",tk.currency)))):null,H(),F.container(F.row(F["col-md-2"](eb({class:"icon-share"}),x("Share the current state by copying this link.")),F["col-md-7 col-sm-12"](Q.overflowHidden.$linktext(window.location.href),x("The link will change with each change you make."),tD?F.toast(tD):null),F["col-md-3"](e2({onclick:e=>(function(e){if(tD="",document.selection){// IE
        var n=document.body.createTextRange();n.moveToElementText(document.getElementById(e)),n.select()}else if(window.getSelection){var n=document.createRange();n.selectNode(document.getElementById(e)),window.getSelection().removeAllRanges(),window.getSelection().addRange(n)}try{tD=document.execCommand("copy")?x("Copied!"):x("Unable to copy!")}catch(e){tD=x("Unsupported Browser!")}setTimeout(()=>{tD="",/*@__PURE__*/t(a).redraw()},2e3)})("linktext")},x("Select link")))))]});//# sourceMappingURL=index.8b10a0a0.js.map

//# sourceMappingURL=index.8b10a0a0.js.map
