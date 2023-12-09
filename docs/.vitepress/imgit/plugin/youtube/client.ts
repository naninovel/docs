import { addHandler } from "../../client/mutation";
import "./styles.css";

addHandler([handleAdded, handleRemoved]);

function handleAdded(added: Element) {
    for (const banner of added.querySelectorAll<HTMLButtonElement>("button.imgit-youtube-banner"))
        banner.addEventListener("click", handleBannerClick);
    for (const poster of added.querySelectorAll<HTMLDivElement>("div.imgit-youtube-poster"))
        poster.addEventListener("click", handlePlayClick);
}

function handleRemoved(removed: Element) {
    for (const banner of removed.querySelectorAll<HTMLButtonElement>("button.imgit-youtube-banner"))
        banner.removeEventListener("click", handleBannerClick);
    for (const poster of removed.querySelectorAll<HTMLDivElement>("div.imgit-youtube-poster"))
        poster.removeEventListener("click", handlePlayClick);
}

function handleBannerClick(event: Event) {
    const button = <HTMLButtonElement>event.currentTarget;
    const href = button.dataset.href!;
    window.open(href, "_blank");
}

function handlePlayClick(event: Event) {
    const poster = <HTMLDivElement>event.currentTarget;
    const container = <HTMLDivElement>poster.parentElement;
    const iframe = <HTMLIFrameElement>container.lastChild!.firstChild;
    container.classList.add("imgit-youtube-loading");
    iframe.src = iframe.dataset.src!;
    iframe.addEventListener("load", handlePlayerLoaded);
}

function handlePlayerLoaded(event: Event) {
    const iframe = <HTMLIFrameElement>event.currentTarget;
    const player = <HTMLDivElement>iframe.parentElement;
    const container = <HTMLDivElement>player.parentElement;
    iframe.click();
    container.classList.add("imgit-youtube-playing");
    player.hidden = false;
}
