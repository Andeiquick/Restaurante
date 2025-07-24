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

    // Usar Intersection Observer para detectar cuándo la sección de estadísticas es visible
    const statsSection = document.getElementById('stats-section');
    // Variable para asegurar que la animación se ejecute solo una vez
    let animationHasRun = false; 
    
    if (statsSection) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Si la sección es visible y la animación no se ha ejecutado
                if (entry.isIntersecting && !animationHasRun) {
                    const statNumbers = document.querySelectorAll('.stat-number');
                    statNumbers.forEach(numberElement => {
                        const target = +numberElement.getAttribute('data-target');
                        // Iniciar la animación
                        animateValue(numberElement, 0, target, 2000); // Animar durante 2 segundos
                    });
                    animationHasRun = true; // Marcar que la animación ya se ejecutó
                    // Opcional: Dejar de observar después de la animación
                    observer.unobserve(statsSection);
                }
            });
        }, {
            threshold: 0.5 // La animación se dispara cuando el 50% de la sección es visible
        });
        // Empezar a observar la sección
        observer.observe(statsSection);
    }

    // --- Scrollspy & Smooth Scroll ---
    
    // Función para actualizar el enlace activo en el menú
    function setActiveLink() {
        var scrollDistance = $(window).scrollTop();
        var headerHeight = $('header').outerHeight() || 70;
        var offset = 150; // Pequeño desfase para activar el enlace un poco antes

        $('.scroll-section').each(function() {
            if ($(this).position().top <= scrollDistance + headerHeight + offset) {
                $('.nav-link.page-scroll').removeClass('active');
                $('.nav-link.page-scroll[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });

        // Caso especial para el enlace "Inicio"
        if (scrollDistance < $('#about').position().top - headerHeight - offset) {
            $('.nav-link.page-scroll').removeClass('active');
            $('.nav-link.page-scroll[href="#home"]').addClass('active');
        }
    }

    // Establecer el enlace activo al cargar la página y al hacer scroll
    setActiveLink();
    $(window).on('scroll', setActiveLink);

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
