import Swiper from "swiper";
import {
    Navigation,
    Pagination
} from "swiper/modules";

let swipers: Swiper[] = [];

export function initializeSwiper(
    carouselElement: HTMLElement,
    carouselPagination: HTMLElement,
    carouselNavigationPrev: HTMLElement,
    carouselNavigationNext: HTMLElement
): Swiper {
    const swiperInstance = new Swiper(carouselElement, {
        modules: [Navigation, Pagination],
        navigation: {
            nextEl: carouselNavigationNext,
            prevEl: carouselNavigationPrev,
        },
        pagination: {
            el: carouselPagination,
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1.4,
                spaceBetween: 25,
            },
            480: {
                slidesPerView: 1.7,
                spaceBetween: 38,
            },
            620: {
                slidesPerView: 1.8,
                spaceBetween: 50,
            },
            960: {
                slidesPerView: 2.3,
                spaceBetween: 75,
            },
            1366: {
                slidesPerView: 3,
                spaceBetween: 55,
            },
            1920: {
                slidesPerView: 3.4,
                spaceBetween: 80,
            },
        }
    });

    swipers.push(swiperInstance);
    return swiperInstance;
}

export function updateSwiper(index: number) {
    if (index >= 0 && index < swipers.length) {
        const swiperInstance = swipers[index];
        swiperInstance.update();
        setTimeout(() => {
            swiperInstance.slideTo(0, 0, false);
        }, 100);
    }
}

export function initSwiper(el: HTMLElement) {
    const carouselElement = el.querySelector('.js-timeline-carousel') as HTMLElement;
    const carouselPagination = el.querySelector('.js-timeline-pagination') as HTMLElement;
    const carouselNavigationPrev = el.querySelector('.js-timeline-prev-slide') as HTMLElement;
    const carouselNavigationNext = el.querySelector('.js-timeline-next-slide') as HTMLElement;

    if (carouselElement && carouselPagination && carouselNavigationPrev && carouselNavigationNext) {
        initializeSwiper(carouselElement, carouselPagination, carouselNavigationPrev, carouselNavigationNext);
    }
}