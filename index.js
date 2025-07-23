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
    });
});
