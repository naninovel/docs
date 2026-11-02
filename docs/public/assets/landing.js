/* ─── Header ─── */
const header = document.querySelector("header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll);
onScroll();

/* ─── Mobile menu ─── */
const menuToggle = document.querySelector(".menu-toggle");
const menuPanel = document.getElementById("menu-panel");
const menuBackdrop = document.querySelector(".menu-backdrop");
const setMenuOpen = open => {
    menuPanel.classList.toggle("open", open);
    menuBackdrop.classList.toggle("open", open);
    menuToggle.ariaExpanded = open;
};
menuToggle.addEventListener("click", () => setMenuOpen(!menuPanel.classList.contains("open")));
menuPanel.addEventListener("click", e => { if (e.target.closest("a")) setMenuOpen(false); });
menuBackdrop.addEventListener("click", () => setMenuOpen(false));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenuOpen(false); });
matchMedia("(width > 900px)").addEventListener("change", () => setMenuOpen(false));

/* ─── Language menu ─── */
{
    const langMenu = document.getElementById("lang-menu");
    let closeTimer;
    for (const el of [document.querySelector(".lang-toggle"), langMenu]) {
        el.addEventListener("pointerenter", e => {
            if (e.pointerType !== "mouse") return;
            clearTimeout(closeTimer);
            langMenu.togglePopover(true);
        });
        el.addEventListener("pointerleave", e => {
            if (e.pointerType === "mouse") closeTimer = setTimeout(() => langMenu.togglePopover(false), 200);
        });
    }
}

/* ─── Hero layout ─── */
{
    const hero = document.querySelector(".hero"), title = hero.querySelector(".hero-title");
    const script = hero.querySelector(".script"), bar = script.querySelector(".script-bar"), list = script.querySelector(".script-lines");
    const measure = () => {
        hero.style.setProperty("--title-height", title.offsetHeight + "px");
        const last = list.lastElementChild, padding = parseFloat(getComputedStyle(list).paddingBottom);
        hero.style.setProperty("--file-height", Math.ceil(bar.offsetHeight + last.offsetTop + last.offsetHeight + padding) + "px");
    };
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(title);
    resizeObserver.observe(script);
}

/* ─── Footer year ─── */
document.getElementById("year").textContent = "–" + new Date().getFullYear();

/* ─── Deferred images ─── */
function loadDeferredImages() {
    if (document.readyState !== "complete") return addEventListener("load", loadDeferredImages, { once: true });
    document.querySelectorAll("img[loading=lazy]").forEach(img => img.loading = "eager");
}

/* ─── Glyphs ─── */
/* The whole text is laid out up front, in unbreakable words, so nothing reflows while it's revealed. */
function splitIntoGlyphs(element, text) {
    const glyphs = [];
    element.replaceChildren(...text.split(/(\s+)/).filter(Boolean).map(part => {
        if (/\s/.test(part)) return part;
        const word = document.createElement("span");
        word.className = "word";
        for (const letter of part) {
            const glyph = document.createElement("span");
            glyph.className = "glyph";
            glyph.style.setProperty("--glyph-index", glyphs.length);
            glyph.textContent = letter;
            word.append(glyph);
            glyphs.push(glyph);
        }
        return word;
    }));
    return glyphs;
}

