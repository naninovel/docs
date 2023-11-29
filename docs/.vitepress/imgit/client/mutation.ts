import { observeIntersections, unobserveIntersections } from "./intersection";

const observer = canObserve() ? new MutationObserver(handleMutations) : undefined;

export function observeMutations() {
    observer?.observe(document.body, { childList: true, subtree: true });
    if (canObserve()) handleAddedNode(document.body);
}

function canObserve() {
    return typeof document === "object" && "MutationObserver" in window;
}

function handleMutations(mutations: MutationRecord[]) {
    for (const mutation of mutations)
        handleMutation(mutation);
}

function handleMutation(mutation: MutationRecord) {
    if (mutation.type !== "childList") return;
    for (const node of mutation.addedNodes)
        if (node instanceof HTMLElement)
            handleAddedNode(node);
    for (const node of mutation.removedNodes)
        if (node instanceof HTMLElement)
            handleRemovedNode(node);
}

function handleAddedNode(added: HTMLElement) {
    for (const element of added.querySelectorAll("video.imgit-video"))
        if (element instanceof HTMLElement)
            observeIntersections(element);
}

function handleRemovedNode(removed: HTMLElement) {
    for (const element of removed.querySelectorAll("video.imgit-video"))
        if (element instanceof HTMLElement)
            unobserveIntersections(element);
}
