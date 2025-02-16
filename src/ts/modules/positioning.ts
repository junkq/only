export const calculatePosition = (
    index: number,
    totalItems: number,
    radius: number,
    centerX: number,
    centerY: number,
    item: HTMLLIElement
) => {
    const angleStep = (2 * Math.PI) / totalItems;
    const angle = angleStep * index - 1;
    const itemWidth = item.offsetWidth;
    const itemHeight = item.offsetHeight;
    const offsetX = itemWidth / 2;
    const offsetY = itemHeight / 2;

    const x = centerX + (radius - offsetY) * Math.cos(angle);
    const y = centerY + (radius - offsetY) * Math.sin(angle);

    return {
        x: x - offsetX,
        y: y - offsetY
    };
};

export const positionElementsInCircle = (
    items: NodeListOf < HTMLLIElement > ,
    radius: number,
    centerX: number,
    centerY: number
) => {
    items.forEach((item, index) => {
        const {
            x,
            y
        } = calculatePosition(index, items.length, radius, centerX, centerY, item);
        item.style.transform = `translate(${x}px, ${y}px)`;
    });
};