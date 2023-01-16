'use strict'

$(document).ready(function () {
    const rem = function (rem) {
        if ($(window).width() > 768) {
            return 0.005208335 * $(window).width() * rem;
        } else {
            // где 375 это ширина моб версии макета
            return (100/375) * (0.05 * $(window).width()) * rem;
        }
    }

    // Masked input
    $('.input-phone').mask('+7 (999) 999-99-99');

    // Main page, scroll effect
    if ($('.banner').length) {
        let scrollVal = (document.body.scrollTop+0 || document.documentElement.scrollTop+0);

        let banners = [],
            bannersActive = [],
            banHeight = $('.banner').height();

        for (let i = 1; i < $('.banner').length; i++) {
            if (scrollVal <= i * banHeight) {
                banners.push(i * banHeight);
            } else {
                bannersActive.unshift(i * banHeight);
            }
        }

        $('.banner.active').removeClass('active').next().addClass('banner--next');
        if (banners.length) {
            $('.banner:nth-child(' + (banners[0] / banHeight + 1) + ')').addClass('banner--next')
                .css('opacity', (scrollVal % (banHeight + 1) - $(window).height() / 2) / (banHeight - $(window).height() / 2));
        }

        $(window).scroll(function () {
            scrollVal = (document.body.scrollTop+0 || document.documentElement.scrollTop+0);

            banners.forEach(function (_this) {
                if (scrollVal >= _this && !bannersActive.includes(_this)) {
                    $('.banner:nth-child('+ (_this / banHeight + 1) +')').removeClass('banner--next').css('opacity', 1);
                    $('.banner:nth-child('+ (_this / banHeight + 2) +')').addClass('banner--next');
                    bannersActive.unshift(_this);
                    banners.shift();
                }
            });
            bannersActive.forEach(function (_this) {
                if (scrollVal <= _this) {
                    $('.banner:nth-child('+ (_this / banHeight + 1) +')').addClass('banner--next');
                    $('.banner:nth-child('+ (_this / banHeight + 2) +')').removeClass('banner--next').css('opacity', 1);
                    bannersActive.shift();
                    banners.unshift(_this);
                }
            });

            $('.banner--next').css('opacity', (scrollVal % (banHeight + 1) - $(window).height() / 2) / (banHeight - $(window).height() / 2));
            $('.banner--next img').css('transform', 'scale(' + (1 - (scrollVal - banners[0]) / banners[0] / 3) + ')');
        });
    }

    // Order
    $('.order__box-row').css('display', 'flex').hide();
    $('.order__form-box.active .order__box-row').css('display', 'flex');
    $('.order__form-box .required').change(function () {
        let hasEmpty;
        $(this).parents('.order__form-box').find('.required').each(function () {
            if (!$(this).val()) {
                hasEmpty = true;
            }
        });
        if (!hasEmpty) {
            $(this).parents('.order__form-box').next().next().addClass('active').find('.order__box-row').slideDown();
        }
    });
    $('.order__delivery-item input').change(function () {
        $('.order__delivery-item').removeClass('active');
        $(this).parent().addClass('active');
    });
    $('.order__box-row input[name="payment"]').change(function () {
        $('.order__radio-icon').removeClass('active');
        $(this).parent().find('.order__radio-icon').addClass('active');
    });
    $('.order__input--promo').change(function () {
        if ($(this).val()) {
            $('.order__promo-arrow').hide();
            $('.order__promo-reset').show();
        } else {
            $('.order__promo-arrow').show();
            $('.order__promo-reset').hide();
        }
    });
    $('.order__promo-reset').click(function () {
        $('.order__input--promo').val('');
        $('.order__promo-arrow').show();
        $('.order__promo-reset').hide();
    });
    $('.order__form-box .order__box-title').click(function () {
        let hasEmpty, radio;
        $(this).parents('.order__form-box').find('.required').each(function () {
            if (radio) return;
            if (!$(this).val()) {
                hasEmpty = true;
            } else if ($(this).val() === 'on') {
                if ($(this).prop('checked')) {
                    radio = true;
                    hasEmpty = false;
                } else {
                    hasEmpty = true;
                }
            }
        });
        if (!hasEmpty) {
            $(this).parent().hide().next().show();
        } else {
            $(this).parents('.order__form-box').toggleClass('active').find('.order__box-row').slideToggle();
        }
    });
    $('.order__complete-box .order__box-title').click(function () {
        $(this).parent().hide().prev().show();
    });

    // Burger btn
    $('.header__burger-btn').click(function () {
        $('body').toggleClass('lock');
        $('.header__menu-box').fadeToggle(300);
        $('.header').addClass('header--bg');
        if ($(document).scrollTop() <= rem(13) && $(this).hasClass('active')) {
            $('.header').removeClass('header--bg');
        }
        $(this).toggleClass('active');
    });

    // Header catalog
    let timerCatalog;
    $('.header-catalog').hover(function () {
        if ($(window).width > 768) {
            clearTimeout(timerCatalog);
            $('.header__catalog-content').css('display', 'flex');
            $('body').addClass('lock');
            $('.header__catalog, .header__blur-bg').css('visibility', 'visible');
            $('.header').addClass('catalog-open');
        }
    }, function () {
        if ($(window).width > 768) {
            $('body').removeClass('lock');
            timerCatalog = setTimeout(function () {
                $('.header__catalog, .header__blur-bg').removeAttr('style');
                $('.header__catalog-content').hide();
            }, 200);
            $('.header').removeClass('catalog-open');
        }
    });
    $('.header__catalog-item').hover(function () {
        if ($(window).width > 768) {
            $('.header__catalog-item').removeClass('active');
            $(this).addClass('active');
        }
    });
    $('.header__catalog-list-item').hover(function () {
        if ($(window).width > 768) {
            $('.header__catalog-list-item').removeClass('active');
            $(this).addClass('active');
        }
    }).each(function () {
        $(this).find('a').css('transition', + ($(this).index() / 20 + 0.4) + 's all cubic-bezier(.39,.575,.565,1)');
    });

    // Header
    let scrollPos = 0;
    $(window).scroll(function(){
        let scrolled = $(this).scrollTop(), scrollMax = rem(13);
        if ( scrolled > scrollMax && scrolled > scrollPos ) {
            $('.header').addClass('hidden');
            $('.header__language-btn').removeClass('active').siblings('.header__language-list').fadeOut(250);
        } else {
            $('.header').removeClass('hidden');
        }
        if (scrolled > scrollMax * 1.2) {
            $('.header').addClass('header--bg');
        } else {
            $('.header').removeClass('header--bg');
        }
        scrollPos = scrolled;
    });

    // Header language
    $('.header__language-list').length ? $('.header__language-list').css('display', 'flex').hide() : false;
    $('.header__language-btn').click(function () {
        $(this).toggleClass('active').siblings('.header__language-list').fadeToggle(250);
    });

    // Catalog filters
    $('.catalog__filter-btn').click(function () {
        if ($(window).width() > 768) {
            $(this).parent().find('.catalog__filter-box').addClass('active');
            $(this).parent().find('.catalog__filter-box-bg').fadeIn(200);
        } else {
            $(this).toggleClass('active');
            $(this).parent().find('.catalog__filter-box').slideToggle();
        }
    });
    $('.catalog__filters .close').click(function () {
        if ($(window).width() > 768) {
            $(this).parents('.catalog__filter-btn-box').find('.catalog__filter-box').removeClass('active');
            $(this).parents('.catalog__filter-btn-box').find('.catalog__filter-box-bg').fadeOut(200);
        } else {
            $('body').removeClass('lock');
            $(this).parents('.catalog__filters').slideUp(200);
        }
    });
    $('.catalog__filter-list-item input').change(function () {
        $(this).parents('.catalog__filter-list-item').toggleClass('active');
    });
    $('.catalog__filters-btn-mob').click(function () {
        $('body').addClass('lock');
        $(this).parent().find('.catalog__filters').slideDown(200);
    });

    // Search modal
    $('.modal-search .close').click(function () {
        $('body').removeClass('lock');
        $('.modal-search').fadeOut(250);
    });
    $('.search-btn').click(function () {
        $('body').addClass('lock');
        $('.modal-search').fadeIn(250);
    });
    $('.modal-search__label input').keyup(function () {
        if ($(this).val()) {
            $('.modal-search .clear-search').addClass('active');
        } else {
            $('.modal-search .clear-search').removeClass('active');
        }
    });
    $('.clear-search').click(function () {
        $('.modal-search__label input').val('');
        $(this).removeClass('active');
        $('.modal-search__label input').focus();
    });

    // Purchases
    $('.purchases__tab-content input').change(function () {
        $('.purchases__tab-content').removeClass('active');
        $(this).parent().addClass('active');
        $('.purchases__tab').removeClass('active');
        $('.purchases__tab[for=' + $(this).attr('id') + ']').addClass('active');
    });

    // Product
    $('.product__option-label input').change(function () {
        $(this).parents('.product__options').find('.product__option-label').removeClass('active');
        $(this).parent().addClass('active');
    });
    $('.product__tab-content input[name="size-guid"]').change(function () {
        $('.product__guid-tab-content').removeClass('active');
        $(this).next().addClass('active');
        $('.product__guid-tab').removeClass('active');
        $('.product__guid-tab[for=' + $(this).attr('id') + ']').addClass('active');
    });
    $('.product__tab-content input[name="product-info"]').change(function () {
        $('.product__tab-content').removeClass('active');
        $(this).parent().addClass('active');
        $('.product__tab').removeClass('active');
        $('.product__tab[for=' + $(this).attr('id') + ']').addClass('active');
    });
    $('.product__tab-close').click(function () {
        $('.product__tab-content, .product__tab').removeClass('active');
    });

    // Login modal
    $('.pop-up-login').click(function () {
        $('.modal-login__bg').fadeIn(200);
        $('.modal-login__content').addClass('active');
        $('.modal-login').css('z-index', '10');
    });
    $('.modal-login .close').click(function () {
        $('.modal-login__bg').fadeOut(200);
        $('.modal-login__content').removeClass('active');
        setTimeout(function () {
            $('.modal-login').removeAttr('style');
        }, 300)
    });
    $('.register-box').click(function () {
        $('.modal-login__login-box').css('transform', 'translate(-100vw)');
        $('.modal-login__register-box').css('transform', 'translate(0)');
    });
    $('.login-box').click(function () {
        $('.modal-login__login-box').css('transform', 'translate(0)');
        $('.modal-login__register-box').css('transform', 'translateX(100vw)');
    });

    // Information
    $('.info__tab-content > input').change(function () {
        let labelActive = $('.info__tab label[for="'+ $(this).attr('id') +'"]');

        $('.info__tab-content').removeClass('active');
        $(this).parent().addClass('active');
        $('.info__tab').removeClass('active');
        labelActive.parent().addClass('active');
        $('.info__btn-tabs span').html(labelActive.html());
        $('.info__btn-tabs').removeClass('active');
        $(window).width() <= 768 ? $('.info__tabs').slideUp() : false;
    });
    $('.info__btn-tabs').click(function () {
        $(this).toggleClass('active').siblings('.info__tabs').slideToggle();
    });

});