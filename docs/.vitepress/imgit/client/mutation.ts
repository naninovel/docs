import { observeVideo, unobserveVideo } from "./intersection";

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
    for (const element of added.querySelectorAll("[data-imgit-lazy]"))
        if (isVideo(element)) observeVideo(element);
}

function handleRemoved(removed: Element) {
    for (const element of removed.querySelectorAll("[data-imgit-lazy]"))
        if (isVideo(element)) unobserveVideo(element);
}

function isElement(node: Node): node is Element {
    return "querySelector" in node;
}

function isVideo(element: Element): element is HTMLVideoElement {
    return "getVideoPlaybackQuality" in element;
}
