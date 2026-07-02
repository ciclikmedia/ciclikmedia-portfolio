import { PreviewProject } from "@/components/ProjectPreview/ProjectPreview.types";

type ShowCallback = (project: PreviewProject) => void;
type HideCallback = () => void;

let showCallback: ShowCallback | null = null;
let hideCallback: HideCallback | null = null;

export function registerProjectPreview(
  show: ShowCallback,
  hide: HideCallback
) {
  showCallback = show;
  hideCallback = hide;
}

export function unregisterProjectPreview() {
  showCallback = null;
  hideCallback = null;
}

export function showProjectPreview(
  project: PreviewProject
) {
  showCallback?.(project);
}

export function hideProjectPreview() {
  hideCallback?.();
}