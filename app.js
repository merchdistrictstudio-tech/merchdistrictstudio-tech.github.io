document.querySelectorAll('[data-product]').forEach(link=>link.addEventListener('click',()=>{document.getElementById('product').value=link.dataset.product;}));
const businessEmail='merchdistrictstudio@gmail.com';
const quoteForm=document.getElementById('projectform');
const submitButton=quoteForm.querySelector('button[type="submit"]');
submitButton.innerHTML='Submit quote request <span>→</span>';
quoteForm.querySelector('.privacy').textContent='Submit your details directly to MerchDistrict Studio. You will see a Google Forms confirmation when your request is recorded. No payment is required.';
document.getElementById('downloadbrief').textContent='Download a copy';
const brief=document.getElementById('brief');
const walker=document.createTreeWalker(brief,NodeFilter.SHOW_TEXT);
while(walker.nextNode()){if(walker.currentNode.nodeValue.includes(', or use the form to prepare your request.'))walker.currentNode.nodeValue=walker.currentNode.nodeValue.replace(', or use the form to prepare your request.',', or submit your request below.');}
function projectBrief(form){
 const data=new FormData(form);
 return ['MERCHDISTRICT STUDIO','Quote request','',...['name','email','product','quantity','date','artwork','details'].map(key=>({name:'Name',email:'Email',product:'Product',quantity:'Estimated quantity',date:'Ideal delivery date',artwork:'Artwork status',details:'Project details'}[key])+': '+(data.get(key)||'Not specified')),'','Please confirm pricing, specifications, payment terms and delivery timing.'].join(String.fromCharCode(10));
}
quoteForm.addEventListener('submit',function(event){
 event.preventDefault(); if(!this.reportValidity())return;
 const data=new FormData(this);
 const values={
  'entry.357329825':data.get('name'),
  'entry.515638877':data.get('email'),
  'entry.721676725':data.get('product'),
  'entry.1191890676':'Artwork status: '+data.get('artwork')+String.fromCharCode(10)+'Project details: '+(data.get('details')||'To be discussed'),
  'entry.656863399':data.get('quantity'),
  'entry.1189985383':data.get('date')||'Flexible / not specified'
 };
 const submission=document.createElement('form');
 submission.method='POST';
 submission.action='https://docs.google.com/forms/u/0/d/e/1FAIpQLScjPdt0-gf7KPRxy8qodL6LXkVIwWoXGubwFq8uwQWrfBXn2g/formResponse';
 for(const [name,value] of Object.entries(values)){const input=document.createElement('input');input.type='hidden';input.name=name;input.value=value;submission.appendChild(input);}
 submission.hidden=true;document.body.appendChild(submission);
 const result=document.getElementById('result');result.hidden=false;result.textContent='Submitting your request… Please wait for the confirmation page.';
 submission.submit();
});
document.getElementById('downloadbrief').addEventListener('click',()=>{
 if(!quoteForm.reportValidity())return;
 const blob=new Blob([projectBrief(quoteForm)],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='MerchDistrict_Quote_Request.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 const result=document.getElementById('result');result.hidden=false;result.textContent='Your copy has been downloaded. Downloading does not submit a request; use Submit quote request when you are ready.';
});
const menu=document.querySelector('.menubtn');menu.addEventListener('click',()=>{const opened=document.querySelector('header').classList.toggle('open');menu.setAttribute('aria-expanded',String(opened));menu.textContent=opened?'Close −':'Menu +';});
document.querySelectorAll('header nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('header').classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='Menu +';}));
const dialog=document.getElementById('photodialog');
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{const img=document.getElementById('largephoto');img.src=button.dataset.photo;img.alt=button.dataset.caption;document.getElementById('photocaption').textContent=button.dataset.caption;dialog.showModal();}));
document.getElementById('closephoto').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
