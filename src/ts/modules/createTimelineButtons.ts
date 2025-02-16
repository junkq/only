import {
    createListItem
} from './createListItem';
import {
    updatePositions
} from './updatePositions';
import {
    initializeTimeline
} from './initializeTimeline';
import {
    Category,
    Timeline
} from './types';

export const createTimelineButtons = (data: Category[], timelineElement: HTMLElement, timeline: Timeline, idx: number) => {
    const circles = timelineElement.querySelectorAll('.js-timeline-circle') as NodeListOf < HTMLElement > ;

    if (circles.length === 0) {
        return;
    }

    if (data.length === 0) {
        return;
    }

    circles.forEach((circle) => {
        circle.innerHTML = '';

        data.forEach((item, index) => {
            const activeIndex = index === 0;
            const li = createListItem(item, activeIndex);
            circle.appendChild(li);
        });
    });

    updatePositions();

    circles.forEach((circle) => {
        initializeTimeline(circle, timelineElement, timeline, idx);
    });
};