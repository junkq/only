import {
    initSwiper
} from "./swiper";
import {
    loadJson
} from './api';
import {
    Timeline
} from './types';
import {
    updateInterface
} from './ui';
import {
    initTimelineNavigation
} from "./ui";
import {
    createTimelineButtons
} from "./createTimelineButtons";

export function initializeApp() {
    const timelines: Timeline[] = [];

    document.querySelectorAll('.js-timeline').forEach((el, idx) => {
        const timeline: Timeline = {
            categories: [],
            currentCategoryIndex: 0
        };
        const jsonDataUrl = el.getAttribute('data-json') as string;

        loadJson(jsonDataUrl)
            .then(data => {
                timeline.categories = data;
                timelines.push(timeline);

                createTimelineButtons(data, el as HTMLElement, timeline, idx);
                initSwiper(el as HTMLElement);
                updateInterface(el as HTMLElement, timeline);
                initTimelineNavigation(el as HTMLElement, timeline, idx);
            })
            .catch(error => {
                alert(`Нет данных данных для элемента с ID: ${idx}.`);
            });
    });
}