$(window).on('load', function() {
    // Preloader
    $('#preloader').fadeOut('slow', function() {
        $(this).remove();
    });
});

$(document).ready(function(){
    // Mobile Menu Toggle
    $('#menu-button').on('click', function() {
        $('#mobile-menu').toggleClass('hidden');
    });

    // Testimonial Slider
    $('.testimonial-slider').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    });

    // Stellar.js for Parallax (solo en escritorio)
    // Stellar.js es una librería que puede causar problemas de rendimiento y no es tan común en desarrollo moderno.
    // Si la funcionalidad de parallax no es crítica o causa problemas, considera removerla o reemplazarla con CSS más moderno.
    if ($(window).width() > 768) {
        $.stellar({
            horizontalScrolling: false,
            verticalOffset: 40
        });
    }

    // --- Scrollspy & Smooth Scroll ---
    function setActiveLink() {
        var scrollDistance = $(window).scrollTop();
        // Adjust for header height
        var headerHeight = $('header').outerHeight() || 70;
        // Add a small offset to trigger the active state earlier
        var offset = 150;
        $('.scroll-section').each(function(i) {
            if ($(this).position().top <= scrollDistance + headerHeight + offset) {
                // Clear all active classes
                $('.nav-link.page-scroll').removeClass('active');
                // Add active class to the current link. We find it by its href attribute
                $('.nav-link.page-scroll[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
        // Special case for home
        if (scrollDistance < $('#about').position().top - headerHeight - offset) {
            $('.nav-link.page-scroll').removeClass('active');
            $('.nav-link.page-scroll[href="#home"]').addClass('active');
        }
    }

    // Set initial active link
    setActiveLink();
    // Update active link on scroll
    $(window).on('scroll', setActiveLink);

    // Smooth scrolling for page-scroll links
    $('.page-scroll').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            var headerHeight = $('header').outerHeight() || 70;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - headerHeight
            }, 800, 'easeInOutExpo');

            // Close mobile menu if open
            if (!$('#mobile-menu').hasClass('hidden')) {
                $('#mobile-menu').addClass('hidden');
            }

        }




        //animacion de numeros
        $(document).ready(function() {

    // Inicialización del menú móvil
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

    // Inicialización de Stellar.js para el efecto parallax
    $(window).stellar();

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

    // Usar Intersection Observer para detectar cuándo la sección es visible
    const statsSection = document.getElementById('stats-section');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si la sección de estadísticas está en la vista
            if (entry.isIntersecting) {
                const statNumbers = document.querySelectorAll('.stat-number');
                statNumbers.forEach(numberElement => {
                    const target = +numberElement.getAttribute('data-target');
                    // Iniciar la animación
                    animateValue(numberElement, 0, target, 2000); // Animar durante 2 segundos
                });
                // Dejar de observar una vez que la animación ha comenzado
                observer.unobserve(statsSection);
            }
        });
    }, {
        threshold: 0.5 // La animación se dispara cuando el 50% de la sección es visible
    });

    // Empezar a observar la sección de estadísticas
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Smooth scroll para los enlaces de navegación
    $('.page-scroll').on('click', function(e) {
        var target = $(this.hash);
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70 // Ajustar el offset para el header fijo
            }, 1000, 'easeInOutExpo');

            // Para el menú móvil, ciérralo después de hacer clic
            if ($('#mobile-menu').is(':visible')) {
                $('#mobile-menu').slideUp();
            }
        }
    });

    // Activar el estado del enlace de navegación al hacer scroll
    $(window).on('scroll', function() {
        var scrollPos = $(document).scrollTop();
        $('.nav-link').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos + 75 && refElement.position().top + refElement.height() > scrollPos + 75) {
                $('.nav-link').removeClass("active");
                currLink.addClass("active");
            }
            else{
                currLink.removeClass("active");
            }
        });
    });

});

        
    });
});
