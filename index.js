// Función para el preloader, se ejecuta cuando toda la página (imágenes incluidas) ha cargado
$(window).on('load', function() {
    // Oculta y elimina el preloader
    $('#preloader').fadeOut('slow', function() {
        $(this).remove();
    });
});

// Se ejecuta una vez que el DOM está listo
$(document).ready(function() {

    // Inicialización del menú móvil
    $('#menu-button').on('click', function() {
        // Usamos slideToggle para una animación más suave que toggleClass
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

    // --- CÓDIGO PARA LA ANIMACIÓN DE NÚMEROS ---

    // Función para animar el conteo de un número
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerHTML = Math.floor(progress * (end - start) + start) + '+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Asegurarse de que el número final sea exacto
                element.innerHTML = end + '+';
            }
        };
        window.requestAnimationFrame(step);
    }

    // --- CÓDIGO PARA EL BOTÓN DE VOLVER ARRIBA ---
    const scrollTopBtn = $('#scrollTopBtn');

    // Lógica para el click del botón
    scrollTopBtn.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800, 'easeInOutExpo');
    });


    // --- MANEJADOR DE EVENTOS DE SCROLL UNIFICADO ---
    let animationHasRun = false;
    
    $(window).on('scroll', function() {
        // Mensaje de diagnóstico para verificar que el evento de scroll funciona
        console.log('Scrolling...');

        // Lógica para el botón de volver arriba
        if ($(this).scrollTop() > 300) { // Muestra el botón después de 300px de scroll
            scrollTopBtn.css('opacity', '1').css('pointer-events', 'auto');
        } else {
            scrollTopBtn.css('opacity', '0').css('pointer-events', 'none');
        }

        // Lógica para la animación de números (se ejecuta solo una vez)
        if (!animationHasRun) {
            var statsSection = $('#stats-section');
            if (statsSection.length) {
                var windowHeight = $(window).height();
                var scrollTop = $(window).scrollTop();
                var sectionTop = statsSection.offset().top;

                if (sectionTop < (scrollTop + windowHeight - 100)) {
                    console.log('¡Sección de estadísticas visible! Iniciando animación de números.');
                    $('.stat-number').each(function() {
                        const element = this;
                        const target = +$(element).attr('data-target');
                        animateValue(element, 0, target, 2000);
                    });
                    animationHasRun = true;
                }
            }
        }
        
        // Lógica para el Scrollspy (actualizar enlace activo)
        setActiveLink();
    });


    // --- Scrollspy & Smooth Scroll ---
    
    // Función para actualizar el enlace activo en el menú
    function setActiveLink() {
        var scrollDistance = $(window).scrollTop();
        var headerHeight = $('header').outerHeight() || 70;
        var offset = 150; // Pequeño desfase para activar el enlace un poco antes

        $('.scroll-section').each(function() {
            // Se añade una comprobación para asegurarse de que el elemento existe
            if ($(this).length && $(this).position()) {
                if ($(this).position().top <= scrollDistance + headerHeight + offset) {
                    $('.nav-link.page-scroll').removeClass('active');
                    $('.nav-link.page-scroll[href="#' + $(this).attr('id') + '"]').addClass('active');
                }
            }
        });

        // Caso especial para el enlace "Inicio"
        if ($('#about').length && $('#about').position() && scrollDistance < $('#about').position().top - headerHeight - offset) {
            $('.nav-link.page-scroll').removeClass('active');
            $('.nav-link.page-scroll[href="#home"]').addClass('active');
        }
    }

    // Establecer el enlace activo al cargar la página
    setActiveLink();

    // Smooth scroll para los enlaces con la clase .page-scroll
    $('.page-scroll').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            var headerHeight = $('header').outerHeight() || 70;

            $('html, body').animate({
                scrollTop: $(hash).offset().top - headerHeight
            }, 800, 'easeInOutExpo'); // Se usa la librería jQuery Easing

            // Cierra el menú móvil si está abierto después de hacer clic
            if ($('#mobile-menu').is(':visible')) {
                $('#mobile-menu').slideUp();
            }
        }
    });

});
