export function observe() {
    if (!canObserve()) return;
    const observer = new IntersectionObserver(handleIntersections);
    for (const element of document.querySelectorAll("video.imgit-video"))
        observer.observe(element);
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
        if (isSourceElement(child))
            child.src = child.dataset.src;
    (entry.target as HTMLVideoElement).load();
    observer.unobserve(entry.target);
}

function isSourceElement(element: Element): element is HTMLSourceElement {
    return element.tagName === "SOURCE";
}
