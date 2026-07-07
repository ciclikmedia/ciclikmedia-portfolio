export function waitForElement(
    id: string,
    callback: (element: HTMLElement) => void,
) {

    const tick = () => {

        const element =
            document.getElementById(id);

        if (element) {

            callback(element);

            return;

        }

        requestAnimationFrame(tick);

    };

    tick();

}