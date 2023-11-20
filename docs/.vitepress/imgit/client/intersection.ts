const observer = canObserve() ? new IntersectionObserver(handleIntersections) : undefined;
const edge = isEdge();

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
        if (child instanceof HTMLSourceElement && child.dataset.src && !av1OnEdge(child))
            child.src = child.dataset.src;
    if (entry.target instanceof HTMLVideoElement)
        entry.target.load();
    observer.unobserve(entry.target);
}

function av1OnEdge(source: HTMLSourceElement) {
    // Edge has bug where it thinks it can play av01, while actually can't.
    // https://stackoverflow.com/questions/64212993 TODO: Find if there is a tracking issue for this.
    return edge && source.type.includes("codecs=av01");
}

function isEdge() {
    // https://learn.microsoft.com/en-us/microsoft-edge/web-platform/user-agent-guidance
    const agent = window.navigator.userAgent;
    return agent.includes("Edg/") || agent.includes("EdgiOS/") || agent.includes("EdgA/");
}
