const init = () => {
    
    const elevate = (panel: HTMLDivElement, initial: boolean) => {
        zCounter += 1;
        panel.style.zIndex = String(100 + zCounter);
        if (!initial) {
            panel.classList.remove("entering");
            void panel.offsetWidth;
            panel.classList.add("entering");
        }
    };

    const panels = Array.from(document.querySelectorAll<HTMLDivElement>(".panel"));
    if (panels.length === 0) return;
 
    const nav = document.querySelector<HTMLElement>(".navbar");
    if (!nav) return;
 
    const buttons = Array.from(nav.querySelectorAll<HTMLButtonElement>("button"));
    let zCounter = 1;
    const initialButton = buttons.find((btn) => btn.getAttribute("aria-current") === "page");
    let current =
        initialButton?.dataset.target ?? panels[0]?.id ?? "";
    let isTransitioning = false;

 
    if (current) {
        const initialPanel = document.getElementById(current) as HTMLDivElement | null;
        if (initialPanel) {
            elevate(initialPanel, true);
        }
    }
 
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.target;
            if (target) goTo(target, "nav");
        });
    });
 
    let wheelLock = false;
    window.addEventListener("wheel", (event) => {
        event.preventDefault();
        if (wheelLock || isTransitioning) return;
        wheelLock = true;
        const direction = Math.sign(event.deltaY);
        step(direction > 0 ? 1 : -1, "wheel");
        window.setTimeout(() => {
            wheelLock = false;
        }, 420);
    }, { passive: false });
 
    let touchY: number | null = null;
    window.addEventListener("touchstart", (event) => {
        if (event.touches.length === 1) {
            touchY = event.touches[0]?.clientY ?? null;
        }
    }, { passive: true });
    window.addEventListener("touchend", (event) => {
        if (touchY == null) {
            touchY = null;
            return;
        }
 
        const endY = event.changedTouches?.[0]?.clientY ?? touchY;
        const deltaY = endY - touchY;
        const threshold = 40;
        if (Math.abs(deltaY) > threshold) {
            step(deltaY > 0 ? -1 : 1, "swipe");
        }
        touchY = null;
    }, { passive: true });
 
    const ids = () => panels.map((panel) => panel.id);
    const indexOf = (id: string) => ids().indexOf(id);
 
    const step = (delta: number, via: string) => {
        const order = ids();
        let index = indexOf(current);
        index = (index + delta + order.length) % order.length;
        goTo(order[index], via);
    };
 
    const goTo = (id: string, via: string) => {
        if (id === current) return;
        const target = document.getElementById(id) as HTMLDivElement | null;
        if (!target) return;
        isTransitioning = true;
 
        buttons.forEach((button) => {
            button.setAttribute("aria-current", button.dataset.target === id ? "page" : "false");
        });
 
        elevate(target, false);
 
        panels.forEach((panel) => {
            panel.setAttribute("aria-hidden", panel.id === id ? "false" : "true");
        });
 
        window.setTimeout(() => {
            current = id;
            isTransitioning = false;
        }, readDuration("--wipe-ms") ?? 700);
    };
 

 
    const readDuration = (variable: string) => {
        const value = getComputedStyle(document.documentElement)
            .getPropertyValue(variable)
            .trim();
        if (!value) return null;
        if (value.endsWith("ms")) return Number.parseFloat(value);
        if (value.endsWith("s")) return Number.parseFloat(value) * 1000;
        const parsed = Number.parseFloat(value);
        return Number.isNaN(parsed) ? null : parsed;
    };
};
 
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
    init();
}


export { init };