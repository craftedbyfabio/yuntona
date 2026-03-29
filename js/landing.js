// ─── Yuntona Landing Page: Tabs, Toggles, FAQ, Animations ───

// Feature tabs
document.querySelectorAll('.tab-btn').forEach(function(b){
  b.addEventListener('click',function(){
    document.querySelectorAll('.tab-btn').forEach(function(x){x.classList.remove('active')});
    document.querySelectorAll('.tab-panel').forEach(function(p){p.classList.remove('active')});
    b.classList.add('active');
    document.getElementById('tab-'+b.dataset.tab).classList.add('active');
  });
});

// OWASP framework toggle
document.querySelectorAll('.fw-btn').forEach(function(b){
  b.addEventListener('click',function(){
    document.querySelectorAll('.fw-btn').forEach(function(x){x.classList.remove('active')});
    document.querySelectorAll('.fw-panel').forEach(function(p){p.classList.remove('active')});
    b.classList.add('active');
    document.getElementById('fw-'+b.dataset.fw).classList.add('active');
  });
});

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(function(q){
  q.addEventListener('click',function(){
    var item=q.parentElement;
    var wasOpen=item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(function(i){i.classList.remove('open')});
    if(!wasOpen)item.classList.add('open');
  });
});

// Scroll animations
var obs=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}
  });
},{threshold:.1});
document.querySelectorAll('.anim').forEach(function(el){obs.observe(el)});
