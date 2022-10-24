// Пересчет rem в px для swiper
const rem = function (rem) {
    if ($(window).width() > 768) {
        return 0.005208335 * $(window).width() * rem;
    } else {
        // где 375 это ширина моб версии макета
        return (100/375) * (0.1 * $(window).width()) * rem;
    }
}

const reviews_slider = new Swiper('.product__slider', {
    direction: 'vertical',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 50,

    pagination: {
        el: '.product__pagination',
        clickable: true,
        renderBullet: function (index, className) {
            index += 1;
            if (index < 10) {
                index = '0' + index;
            }
            return '<span class="' + className + '">' + index + '</span>';
        },
    },
});

$('.product__slider-cards').on('click', '.product__card-img-box', function() {
    reviews_slider.slideTo($( this ).index() + 1);
});

const catalog_slider = new Swiper('.catalog__cards.swiper', {
    direction: 'horizontal',

    breakpoints: {
        0: {
            slidesPerView: 2,
            spaceBetween: rem(1.5),
        },
        769: {
            slidesPerView: 4,
            spaceBetween: rem(5),
        },
    },

    pagination: {
        el: '.catalog__pagination',
        type: 'bullets',
        clickable: true,
    },

    navigation: {
        nextEl: '.catalog__arrow.next',
        prevEl: '.catalog__arrow.prev',
    },
});