document.querySelectorAll('[data-product]').forEach(link=>link.addEventListener('click',()=>{document.getElementById('product').value=link.dataset.product;}));
const businessEmail='merchdistrictstudio@gmail.com';
function projectBrief(form){
 const data=new FormData(form);
 return ['MERCHDISTRICT STUDIO','Quote request','',...['name','email','product','quantity','date','artwork','details'].map(key=>({name:'Name',email:'Email',product:'Product',quantity:'Estimated quantity',date:'Ideal delivery date',artwork:'Artwork status',details:'Project details'}[key])+': '+(data.get(key)||'Not specified')),'','Please confirm pricing, specifications, payment terms and delivery timing.'].join('\n');
}
document.getElementById('projectform').addEventListener('submit',function(event){
 event.preventDefault(); if(!this.reportValidity())return;
 const body=projectBrief(this),subject='MerchDistrict quote request — '+new FormData(this).get('product');
 const result=document.getElementById('result');result.hidden=false;result.textContent='Your email draft is ready to open. Review it and press Send in your email app. If it does not open, download a copy below and email it to '+businessEmail+'.';
 window.location.href='mailto:'+businessEmail+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
});
document.getElementById('downloadbrief').addEventListener('click',()=>{
 const form=document.getElementById('projectform');if(!form.reportValidity())return;
 const blob=new Blob([projectBrief(form)],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='MerchDistrict_Quote_Request.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 const result=document.getElementById('result');result.hidden=false;result.textContent='Your brief is ready to download. Email it to '+businessEmail+' to request your quote. No email has been sent by this website.';
});
const menu=document.querySelector('.menubtn');menu.addEventListener('click',()=>{const opened=document.querySelector('header').classList.toggle('open');menu.setAttribute('aria-expanded',String(opened));menu.textContent=opened?'Close −':'Menu +';});
document.querySelectorAll('header nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('header').classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='Menu +';}));
const dialog=document.getElementById('photodialog');
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{const img=document.getElementById('largephoto');img.src=button.dataset.photo;img.alt=button.dataset.caption;document.getElementById('photocaption').textContent=button.dataset.caption;dialog.showModal();}));
document.getElementById('closephoto').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
