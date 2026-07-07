import gsap from "@/lib/gsap";

class Transition {

    private clone: HTMLElement | null = null;

    start(element: HTMLElement) {

        this.destroy();

        const rect = element.getBoundingClientRect();

        this.clone = element.cloneNode(true) as HTMLElement;

        Object.assign(this.clone.style, {

            position: "fixed",

            left: `${rect.left}px`,

            top: `${rect.top}px`,

            width: `${rect.width}px`,

            height: `${rect.height}px`,

            margin: "0",

            pointerEvents: "none",

            zIndex: "999999",

            transform: "none",

            overflow: "hidden",

        });

        document.body.appendChild(this.clone);

    }

    finish(target: HTMLElement) {

        if (!this.clone) return;

        const rect = target.getBoundingClientRect();

        gsap.to(this.clone, {

            left: rect.left,

            top: rect.top,

            width: rect.width,

            height: rect.height,

            duration: 1.15,

            ease: "expo.inOut",

            onComplete: () => {

                this.destroy();

            }

        });

    }

    destroy() {

        this.clone?.remove();

        this.clone = null;

    }

}

export default new Transition();