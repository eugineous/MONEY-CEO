// Dark mode toggle
function toggleTheme(){
  const html=document.documentElement;
  const current=html.getAttribute('data-theme')||'light';
  const next=current==='light'?'dark':'light';
  html.setAttribute('data-theme',next);
  localStorage.setItem('moneyceo_theme',next);
}
(function(){
  const saved=localStorage.getItem('moneyceo_theme');
  if(saved){document.documentElement.setAttribute('data-theme',saved);}
})();