/* ─── Reveal on scroll ─── */
{
    const STAGGER_MS = 100;
    let lastStart = -Infinity;
    const revealObserver = new IntersectionObserver(entries => {
        const now = performance.now();
        entries
            .filter(e => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
            .forEach(({ target }) => {
                if (target.matches("[data-reveal]")) {
                    lastStart = Math.max(now, lastStart + STAGGER_MS);
                    target.style.setProperty("--reveal-delay", Math.round(lastStart - now) + "ms");
                }
                target.classList.add("revealed");
                revealObserver.unobserve(target);
            });
    }, { threshold: .1, rootMargin: "0px 0px -48px 0px" });
    document.querySelectorAll("[data-reveal]").forEach(heading => splitIntoGlyphs(heading, heading.textContent));
    document.querySelectorAll(".reveal, [data-reveal]").forEach(el => revealObserver.observe(el));
}

/* ─── Trailer ─── */
{
    const frame = document.querySelector(".trailer-frame");
    const glass = frame.querySelector(".youtube");
    const theater = document.querySelector(".theater");
    const screen = theater.querySelector(".theater-screen");
    const FLIGHT_BACK_MS = 560;
    const LIGHT = ["--light-x", "--light-y"];
    let player = null, closing = 0;

    const poseOver = rect => {
        const own = screen.getBoundingClientRect();
        return `translate(${rect.left - own.left}px, ${rect.top - own.top}px) scale(${rect.width / own.width})`;
    };
    const restLight = () => LIGHT.forEach(name => glass.style.removeProperty(name));

    function open() {
        const from = frame.getBoundingClientRect();
        for (const name of LIGHT) theater.style.setProperty(name, glass.style.getPropertyValue(name));
        theater.showModal();
        frame.classList.add("away");
        const loading = player = document.createElement("iframe");
        player.title = theater.ariaLabel;
        player.allow = "autoplay; encrypted-media; fullscreen; picture-in-picture";
        player.src = screen.dataset.src;
        player.addEventListener("load", () => { if (player === loading) theater.classList.add("playing"); }, { once: true });
        screen.append(player);
        screen.animate([{ transform: poseOver(from) }, { transform: "none" }], { duration: 720, easing: "cubic-bezier(.2, .7, .2, 1)" });
    }

    function close() {
        if (!theater.open || closing) return;
        player?.remove();
        player = null;
        theater.classList.remove("playing");
        theater.classList.add("closing");
        screen.getAnimations().forEach(animation => animation.cancel());
        screen.animate([{ transform: "none" }, { transform: poseOver(frame.getBoundingClientRect()) }], { duration: FLIGHT_BACK_MS, easing: "cubic-bezier(.4, 0, .2, 1)", fill: "forwards" });
        closing = setTimeout(() => { restorePage(); theater.close(); }, FLIGHT_BACK_MS);
    }

    function restorePage() {
        player?.remove();
        player = null;
        clearTimeout(closing);
        closing = 0;
        theater.classList.remove("playing", "closing");
        screen.getAnimations().forEach(animation => animation.cancel());
        frame.classList.remove("away");
        if (!frame.matches(":hover")) restLight();
    }

    frame.addEventListener("pointermove", ({ pointerType, clientX, clientY }) => {
        if (pointerType === "touch") return;
        const box = frame.getBoundingClientRect();
        glass.style.setProperty("--light-x", (clientX - box.left) / box.width);
        glass.style.setProperty("--light-y", (clientY - box.top) / box.height);
    });
    frame.addEventListener("pointerleave", () => { if (!frame.classList.contains("away")) restLight(); });
    frame.querySelector(".youtube-poster").addEventListener("click", open);
    theater.addEventListener("cancel", event => { event.preventDefault(); close(); });
    theater.addEventListener("click", event => { if (!screen.contains(event.target)) close(); });
    theater.addEventListener("close", restorePage);
}

/* ─── Hero scene ─── */
{
    const hero = document.querySelector(".hero");
    const stage = hero.querySelector(".stage");
    const list = hero.querySelector(".script-lines");
    const lines = [...list.children];
    const stateButton = hero.querySelector(".script-state");
    const printer = stage.querySelector(".printer");
    const nameEl = printer.querySelector(".printer-name");
    const textEl = printer.querySelector(".printer-text");
    const liveRegion = stage.querySelector(".live-region");
    const choices = [...stage.querySelectorAll(".choice")];
    const chars = {};
    stage.querySelectorAll(".char").forEach(el => chars[el.dataset.char] = el);
    const STEP_MS = 26, SWAP_MS = 170, PAUSE_MS = 700, LETTER_READ_MS = document.documentElement.matches(":lang(ja), :lang(zh)") ? 36 : 18;
    const holdFor = text => Math.min(2600, 1000 + text.length * LETTER_READ_MS);
    const stripCommands = line => line.replace(/\[[->]\]/g, "");
    const DISPLAY_NAMES = { Nani: "Nani-kun" }; // (only where they differ from the IDs)

    let lineIndex = -1, timer = 0, frame = 0, printing = null;

    const clearTimers = () => { clearTimeout(timer); timer = 0; cancelAnimationFrame(frame); frame = 0; };
    const after = (fn, ms) => { clearTimers(); timer = setTimeout(fn, ms); };
    const setState = state => {
        stateButton.className = "script-state " + state;
        stateButton.textContent = stateButton.dataset[state];
        stateButton.disabled = state !== "ended";
    };

    /* Scrolls the list only, never the page. */
    function keepVisible(line) {
        const top = line.offsetTop, height = list.clientHeight;
        if (top < list.scrollTop + 12 || top + line.offsetHeight > list.scrollTop + height - 12)
            list.scrollTo({ top: Math.max(0, top - height / 3), behavior: "smooth" });
    }

    function setLook(who, look, instant) {
        if (!look) return;
        const el = chars[who];
        const images = [...el.querySelectorAll("img")];
        const incoming = images.find(img => img.dataset.look === look);
        el.querySelector(".shade").style.setProperty("--sprite", `url("${incoming.src}")`);
        clearTimeout(el.swapTimer);
        if (instant) {
            images.forEach(img => { img.classList.toggle("on", img === incoming); img.classList.toggle("front", img === incoming); });
            return;
        }
        if (incoming.classList.contains("front")) return;
        /* The new look fades in over the old one, which stays opaque, so the sprite is never see-through. */
        const outgoing = images.filter(img => img !== incoming && img.classList.contains("on"));
        outgoing.forEach(img => img.classList.remove("front"));
        incoming.classList.add("on", "front");
        el.swapTimer = setTimeout(() => outgoing.forEach(img => img.classList.remove("on")), 300);
    }

    function setSpeaker(who) {
        stage.dataset.speaker = who;
        Object.entries(chars).forEach(([id, el]) => el.classList.toggle("speaking", id === who));
    }

    function start() {
        clearTimers();
        lineIndex = -1;
        lines.forEach(line => line.classList.remove("current", "done"));
        stage.classList.remove("lit", "shake", "choosing");
        delete stage.dataset.speaker;
        Object.entries(chars).forEach(([id, el]) => {
            el.classList.remove("on", "speaking");
            setLook(id, el.querySelector("img").dataset.look, true);
        });
        printer.classList.remove("on", "waiting");
        nameEl.textContent = textEl.textContent = liveRegion.textContent = "";
        nameEl.style.width = "";
        choices.forEach(choice => choice.classList.remove("on"));
        list.scrollTop = 0;
        setState("playing");
        after(next, 200);
    }

    function next() {
        clearTimers();
        printer.classList.remove("waiting");
        lines[lineIndex]?.classList.replace("current", "done");
        if (++lineIndex >= lines.length) return setState("ended");
        const line = lines[lineIndex], text = line.textContent;
        line.classList.add("current");
        keepVisible(line);
        const [, command, target, rest] = text.match(/^@(\w+) (\S+)(.*)/) ?? [];
        switch (command) {
            case "back":
                stage.classList.add("lit");
                return next();
            case "char":
                /* The sprites face left; look:Right mirrors them. */
                chars[target].classList.toggle("flip", rest.includes("look:Right"));
                chars[target].classList.add("on");
                return next();
            case "shake":
                stage.classList.add("shake");
                setTimeout(() => stage.classList.remove("shake"), 650);
                return after(next, 800);
            case "choice":
                if (!stage.classList.contains("choosing")) openChoices();
                choices.find(choice => text.includes(`"${choice.textContent}"`)).classList.add("on");
                return next();
            default: return say(...text.match(/^(\w+)(?:\.(\w+))?: (.*)/).slice(1));
        }
    }

    function setName(name) {
        const current = nameEl.lastElementChild;
        if (current?.textContent === name) return;
        const incoming = document.createElement("span");
        incoming.textContent = name;
        if (!current) { nameEl.append(incoming); return; }
        /* Drop a name still fading out, then measure the new width by swapping the name in before paint. */
        [...nameEl.children].forEach(span => span !== current && span.remove());
        const fromWidth = nameEl.offsetWidth, currentName = current.textContent;
        nameEl.style.width = "";
        current.textContent = name;
        const toWidth = nameEl.offsetWidth;
        current.textContent = currentName;
        incoming.className = "out";
        nameEl.append(incoming);
        nameEl.style.width = fromWidth + "px";
        nameEl.offsetWidth;
        nameEl.style.width = toWidth + "px";
        current.classList.add("out");
        incoming.classList.remove("out");
        current.addEventListener("transitionend", () => current.remove(), { once: true });
    }
    nameEl.addEventListener("transitionend", e => { if (e.propertyName === "width") nameEl.style.width = ""; });

    function say(who, look, text) {
        const name = DISPLAY_NAMES[who] ?? who;
        setLook(who, look);
        setSpeaker(who);
        printer.classList.add("on");
        setName(name);
        liveRegion.textContent = name + ": " + stripCommands(text);
        if (textEl.textContent) {
            textEl.classList.add("out");
            after(() => reveal(text), SWAP_MS);
        } else reveal(text);
    }

    function reveal(line) {
        textEl.classList.remove("out");
        const text = stripCommands(line);
        const glyphs = splitIntoGlyphs(textEl, text);
        const revealTimes = [];
        line.split("[-]").forEach((part, pauses) => {
            for (const letter of stripCommands(part))
                if (!/\s/.test(letter)) revealTimes.push(revealTimes.length * STEP_MS + pauses * PAUSE_MS);
        });
        printing = { text, glyphs };
        const startTime = performance.now();
        let shownCount = 0;
        (function tick(now) {
            while (shownCount < glyphs.length && now - startTime >= revealTimes[shownCount]) glyphs[shownCount++].classList.add("on");
            if (shownCount < glyphs.length) frame = requestAnimationFrame(tick);
            else { frame = 0; onLineDone(text); }
        })(startTime);
    }

    function openChoices() {
        const from = printer.offsetHeight;
        stage.classList.add("choosing");
        const to = printer.offsetHeight;
        if (from !== to) printer.animate([{ height: from + "px" }, { height: to + "px" }], { duration: 560, easing: "cubic-bezier(.22, .8, .24, 1)" });
    }

    function onLineDone(text) {
        loadDeferredImages();
        if (lines[lineIndex + 1]?.textContent.startsWith("@choice")) return next();
        printer.classList.add("waiting");
        after(next, holdFor(text));
    }

    printer.addEventListener("click", e => {
        if (e.target.closest(".choice") || stage.classList.contains("choosing")) return;
        if (frame) {
            cancelAnimationFrame(frame);
            frame = 0;
            printing.glyphs.forEach(glyph => glyph.classList.add("on"));
            onLineDone(printing.text);
        } else if (printer.classList.contains("waiting")) next();
    });

    choices.forEach(choice => {
        const label = document.createElement("span");
        splitIntoGlyphs(label, choice.lastChild.textContent);
        choice.lastChild.replaceWith(label);
    });

    stateButton.addEventListener("click", start);

    new IntersectionObserver(entries => stage.classList.toggle("paused", !entries.at(-1).isIntersecting)).observe(stage);

    if (document.hidden) document.addEventListener("visibilitychange", start, { once: true });
    else start();
}
