export interface PreviewProject {
    title: string;
    image: string;
    slug: string;
}

export interface PreviewHandle {

    show: (
        project: PreviewProject
    ) => void;

    hide: () => void;

    move: (
        x: number,
        y: number
    ) => void;

    getBounds: () => DOMRect | null;

    getElement: () => HTMLDivElement | null;

}