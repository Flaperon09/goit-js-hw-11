const e=async e=>{const n=new URLSearchParams({key:"2842151-bd094d52b36040a4b6da8b1da",format:"json",q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:1,per_page:10});console.log(`https://pixabay.com/api/?${n}`);const o=await fetch(`https://pixabay.com/api/?${n}`);if(!o.ok)throw new Error(o.statusText);return o.json()},n=document.querySelector(".search-form"),o=document.querySelector(".gallery");console.log(o);let a="";n.addEventListener("input",(e=>{a=e.target.value})),n.addEventListener("submit",(function(n){n.preventDefault(),e(a).then((e=>{var n;console.log(e),o.innerHTML=(n=e,console.log(n),n.map((({hits:[{webformatURL:e,largeImageURL:n,tags:o,likes:a,views:t,comments:s,downloads:i}]})=>`<div class="photo-card">\n  <img src="${e}" alt="${o}" loading="lazy" />\n  <div class="info">\n    <p class="info-item">\n      <b>Likes: ${a}</b>\n    </p>\n    <p class="info-item">\n      <b>Views: ${t}</b>\n    </p>\n    <p class="info-item">\n      <b>Comments: ${s}</b>\n    </p>\n    <p class="info-item">\n      <b>Downloads: ${i}</b>\n    </p>\n  </div>\n</div>`)).join(""))})).catch((e=>console.log(e)))}));
//# sourceMappingURL=index.38c5b4f1.js.map
