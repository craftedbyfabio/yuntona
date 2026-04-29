// ─── Yuntona Shared Nav: Platform dropdown + Mobile hamburger ───
(function(){
  var dd=document.getElementById('platformDropdown');
  if(!dd)return;
  var trigger=dd.querySelector('.nav-dropdown-trigger');
  var menu=dd.querySelector('.nav-dropdown-menu');
  var items=menu.querySelectorAll('.nav-dropdown-item');

  function openDD(){dd.classList.add('open');trigger.setAttribute('aria-expanded','true')}
  function closeDD(){dd.classList.remove('open');trigger.setAttribute('aria-expanded','false')}
  function toggleDD(){dd.classList.contains('open')?closeDD():openDD()}

  trigger.addEventListener('click',function(e){e.stopPropagation();toggleDD()});
  dd.addEventListener('mouseenter',function(){if(window.innerWidth>768)openDD()});
  dd.addEventListener('mouseleave',function(){if(window.innerWidth>768)closeDD()});

  menu.addEventListener('keydown',function(e){
    var idx=Array.from(items).indexOf(document.activeElement);
    if(e.key==='ArrowDown'){e.preventDefault();items[(idx+1)%items.length].focus()}
    else if(e.key==='ArrowUp'){e.preventDefault();items[(idx-1+items.length)%items.length].focus()}
    else if(e.key==='Escape'){closeDD();trigger.focus()}
    else if(e.key==='Tab'){closeDD()}
  });

  document.addEventListener('click',function(e){if(!dd.contains(e.target))closeDD()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeDD()});
})();

(function(){
  var btn=document.getElementById('navHamburger');
  var mobile=document.getElementById('navMobile');
  if(!btn||!mobile)return;
  var openIcon=document.getElementById('hamburgerIcon');
  var closeIcon=document.getElementById('closeIcon');

  function toggleMobile(){
    var isOpen=mobile.classList.toggle('open');
    btn.setAttribute('aria-expanded',isOpen);
    openIcon.style.display=isOpen?'none':'block';
    closeIcon.style.display=isOpen?'block':'none';
    btn.setAttribute('aria-label',isOpen?'Close menu':'Open menu');
    document.body.style.overflow=isOpen?'hidden':'';
  }

  btn.addEventListener('click',toggleMobile);
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&mobile.classList.contains('open'))toggleMobile();
  });
  window.addEventListener('resize',function(){
    if(window.innerWidth>768&&mobile.classList.contains('open'))toggleMobile();
  });
  mobile.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){if(mobile.classList.contains('open'))toggleMobile()});
  });
})();
