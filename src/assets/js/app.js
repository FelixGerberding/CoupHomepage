var $ = window.jQuery = require("jquery")
require("owl.carousel")
require("magnific-popup")
var Swiper = require('swiper');
var scrollspy = require('scrollspy')
 
var coup = function() {};

coup.prototype.initSticky = function() {
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 40) {
            $(".navbar-sticky").addClass("darkheader");
        } else {
            $(".navbar-sticky").removeClass("darkheader");
        } 
    }); 
} 

coup.prototype.initAnimatedScrollMenu = function() {
        $('.navigation-menu a').on('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 0
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    },

    coup.prototype.initOwlCarousel = function() {
        $("#owl-demo").owlCarousel({
            autoPlay: 3000, //Set AutoPlay to 3 seconds
            items: 1,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 3]
        });
    }

coup.prototype.initMainMenu = function() {
        var scroll = $(window).scrollTop();

        $('.navbar-toggle').on('click', function(event) {
            $(this).toggleClass('open');
            $('#navigation').slideToggle(400);
        });

        $('.navigation-menu>li').slice(-2).addClass('last-elements');

        $('.menu-arrow,.submenu-arrow').on('click', function(e) {
            if ($(window).width() < 992) {
                e.preventDefault();
                $(this).parent('li').toggleClass('open').find('.submenu:first').toggleClass('open');
            }
        });
    },

    coup.prototype.initScrollspy = function() {
        scrollspy.add($("#navigation", {offset: 50}));
    } 
  
    coup.prototype.initSwiper = function() {
        var swiper = new Swiper('.swiper-container', {
            effect: 'coverflow',
            loop: true,
            centeredSlides: true,
            slidesPerView: 2,
            initialSlide: 3,
            keyboardControl: true,
            mousewheelControl: true,
            lazyLoading: true,
            preventClicks: false,
            preventClicksPropagation: false,
            lazyLoadingInPrevNext: true,
            coverflow: {
                rotate: 0,
                depth: 200,
                modifier: 1,
                slideShadows: false,
                slidesPerView: 3,
            }
        });
    },

    coup.prototype.initContact = function() {
        $('#contact-form').submit(function() {
            var action = $(this).attr('action');
            $("#message").slideUp(750, function() {
                $('#message').hide();

                $('#submit')
                    .before('')
                    .attr('disabled', 'disabled');

                $.post(action, {
                        name: $('#name').val(),
                        email: $('#email').val(),
                        comments: $('#comments').val(),
                    },
                    function(data) {
                        document.getElementById('message').innerHTML = data;
                        $('#message').slideDown('slow');
                        $('#cform img.contact-loader').fadeOut('slow', function() {
                            $(this).remove()
                        });
                        $('#submit').removeAttr('disabled');
                        if (data.match('success') != null) $('#cform').slideUp('slow');
                    }
                );

            });

            return false;

        });
    },

    coup.prototype.init = function() {
        this.initSticky();
        this.initAnimatedScrollMenu();
        this.initOwlCarousel();
        this.initMainMenu();
        this.initScrollspy();
        this.initSwiper();
        this.initContact();

    },

    $.coup = new coup, $.coup.Constructor = coup

$.coup.init();