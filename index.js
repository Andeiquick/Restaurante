$(document).ready(function() {
    // Función para el menú móvil
    $('#menu-button').on('click', function() {
        $('#mobile-menu').slideToggle();
    });

    // Inicialización de Slick Carousel para testimonios
    $('.testimonial-slider').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 5000,
    });

    // Inicialización de Stellar.js para el efecto parallax (solo en pantallas grandes)
    if ($(window).width() > 768) {
        $(window).stellar({
            horizontalScrolling: false,
            verticalOffset: 40
        });
    }

    // Función para animar el conteo de un número
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString() + '+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.innerHTML = end.toLocaleString() + '+';
            }
        };
        window.requestAnimationFrame(step);
    }

    // Lógica para el botón de volver arriba
    const scrollTopBtn = $('#scrollTopBtn');
    scrollTopBtn.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800, 'easeInOutExpo');
    });

    // Manejador de eventos de scroll unificado
    let animationHasRun = false;
    $(window).on('scroll', function() {
        const scrollPos = $(this).scrollTop();

        // Muestra u oculta el botón de volver arriba
        if (scrollPos > 300) {
            scrollTopBtn.css('opacity', '1').css('pointer-events', 'auto');
        } else {
            scrollTopBtn.css('opacity', '0').css('pointer-events', 'none');
        }

        // Inicia la animación de números cuando la sección es visible (solo una vez)
        if (!animationHasRun) {
            const statsSection = $('#stats-section');
            if (statsSection.length) {
                const sectionTop = statsSection.offset().top;
                const windowHeight = $(window).height();
                if (sectionTop < (scrollPos + windowHeight - 100)) {
                    $('.stat-number').each(function() {
                        const element = this;
                        const target = +$(element).data('target');
                        animateValue(element, 0, target, 2000);
                    });
                    animationHasRun = true;
                }
            }
        }
        
        // Actualiza el enlace activo en el menú de navegación
        setActiveLink();
    });

    // Función para el Scrollspy (actualizar enlace activo)
    function setActiveLink() {
        const scrollDistance = $(window).scrollTop();
        const headerHeight = $('header').outerHeight() || 70;
        const offset = headerHeight + 50;
        let activeSectionId = "";

        $('.scroll-section').each(function() {
            if ($(this).offset().top <= scrollDistance + offset) {
                activeSectionId = $(this).attr('id') || "";
            }
        });
        
        const activeLink = $('.nav-link.page-scroll[href="#' + activeSectionId + '"]');

        if (!activeLink.hasClass('active')) {
            $('.nav-link.page-scroll').removeClass('active');
            activeLink.addClass('active');
        }
    }

    // Establece el enlace activo al cargar la página
    setActiveLink();

    // Smooth scroll para los enlaces con la clase .page-scroll
    $('.page-scroll').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            var headerHeight = $('header').outerHeight() || 70;

            $('html, body').animate({
                scrollTop: $(hash).offset().top - headerHeight
            }, 800, 'easeInOutExpo');

            // Cierra el menú móvil si está abierto después de hacer clic
            if ($('#mobile-menu').is(':visible')) {
                $('#mobile-menu').slideUp();
            }
        }
    });
});
