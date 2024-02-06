import{S as h,i,a as y}from"./assets/vendor-527658dd.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const a={form:document.querySelector(".js-form"),button:document.querySelector(".js-button"),input:document.querySelector('input[name="searchQuery"]'),gallery:document.querySelector(".js-gallery"),guard:document.querySelector(".js-guard")},f=new h(".gallery a");let d,u,l;a.form.addEventListener("submit",b);async function b(s){if(s.preventDefault(),a.gallery.innerHTML="",l=0,d=1,u=a.input.value.trim(),u===""){i.warning({title:"Warning",message:"Please, fill the input"});return}try{const{hits:e,totalHits:n,total:o}=await g(u,d),t=m(e);if(a.gallery.insertAdjacentHTML("beforeend",t),l+=n,f.refresh(),o>=l&&w.observe(a.guard),e.length===0){i.warning({title:"Warning",message:"Sorry, there are no images matching your search query. Please try again."});return}i.success({title:"Horray!",message:`We found ${n} images.`})}catch(e){console.log(e),i.error({title:"Error",message:"Please, try again"})}finally{a.input.value=""}}async function g(s,e){const n="https://pixabay.com/api/",o="42206478-925606497870cbb45f2a85a6e";return(await y.get(n,{params:{key:o,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:40}})).data}function m(s){return s.map(e=>`
      <a class="photo-card" href="${e.largeImageURL}">
        <div class="image-wrapper">
          <img
            src="${e.webformatURL}"
            alt="${e.tags}"
            loading="lazy"
            class="image"
          />
        </div>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            <b> ${e.likes}</b>
          </p>
          <p class="info-item"><b>Views</b><b>${e.views}</b></p>
          <p class="info-item"><b>Comments</b><b>${e.comments}</b></p>
          <p class="info-item"><b>Downloads</b><b>${e.downloads}</b></p>
        </div>
      </a>
        `).join("")}const v={root:null,rootMargin:"300px",threshold:0},w=new IntersectionObserver(L,v);async function L(s,e){for(const n of s)if(n.isIntersecting){d+=1;try{const{hits:o,totalHits:t,total:r}=await g(u,d),c=m(o);if(a.gallery.insertAdjacentHTML("beforeend",c),l+=t,f.refresh(),r>l){e.observe(a.guard);const{height:p}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:p*2,behavior:"smooth"})}else e.unobserve(a.guard),i.error({title:"Error",message:"We're sorry, but you've reached the end of search results."})}catch(o){console.log(o),i.error({title:"Error",message:"Please, try again"})}}}const S=()=>{const e=document.getElementById("search-form").offsetTop;window.scrollTo({top:e,behavior:"smooth"})};document.querySelector(".scroll-to-top").addEventListener("click",S);
//# sourceMappingURL=commonHelpers.js.map
