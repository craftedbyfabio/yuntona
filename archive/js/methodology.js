/* Methodology — TOC active-section highlight on scroll. */
(function () {
  var sections = ['philosophy', 'principles', 'sources', 'mapping', 'inclusion', 'transparency'];
  var links = {};
  sections.forEach(function (id) {
    links[id] = document.querySelector('.toc-nav a[href="#' + id + '"]');
  });

  function update() {
    var y = window.scrollY + 200;
    var active = sections[0];
    for (var i = 0; i < sections.length; i++) {
      var el = document.getElementById(sections[i]);
      if (el && el.offsetTop <= y) active = sections[i];
    }
    Object.keys(links).forEach(function (id) {
      var a = links[id];
      if (a) a.classList.toggle('active', id === active);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();
