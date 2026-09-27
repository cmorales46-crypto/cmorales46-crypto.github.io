/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// Función para descargar el fragmento de Currículum en PDF
document.addEventListener('DOMContentLoaded', function() {
  const botonPdf = document.getElementById('download-pdf');

  if (botonPdf) {
    botonPdf.addEventListener('click', function(e) {
      e.preventDefault(); // Evita recargas o comportamientos extraños en la web
      
      const elemento = document.getElementById('cv-content');
      
      if (!elemento) {
        alert('Error: No se encontró el contenedor con id="cv-content"');
        return;
      }

      // 1. Abrimos una pestaña temporal limpia en el navegador
      const ventanaImpresion = window.open('', '_blank', 'height=700,width=900');
      
      // 2. Inyectamos la estructura HTML y los estilos limpios de impresión
      ventanaImpresion.document.write('<html><head><title>CV Cesar Morales</title>');
      ventanaImpresion.document.write('<style>');
      ventanaImpresion.document.write(`
        body { 
          font-family: 'Helvetica Neue', Arial, sans-serif; 
          color: #333333; 
          margin: 20px; 
          padding: 0;
          background: #ffffff;
        }
        .row { 
          display: flex !important; 
          flex-direction: row !important; 
          width: 100%;
        }
        .col-lg-6 { 
          flex: 0 0 50% !important; 
          max-width: 50% !important; 
          width: 50%; 
          padding: 0 15px; 
          box-sizing: border-box;
        }
        h3.resume-title { 
          font-size: 16pt; 
          color: #0563bb; 
          border-bottom: 2px solid #0563bb; 
          padding-bottom: 5px; 
          margin-top: 25px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .resume-item { 
          padding: 0 0 20px 20px;
          margin-top: -2px;
          border-left: 2px solid #1f5297;
          position: relative;
        }
        .resume-item::before {
          content: "";
          position: absolute;
          width: 16px;
          height: 16px;
          border-2px: 2px solid #1f5297;
          background: #fff;
          border-radius: 50%;
          left: -9px;
          top: 0;
        }
        .resume-item h4 { 
          font-size: 12pt; 
          margin: 0 0 5px 0; 
          color: #111111; 
          font-weight: bold;
        }
        .resume-item h5 { 
          font-size: 10pt; 
          background: #eef7ff; 
          padding: 2px 10px; 
          display: inline-block; 
          margin: 5px 0; 
          font-weight: 600;
        }
        p, li { 
          font-size: 10pt; 
          line-height: 1.5; 
          margin-bottom: 8px;
        }
        ul { 
          padding-left: 20px; 
          margin-top: 5px;
        }
        li {
          margin-bottom: 4px;
        }
        em {
          font-style: italic;
          color: #555555;
        }
      `);
      ventanaImpresion.document.write('</style></head><body>');
      
      // 3. Volcamos el contenido del CV (el HTML puro con el texto)
      ventanaImpresion.document.write(elemento.innerHTML);
      ventanaImpresion.document.write('</body></html>');
      
      // 4. Cerramos la edición del documento para avisar al navegador
      ventanaImpresion.document.close(); 
      ventanaImpresion.focus();

      // 5. Esperamos de forma segura a que los elementos estén completamente dibujados
      ventanaImpresion.onload = function() {
        setTimeout(function() {
          ventanaImpresion.print();
          ventanaImpresion.close();
        }, 800); // Pausa de sincronización para que la previsualización no salga en blanco
      };

      // Respaldo de seguridad por si el navegador bloquea la acción nativa 'onload'
      setTimeout(function() {
        if (!ventanaImpresion.closed) {
          ventanaImpresion.print();
          ventanaImpresion.close();
        }
      }, 1200);
    });
  }
});



