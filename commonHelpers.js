import{i as l,a as h,S as y}from"./assets/vendor-527658dd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const s={form:document.querySelector(".js-form"),button:document.querySelector(".js-button"),input:document.querySelector('input[name="searchQuery"]'),gallery:document.querySelector(".js-gallery"),guard:document.querySelector(".js-guard")};let d=1,i,c;s.form.addEventListener("submit",b);async function b(o){if(o.preventDefault(),s.gallery.innerHTML="",c=0,i=s.input.value.trim(),i===""){l.warning({title:"Warning",message:"Please, fill the input"});return}try{const t=await m(i,d),a=p(t);s.gallery.insertAdjacentHTML("beforeend",a),g.refresh()}catch{l.error({title:"Error",message:"Please, try again"})}finally{s.input.value=""}}async function m(o,t){const a="https://pixabay.com/api/",n="42206478-925606497870cbb45f2a85a6e",e=await h.get(a,{params:{key:n,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:40}});if(e.status!==200)throw new Error(e.statusText);return c+=e.data.totalHits,e.data.total>c?(f.observe(s.guard),l.success({title:"Horray!",message:`We found ${c} images.`})):(f.unobserve(selectors.guard),l.error({title:"Error",message:"We're sorry, but you've reached the end of search results."})),e.data.hits}function p(o){return o.map(t=>`
      <a class="photo-card" href="${t.largeImageURL}">
        <div class="image-wrapper">
          <img
            src="${t.webformatURL}"
            alt="${t.tags}"
            loading="lazy"
            class="image"
          />
        </div>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            <b> ${t.likes}</b>
          </p>
          <p class="info-item"><b>Views</b><b>${t.views}</b></p>
          <p class="info-item"><b>Comments</b><b>${t.comments}</b></p>
          <p class="info-item"><b>Downloads</b><b>${t.downloads}</b></p>
        </div>
      </a>
        `).join("")}const v={root:null,rootMargin:"300px",threshold:0},f=new IntersectionObserver(w,v);async function w(o,t){o.forEach(a=>{if(a.isIntersecting){if(d+=1,s.gallery.textContent===""){t.unobserve(s.guard);return}m(i,d).then(n=>{const e=p(n);s.gallery.insertAdjacentHTML("beforeend",e),g.refresh();const{height:r}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})})}})}const g=new y(".gallery a"),L=()=>{const t=document.getElementById("search-form").offsetTop;window.scrollTo({top:t,behavior:"smooth"})};document.querySelector(".scroll-to-top").addEventListener("click",L);
//# sourceMappingURL=commonHelpers.js.map
