'use strict'

$(document).ready(function () {

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
            $('.banner--next img').css('transform', 'scale(' + (1 - (scrollVal - banners[0]) / banners[0] / 10) + ')');
        });
    }

    // Catalog like btn
    $('.catalog__like').click(function () {
        $(this).toggleClass('active');
    });

    // Order
    $('.order__box-row').css('display', 'flex').hide();
    $('.order__form-box.active .order__box-row').css('display', 'flex');
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
        if ($(this).parent().hasClass('active') && $(this).parent().next().next().hasClass('active')) {
            $(this).parent().hide().next().show();
        }
    });
    $('.order__complete-box .order__box-title').click(function () {
        $(this).parent().hide().prev().show();
    });

    // Burger btn
    $('.header__burger-btn').click(function () {
        $(this).toggleClass('active');
    });

    // Header catalog
    $('.header-catalog').hover(function () {
        $('body').addClass('lock');
        $('.header').addClass('catalog-open');
    }, function () {
        $('body').removeClass('lock');
        $('.header').removeClass('catalog-open');
    });
    $('.header__catalog-item').hover(function () {
        $('.header__catalog-item').removeClass('active');
        $(this).addClass('active');
    });
    $('.header__catalog-list-item').hover(function () {
        $('.header__catalog-list-item').removeClass('active');
        $(this).addClass('active');
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
    $('.modal .close').click(function () {
        $('body').removeClass('lock');
        $(this).parents('.modal').hide();
    });
    $('.modal-search .close').click(function () {
        $('body').removeClass('lock');
        $('.modal-search').fadeOut(250);
    });
    $('.search-btn').click(function () {
        $('body').addClass('lock');
        $('.modal-search').fadeIn(250);
    });
    $('.clear-search').click(function () {
        $('.modal-search__label input').val('');
    });

    // Purchases
    $('.purchases__tab-content input').change(function () {
        $('.purchases__tab-content').removeClass('active');
        $(this).parent().addClass('active');
        $('.purchases__tab').removeClass('active');
        $('.purchases__tab[for=' + $(this).attr('id') + ']').addClass('active');
    });

});