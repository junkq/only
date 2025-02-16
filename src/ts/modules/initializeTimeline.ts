import gsap from 'gsap';
import {
    updateSwiper
} from './swiper';
import {
    updateInterface
} from './ui';
import {
    Timeline
} from './types';
import {
    debounce
} from './functions';

export function initializeTimeline(timelineCircle: HTMLElement, el: Element, timeline: Timeline, idx: number) {
    if (!timelineCircle) {
        return;
    }

    const items = timelineCircle.querySelectorAll('li') as NodeListOf < HTMLLIElement > ;
    if (items.length === 0) {
        return;
    }

    let currentIndex = 0;

    const titleElement = el.querySelector('.js-timeline-title') as HTMLElement;
    const carouselElement = el.querySelector('.js-timeline-carousel') as HTMLElement;

    const animationDuration = 0.5;
    const rotationDuration = 1.5;

    items.forEach((item: HTMLLIElement, index: number) => {
        const button = item.querySelector('button') as HTMLButtonElement;
        if (button) {
            const handleClick = () => {
                timeline.currentCategoryIndex = index;

                gsap.to([titleElement, carouselElement], {
                    opacity: 0,
                    duration: animationDuration,
                    onComplete: () => {
                        setActiveItem(timeline.currentCategoryIndex);
                        updateInterface(el, timeline);
                        updateSwiper(idx);
                        gsap.fromTo([titleElement, carouselElement], {
                            opacity: 0,
                            y: 20
                        }, {
                            opacity: 1,
                            y: 0,
                            duration: animationDuration
                        });
                    }
                });
            };

            const debouncedClickHandler = debounce(handleClick, 300);
            button.addEventListener('click', debouncedClickHandler);
        }
    });

    function setActiveItem(index: number) {
        items.forEach((i: HTMLLIElement) => i.classList.remove('is-active'));
        items[index].classList.add('is-active');
        currentIndex = index;
        const angle = (360 / items.length) * currentIndex;

        gsap.to(timelineCircle, {
            rotation: -angle,
            duration: rotationDuration,
            ease: "power2.out"
        });

        items.forEach((item: HTMLLIElement) => {
            const button = item.querySelector('button') as HTMLButtonElement;
            if (button) {
                gsap.to(button, {
                    rotation: angle,
                    duration: rotationDuration,
                    ease: "power2.out"
                });
            }
        });
    }

    return {
        setActiveIndex: (index: number) => {
            if (index >= 0 && index < items.length) {
                setActiveItem(index);
                updateInterface(el, timeline);
                updateSwiper(idx);
            }
        }
    };
}