parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"mpVp":[function(require,module,exports) {
var e=io(),n=document.querySelector("form"),t=document.querySelector("#m"),u=document.querySelector("#n"),o=document.querySelector(".messages"),r=document.querySelector(".typing"),a={name:"",status:""};function i(){a.name=prompt("enter your name"),""!=a.name&&e.emit("user login",a.name),u.value=a.name}function c(){typing=!1,e.emit("user typing",typing)}var m=function(){var n=!1,t=null;return function(u){n=!0,e.emit("user typing",{typing:n,user:a.name}),clearTimeout(t),t=setTimeout(c,u)}}();function s(e){var n=e.typing,t=e.user;r.textContent=n?"".concat(t," is typing..."):""}function l(){console.log("new user joined")}function g(n){if(n.preventDefault(),""!=t.value&&""!=u.value){var o={message:t.value,author:u.value};t.value="",e.emit("chat message",o)}}function v(e){var n=e.message,t=e.author;o.innerHTML+="<li>".concat(t,": ").concat(n,"</li>"),r.textContent=""}i(),n.addEventListener("submit",g),t.addEventListener("input",function(){m(1500)}),e.on("chat message",v),e.on("user typing",s),e.on("new user",l);
},{}]},{},["mpVp"], null)
//# sourceMappingURL=/script.js.map