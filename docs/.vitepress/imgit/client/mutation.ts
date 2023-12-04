import { observeVideo, unobserveVideo } from "./intersection";

const IMAGE_LOADED_EVENT = "load";
const VIDEO_LOADED_EVENT = "loadeddata";
const IMGIT_LOADED_EVENT = "imgit-loaded";

const observer = canObserve() ? new MutationObserver(handleMutations) : undefined;

export function observeMutations() {
    observer?.observe(document.body, { childList: true, subtree: true });
    if (canObserve()) handleAdded(document.body);
}

function canObserve() {
    return typeof document === "object" && "MutationObserver" in window;
}

function handleMutations(mutations: MutationRecord[]) {
    for (const mutation of mutations)
        handleMutation(mutation);
}

function handleMutation(mutation: MutationRecord) {
    for (const node of mutation.addedNodes)
        if (isElement(node)) handleAdded(node);
    for (const node of mutation.removedNodes)
        if (isElement(node)) handleRemoved(node);
}

function handleAdded(added: Element) {
    for (const element of added.querySelectorAll("[data-imgit-loadable]")) {
        if (isImage(element)) {
            // Height check is a hack for firefox, which returns false-positive on complete.
            if (element.complete && element.naturalHeight > 0) signalLoaded(element);
            else element.addEventListener(IMAGE_LOADED_EVENT, handleLoaded);
        } else if (isVideo(element)) {
            observeVideo(element);
            if (element.readyState >= 2) signalLoaded(element);
            else element.addEventListener(VIDEO_LOADED_EVENT, handleLoaded);
        } else element.addEventListener(IMGIT_LOADED_EVENT, handleLoaded);
    }
}

function handleRemoved(removed: Element) {
    for (const element of removed.querySelectorAll("[data-imgit-loadable]")) {
        if (isVideo(element)) unobserveVideo(element);
        element.removeEventListener(IMAGE_LOADED_EVENT, handleLoaded);
        element.removeEventListener(VIDEO_LOADED_EVENT, handleLoaded);
        element.removeEventListener(IMGIT_LOADED_EVENT, handleLoaded);
    }
}

function isElement(obj: Node | EventTarget): obj is Element {
    return "querySelector" in obj;
}

function isVideo(element: Element): element is HTMLVideoElement {
    return "getVideoPlaybackQuality" in element;
}

function isImage(element: Element): element is HTMLImageElement {
    return "complete" in element;
}

function handleLoaded(event: Event) {
    if (event.currentTarget && isElement(event.currentTarget))
        signalLoaded(event.currentTarget);
}

function signalLoaded(element: Element) {
    const container = element.closest("[data-imgit-container]");
    if (!container) return;
    (<HTMLElement>container).dataset.imgitLoaded = "";
}
