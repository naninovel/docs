export function observeVideos() {
    if (!canObserve()) return;
    const observer = new IntersectionObserver(handleIntersections);
    for (const element of document.querySelectorAll("video.imgit-video"))
        observer.observe(element);
}

function canObserve() {
    return typeof document === "object" && "IntersectionObserver" in window;
}

function handleIntersections(entries, observer) {
    for (const entry of entries)
        if (entry.isIntersecting)
            handleIntersection(entry, observer);
}

function handleIntersection(entry, observer) {
    for (const child of entry.target.children)
        if (typeof child.tagName === "string" && child.tagName === "SOURCE")
            child.src = child.dataset.src;
    entry.target.load();
    observer.unobserve(entry.target);
}
