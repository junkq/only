export function animateNumber(element: HTMLElement, target: number, duration: number = 500) {
    const start = parseInt(element.textContent || '0', 10);
    const startTime = performance.now();

    function updateAnimation(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.round(start + (target - start) * progress);

        element.textContent = currentValue.toString();

        if (progress < 1) {
            requestAnimationFrame(updateAnimation);
        }
    }

    requestAnimationFrame(updateAnimation);
}