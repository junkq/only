import {
    positionElementsInCircle
} from './positioning';

export const updatePositions = () => {
    const circles = document.querySelectorAll('.js-timeline-circle') as NodeListOf < HTMLUListElement > ;

    circles.forEach(circle => {
        const items = circle.querySelectorAll('li') as NodeListOf < HTMLLIElement > ;
        if (items.length === 0) return;

        const itemHeight = items[0].offsetHeight;
        const radius = Math.min(circle.offsetWidth, circle.offsetHeight) / 2 + (itemHeight / 2);
        const centerX = circle.offsetWidth / 2;
        const centerY = circle.offsetHeight / 2;

        positionElementsInCircle(items, radius, centerX, centerY);
    });
};

window.addEventListener('resize', updatePositions);

updatePositions();