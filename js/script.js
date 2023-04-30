window.addEventListener('DOMContentLoaded', () => {
    // Sliders
    const introSlider = new Swiper('.intro-slider', {
        direction: 'horizontal',
        loop: false,
      
        // Navigation arrows
        navigation: {
          nextEl: '.intro__slider-next',
          prevEl: '.intro__slider-prev',
        },
    });

    const variantsSlider = new Swiper('.variants-slider', {
        direction: 'horizontal',
        loop: false,
        slidesPerView: 4,
        spaceBetween: 15,
        slidesPerGroup: 4,
        speed: 1000,
      
        // Navigation arrows
        navigation: {
          nextEl: '.variants__slider-next',
          prevEl: '.variants__slider-prev',
        },
    });

    const secondSlider = new Swiper('.second-slider', {
        direction: 'horizontal',
        loop: false,
      
        // Navigation arrows
        navigation: {
          nextEl: '.second__slider-next',
          prevEl: '.second__slider-prev',
        },
    });

    const calcSlider = new Swiper('.calc-slider', {
        direction: 'horizontal',
        loop: true,
        allowTouchMove: false,
    });

    const worksSlider = new Swiper('.works-slider', {
        direction: 'horizontal',
        loop: false,
        slidesPerView: 1,
        speed: 1000,

        breakpoints: {
            576: {
                slidesPerView: 3,
                spaceBetween: 20,
                slidesPerGroup: 2,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 20,
                slidesPerGroup: 4,
            }
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.works__slider-next',
          prevEl: '.works__slider-prev',
        },
    });

    const worksModalSlider = new Swiper('.works__modal-slider', {
        direction: 'horizontal',
        loop: false,
        slidesPerView: 1,
      
        // Navigation arrows
        navigation: {
          nextEl: '.works__modal-slider-next',
          prevEl: '.works__modal-slider-prev',
        },
    });

    const solutionsSlider = new Swiper('.solutions-slider', {
        direction: 'horizontal',
        loop: false,
      
        // Navigation arrows
        navigation: {
          nextEl: '.solutions__slider-next',
          prevEl: '.solutions__slider-prev',
        },
    });

    // Smooth scroll

    const smoothScrool = function (targetEl, duration) {
        const headerElHeight = document.querySelector('.header').clientHeight,
              target = document.querySelector(targetEl),
              targetPosition = target.getBoundingClientRect().top - headerElHeight,
              startPosition = window.pageYOffset;
        let startTime = null;

        let variable = window.innerWidth >= 576 ? 1.95 : 1.97;

        const ease = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) {return c / 2 * t * t + b;}
            t--;
            return -c / variable * (t * (t - 2) - 1) + b;
        };

        const animation = function(currentTime) {
            if (startTime == null) {startTime = currentTime;}
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) {requestAnimationFrame(animation);}
        };
        requestAnimationFrame(animation);
    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(link => {
            link.addEventListener('click', function () {
                headerBottom.classList.remove('header-active');
                document.body.style.overflow = '';
                const currentTarget = this.getAttribute('href');
                smoothScrool(currentTarget, 1000);
            });
        });
    };
    scrollTo();

    // Burger

    const headerBurger = document.querySelector('.header__burger'),
          headerBottom = document.querySelector('.header-bottom'),
          headerNav = document.querySelector('.nav__list'),
          headerClose = document.querySelector('.header__burger-close'),
          navLinks = document.querySelectorAll('.nav__list-link');

    headerBurger.addEventListener('click', () => {
        headerBottom.classList.add('header-active');
        document.body.style.overflow = 'hidden';
    });

    headerClose.addEventListener('click', () => {
        headerBottom.classList.remove('header-active');
        document.body.style.overflow = '';
    });

    // Calc

    const calcRadioBtns = document.querySelectorAll('.radio-type'),
          calcSlides = document.querySelectorAll('.calc-slide');

    calcRadioBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            calcSlides.forEach(slide => {
                if (btn.value == slide.getAttribute('slide-value')) {
                    calcSlider.slideTo(slide.getAttribute('data-swiper-slide-index'));
                } 
            });
        });
    });


    const sliderValue = document.querySelector('.square__slider-value.value-1');

    document.querySelector('.square__slider').oninput = function() {
        let value = (this.value-this.min)/(this.max-this.min)*100
        sliderValue.style.left = `${value - 3}%`;
        sliderValue.innerHTML = `${Math.round(this.value)} м<sup>2</sup>`
        this.style.background = 'linear-gradient(to right, #D4D5F6 0%, #D4D5F6 ' + value + '%, #e1e2e2 ' + value + '%, #e1e2e2 100%)'
    };

    const incrementBtns = document.querySelectorAll('.calc__increment'),
          decrimentBtns = document.querySelectorAll('.calc__decriment'),
          calcValues = document.querySelectorAll('.calc__num'),
          calcSpeedBtn = document.querySelector('.calc__speed'),
          calcAmountSpeed = document.querySelector('.calc__amount-speed'),
          calcList = document.querySelector('.calc__amount-list');

    incrementBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            calcValues.forEach(value => {
                if (btn.parentNode.getAttribute('counter') == value.parentNode.getAttribute('counter')) {
                    value.innerHTML = +value.innerHTML + 1;
                }
            });
        });
    });

    decrimentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            calcValues.forEach(value => {
                if (btn.parentNode.getAttribute('counter') == value.parentNode.getAttribute('counter')) {
                    if (+value.innerHTML > 1) {
                        value.innerHTML = +value.innerHTML - 1;
                    }
                }
            });
        });
    });

    calcSpeedBtn.addEventListener('click', () => {
        calcList.classList.toggle('amount__list-show');
        calcAmountSpeed.classList.toggle('amount__counter-show');
        calcSpeedBtn.classList.toggle('calc__speed-show');
    });

    // Work modal

    const worksSlides = document.querySelectorAll('.works__slide'),
          worksModal = document.querySelector('.works__modal'),
          modalCloseBtns = document.querySelectorAll('.works__slider-close');

    worksSlides.forEach(slide => {
        slide.addEventListener('click', () => {
            worksModal.classList.add('works__modal-show');
            worksModalSlider.slideTo(slide.getAttribute('data-map-mark')-1);
        });
    });

    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            worksModal.classList.remove('works__modal-show');
        })
    });

    // Map

    const sliderMarks = document.querySelectorAll('.works__slide');
    
    let placemarks = [];

    sliderMarks.forEach(item => {
        let mark = {};
        
        let strCoords = item.getAttribute('data-map-coords')?.split(',');
        mark[item.getAttribute('data-map-mark')] = strCoords ? [Number(strCoords[0]), Number(strCoords[1])] : null;
        placemarks.push(mark);
    });

    ymaps.ready(init);
    function init(){
        var map = new ymaps.Map("map", {
            center: [59.92831551441101,30.315020811267466],
            zoom: 11
        });

        placemarks.forEach(mark => {
            let balloonText = '';
            let balloonImg = '';

            sliderMarks.forEach(item => {
                if (item.getAttribute('data-map-mark') == Object.keys(mark)) {
                    balloonText = item.querySelector('.works__slide-title').innerHTML;
                    balloonImg = item.querySelector('.works__slide-img').src; 
                };
            });
            let placemark = new ymaps.Placemark(mark[Object.keys(mark)], {
                balloonContent: `
                <div class="balloon__container">
                    <div class="works__slide-content">
                        <p class="works__slide-title">
                            ${balloonText}
                        </p>

                        <img src="${balloonImg}" alt="" class="works__slide-img">
                    </div>
                </div>
                `
            }, {
                iconLayout: 'default#image',
                iconImageHref: './img/balloon__close.svg',
                iconImageSize: [15, 15],
                iconImageOffset: [0, 0],
                maxWidth: '345px'
            });
            map.geoObjects.add(placemark);
        });

        map.controls.remove('geolocationControl'); // удаляем геолокацию
        map.controls.remove('searchControl'); // удаляем поиск
        map.controls.remove('trafficControl'); // удаляем контроль трафика
        map.controls.remove('typeSelector'); // удаляем тип
        map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
        // map.controls.remove('zoomControl'); // удаляем контрол зуммирования
        map.controls.remove('rulerControl'); // удаляем контрол правил
        map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
    }

    // Answers

    const answersBtns = document.querySelectorAll('.answers__btn-link');

    answersBtns.forEach(btn => {
        let btnParent = btn.parentNode.parentNode;
        btn.addEventListener('click', () => {
            btnParent.querySelector('.answers__card-subtitle').classList.toggle('answers-show');
            btnParent.querySelector('.answers__btn').classList.toggle('answers__btn-opened');
        });
    });
});