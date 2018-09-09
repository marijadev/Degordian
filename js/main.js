"use strict";

(function ($) {
    $(document).ready(function () {
        heroSlider();
        fadeInViewport();
        openForm();
        initCounter();
        initCounterSlider();
        mobileMenu();
        footerMenu();
        customLoadingFx();
        scrollTo();
    });

    function heroSlider() {
        var heroSwiper = new Swiper('.swiper-container.hero-swiper', {
            speed: 2500,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            loop: true,
            pagination: {
                el: '#hs-nav-bullets',
                clickable: true,
            },
            navigation: {
                nextEl: '#hs-nav-right',
                prevEl: '#hs-nav-left',
            },
        });

        heroSwiper.on('slideChangeTransitionStart', function () {
            var tl = new TimelineLite();
            var $tagline = $('.swiper-slide-active .hs-tagline');
            var $title = $('.swiper-slide-active .hs-title');
            var $description = $('.swiper-slide-active .hs-description');
            var $btn = $('.swiper-slide-active .btn');
            tl.fromTo($tagline, 0.5, {
                y: 50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1
            }, 1)
            tl.fromTo($title, 0.5, {
                y: 50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1
            })
            tl.fromTo($description, 0.5, {
                y: 50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1
            })
            tl.fromTo($btn, 0.5, {
                y: 50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1
            })
        });
    }

    function initCounter() {
        var $countersHolder = $('#counters');
        var $counters = $('.counter-val');
        var isVisible = false;

        function count() {
            $counters.each(function () {
                var $current = $(this);
                var $dataVal = $current.data('val');

                $current.countTo({
                    from: 0,
                    to: $dataVal,
                    speed: 500,
                    refreshInterval: 5,
                });
            });
        }

        $(window).scroll(function () {
            if ($countersHolder.isOnScreen() && isVisible === false) {
                isVisible = true;
                count();
            }
        });
    }

    function initCounterSlider() {
        if ($(window).width() <= 768) {
            var counterSwiper = new Swiper('.swiper-container.counter-swiper', {
                speed: 500,
                slidesPerView: 1,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                loop: true,
                pagination: {
                    el: '.counter-swiper .slider-nav',
                    clickable: true
                },
            })
        }
    }


    function fadeInViewport() {
        var fadeInUpElements = $('.fade-in-up');
        fadeInUpElements.each(function () {
            var current = $(this);
            var $dataDelay = $(window).width() > 768 ? current.data('delay') : 0;
            var isVisible = false;
            var tl = new TimelineLite();

            $(window).scroll(function () {
                if (current.isOnScreen() && isVisible === false) {
                    isVisible = true;
                    tl.fromTo(current, 0.5, {
                        y: 50,
                        opacity: 0
                    }, {
                        y: 0,
                        opacity: 1
                    }, $dataDelay)
                }
            })
        });
    }

    function openForm() {
        var $button = $('#open-form');
        var $close = $('#close-form');
        var $contactForm = $('.contact-form-holder');
        $contactForm.slideUp(0);
        $button.on('click', function () {
            $contactForm.slideDown();
        })
        $close.on('click', function () {
            $contactForm.slideUp();
        })
    }

    function mobileMenu() {
        var mainHeader = $('#main-header');
        var mobileMenuTrigger = $('#mobile-menu-trigger');
        var mainNav = $('.main-nav-center');

        mobileMenuTrigger.on('click', function () {
            if (mainHeader.hasClass('mobile-menu-visible')) {
                mainNav.slideUp(300);
                mainHeader.removeClass('mobile-menu-visible')
            } else {
                mainNav.slideDown(300);
                mainHeader.addClass('mobile-menu-visible')
            }
        })
    }

    function footerMenu() {
        var footerNavCol = $('.footer-nav-title');
        var footerMenu = $('.footer-menu');

        if ($(window).width() <= 768) {
            footerMenu.slideUp()
            footerNavCol.on('click', function () {
                $(this).siblings(footerMenu).slideToggle();

            })
        }
    }

    function customLoadingFx() {
        var isVisible = false;
        var rect = $('.rect.scale-to-left');

        if ($(window).width() > 768) {
            $(window).scroll(function () {
                if (rect.isOnScreen() && isVisible === false) {
                    isVisible = true;
                    TweenMax.fromTo(rect, 0.4, {
                        x: '100%',
                    }, {
                        x: '0%',
                    }, .2)
                }
            })
        }
    }

    function scrollTo() {
        var scrollDown = $('#hs-scroll-down');
        var slider = $('#hero-slider');
        var backToTop = $('#back-to-top');

        scrollDown.on('click', function () {
            $('html, body').animate({
                scrollTop: slider.offset().top + slider.height()
            }, 400);
        })

        backToTop.on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 400);
        })
    }

})(jQuery);