// Tool page — copy-link + image error handling
// Used by [data-copy-url] buttons and [data-hide-on-error] images
// All event handling lives here because CSP disallows inline attributes

(function(){
  'use strict';

  function copyToClipboard(text){
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback for older browsers
    return new Promise(function(resolve, reject){
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        resolve();
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(ta);
      }
    });
  }

  function setupCopyButtons(){
    var buttons = document.querySelectorAll('[data-copy-url]');
    buttons.forEach(function(btn){
      btn.addEventListener('click', function(){
        var url = window.location.href;
        copyToClipboard(url).then(function(){
          var originalText = btn.querySelector('.copy-text');
          btn.classList.add('copied');
          if (originalText) {
            var original = originalText.textContent;
            originalText.textContent = 'Copied!';
            setTimeout(function(){
              originalText.textContent = original;
              btn.classList.remove('copied');
            }, 1800);
          } else {
            // Share-row style button without .copy-text span
            setTimeout(function(){ btn.classList.remove('copied'); }, 1800);
          }
        }).catch(function(){
          // Silent fail — don't interrupt the user
        });
      });
    });
  }

  function setupImageErrorHandlers(){
    var imgs = document.querySelectorAll('[data-hide-on-error]');
    imgs.forEach(function(img){
      // If already failed before JS ran
      if (img.complete && img.naturalWidth === 0) {
        img.style.display = 'none';
      }
      img.addEventListener('error', function(){
        img.style.display = 'none';
      });
    });
  }

  function init(){
    setupCopyButtons();
    setupImageErrorHandlers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
