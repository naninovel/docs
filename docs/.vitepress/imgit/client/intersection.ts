const observer = canObserve() ? new IntersectionObserver(handleIntersections) : undefined;

export function observeIntersections(element: HTMLElement) {
    observer?.observe(element);
}

export function unobserveIntersections(element: HTMLElement) {
    observer?.unobserve(element);
}

function canObserve() {
    return typeof document === "object" && "IntersectionObserver" in window;
}

function handleIntersections(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    for (const entry of entries)
        if (entry.isIntersecting)
            handleIntersection(entry, observer);
}

function handleIntersection(entry: IntersectionObserverEntry, observer: IntersectionObserver) {
    for (const child of entry.target.children)
        if (child instanceof HTMLSourceElement && child.dataset.src)
            child.src = child.dataset.src;
    if (entry.target instanceof HTMLVideoElement)
        entry.target.load();
    observer.unobserve(entry.target);
}
