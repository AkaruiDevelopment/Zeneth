(()=>{"use strict";var a={893:(e,t,a)=>{a.r(t)},555:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.HierarchyManager=void 0;const s=a(498);t.HierarchyManager=class{constructor(){this.stateManager=new s.StateManager,this.titleSelector=".js-category-title",this.listSelector=".js-category-list"}init(){this.addListeners(),this.initSaved(),this.openCurrentPath()}openPathAndSave(e){this.openPath(e),this.stateManager.addOpenedPath(e)}openPath(e){var e=document.querySelector(this.listSelector+`[data-id="${e}"]`);e&&(e.classList.add("_open"),null!=(e=null==(e=e.parentNode)?void 0:e.querySelector(this.titleSelector)))&&e.classList.add("_open")}closePath(e){var t=document.querySelector(this.listSelector+`[data-id="${e}"]`);t&&(t.classList.remove("_open"),null!=(t=null==(t=t.parentNode)?void 0:t.querySelector(this.titleSelector))&&t.classList.remove("_open"),this.stateManager.removeOpenedPath(e))}closePathWithChildren(e){this.closePath(e);var t=document.querySelector(this.listSelector+`[data-id="${e}"]`);if(t)for(const e of t.querySelectorAll(this.listSelector))this.closePath(e.dataset.id||"")}togglePath(e){var t=document.querySelector(this.listSelector+`[data-id="${e}"]`);t&&(t.classList.contains("_open")?this.closePathWithChildren(e):this.openPathAndSave(e))}addListeners(){for(const t of document.querySelectorAll('.js-category-title:not([data-id="root"])'))t.addEventListener("click",()=>{var e=t.dataset.id||"";this.togglePath(e)});this.addExpandListener(),this.addCollapseListener(),this.addTargetListener()}addExpandListener(){var e=document.querySelector(".js-tree-expand");null!=e&&e.addEventListener("click",()=>{const e=document.querySelectorAll(this.listSelector);for(const t of e){const e=t.dataset.id||"";this.openPathAndSave(e)}})}addCollapseListener(){var e=document.querySelector(".js-tree-collapse");null!=e&&e.addEventListener("click",()=>{const e=document.querySelectorAll(this.listSelector);for(const t of e){const e=t.dataset.id||"";this.closePath(e)}})}addTargetListener(){var e=document.querySelector(".js-tree-target");null!=e&&e.addEventListener("click",()=>{var e=this.openCurrentPath();null!=e&&e.scrollIntoView()})}initSaved(){for(const e of this.stateManager.getOpenedPaths())this.openPath(e)}openCurrentPath(){const e=window.location.pathname.split("/"),t=`/${e[e.length-2]||""}/`+(e[e.length-1]||""),a=document.querySelector(`.js-category-link[data-id="${t}"]`);if(!a)return null;a.classList.add("_active");let s=a.closest(this.listSelector);for(;s;){const e=s.dataset.id||"";this.openPath(e),s=s.parentNode.closest(this.listSelector)}return a}}},498:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.StateManager=void 0,t.StateManager=class{constructor(){this.openedPathLsKey="opened-path-state",this.openedPaths=[];var e=localStorage.getItem("opened-path-state");this.openedPaths=e?JSON.parse(e):[]}addOpenedPath(e){this.openedPaths.push(e),this.updateState()}removeOpenedPath(t){this.openedPaths=this.openedPaths.filter(e=>e!==t),this.updateState()}getOpenedPaths(){return this.openedPaths}updateState(){localStorage.setItem(this.openedPathLsKey,JSON.stringify(this.openedPaths))}}}},s={};function o(e){var t=s[e];return void 0!==t||(t=s[e]={exports:{}},a[e](t,t.exports,o)),t.exports}o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o(893),(new(o(555).HierarchyManager)).init()})();