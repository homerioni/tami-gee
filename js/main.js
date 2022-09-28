'use strict'

$(document).ready(function () {

    if ($('.banner').length) {
        let scrollVal = (document.body.scrollTop+0 || document.documentElement.scrollTop+0);
        $('.banner:nth-child(1)').addClass('active');

        let banners = [],
            bannersActive = [],
            banHeight = $('.banner').height();

        for (let i = 1; i < $('.banner').length; i++) {
            if (scrollVal <= i * banHeight) {
                banners.push(i * banHeight);
            } else {
                $('.banner:nth-child('+ (i + 1) +')').addClass('active');
                bannersActive.unshift(i * banHeight);
            }
        }

        $('.banner:nth-child('+ (banners[0] / banHeight + 1) +') .banner__shadow').css('opacity', 1 - (scrollVal - 1) % banHeight / banHeight);

        $(window).scroll(function () {
            scrollVal = (document.body.scrollTop+0 || document.documentElement.scrollTop+0);

            banners.forEach(function (_this) {
                if (scrollVal >= _this && !bannersActive.includes(_this)) {
                    $('.banner:nth-child('+ (_this / banHeight + 1) +')').addClass('active');
                    bannersActive.unshift(_this);
                    banners.shift();
                    console.log(banners);
                    console.log(bannersActive);
                }
            });
            bannersActive.forEach(function (_this) {
                if (scrollVal <= _this) {
                    $('.banner:nth-child('+ (_this / banHeight + 1) +')').removeClass('active');
                    bannersActive.shift();
                    banners.unshift(_this);
                    console.log(banners);
                    console.log(bannersActive);
                }
            });

            $('.banner:nth-child('+ (banners[0] / banHeight + 1) +') .banner__shadow').css('opacity', 1 - (scrollVal - 1) % banHeight / banHeight);
        });
    }

});