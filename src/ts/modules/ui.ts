import {
    Timeline
} from './types';
import {
    animateNumber
} from './animation';
import {
    updateSwiper
} from "./swiper";
import {
    initializeTimeline
} from './initializeTimeline';
import {
    gsap
} from 'gsap';
import {
    debounce
} from './functions';

export function updateInterface(el: Element, timeline: Timeline) {
    const currentCategory = timeline.categories[timeline.currentCategoryIndex];

    const dateRangeElement = el.querySelector('.js-timeline-data-range') as HTMLElement;
    const dateRangeParagraphs = dateRangeElement ?.querySelectorAll('.js-timeline-number');

    if (dateRangeParagraphs && dateRangeParagraphs.length === 2) {
        animateNumber(dateRangeParagraphs[0] as HTMLElement, currentCategory.dateRange[0]);
        animateNumber(dateRangeParagraphs[1] as HTMLElement, currentCategory.dateRange[1]);
    }

    const counterElement = el.querySelector('.js-timeline-counter') as HTMLElement;
    counterElement.textContent = `${String(timeline.currentCategoryIndex + 1).padStart(2, '0')}/${String(timeline.categories.length).padStart(2, '0')}`;

    const headingElement = el.querySelector('.js-timeline-title') as HTMLElement;
    headingElement.textContent = currentCategory.label;

    const carouselElement = el.querySelector('.js-timeline-carousel .swiper-wrapper') as HTMLElement;
    carouselElement.innerHTML = '';

    currentCategory.events.forEach(event => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');

        const timeElement = document.createElement('time');
        timeElement.setAttribute('datetime', event.date.toString());
        timeElement.textContent = event.date.toString();

        const textElement = document.createElement('p');
        textElement.textContent = event.text;

        slide.appendChild(timeElement);
        slide.appendChild(textElement);
        carouselElement.appendChild(slide);
    });

    updateNavigationButtons(el, timeline);
}

export function updateNavigationButtons(el: Element, timeline: Timeline) {
    const prevButton = el.querySelector('.js-timeline-prev-category') as HTMLElement;
    const nextButton = el.querySelector('.js-timeline-next-category') as HTMLElement;

    prevButton.classList.toggle('is-disabled', timeline.currentCategoryIndex === 0);
    nextButton.classList.toggle('is-disabled', timeline.currentCategoryIndex === timeline.categories.length - 1);
}

export function handleNavigation(direction: 'prev' | 'next', el: Element, timeline: Timeline, idx: number) {
    const titleElement = el.querySelector('.js-timeline-title') as HTMLElement;
    const carouselElement = el.querySelector('.js-timeline-carousel') as HTMLElement;
    const timelineCircle = el.querySelector('.js-timeline-circle') as HTMLElement;

    gsap.to([titleElement, carouselElement], {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            updateCategoryIndex(direction, timeline);

            const timelineController = initializeTimeline(timelineCircle as HTMLElement, el, timeline, idx);
            if (timelineController) {
                timelineController.setActiveIndex(timeline.currentCategoryIndex);
            }

            updateInterface(el, timeline);
            updateSwiper(idx);

            gsap.fromTo([titleElement, carouselElement], {
                opacity: 0,
                y: 20
            }, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.2,
            });
        }
    });
}

function updateCategoryIndex(direction: 'prev' | 'next', timeline: Timeline) {
    if (direction === 'prev' && timeline.currentCategoryIndex > 0) {
        timeline.currentCategoryIndex--;
    } else if (direction === 'next' && timeline.currentCategoryIndex < timeline.categories.length - 1) {
        timeline.currentCategoryIndex++;
    }
}

export function initTimelineNavigation(el: Element, timeline: Timeline, idx: number) {
    const prevButton = el.querySelector('.js-timeline-prev-category') as HTMLElement;
    const nextButton = el.querySelector('.js-timeline-next-category') as HTMLElement;

    const handlePrevNavigation = debounce(() => handleNavigation('prev', el as HTMLElement, timeline, idx), 300);
    const handleNextNavigation = debounce(() => handleNavigation('next', el as HTMLElement, timeline, idx), 300);

    prevButton.addEventListener('click', handlePrevNavigation);
    nextButton.addEventListener('click', handleNextNavigation);
}