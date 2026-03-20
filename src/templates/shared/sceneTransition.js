export const SCENE_FADE = {
    duration: 0.82,
    ease: [0.16, 1, 0.3, 1],
};

export function getSceneAnimation(sections, view, id, options = {}) {
    const { distance = 40, blur = 8, initialScale = 1.02 } = options;
    const targetIndex = sections.indexOf(id);
    const viewIndex = sections.indexOf(view);
    const isCurrent = id === view;

    return {
        opacity: isCurrent ? 1 : 0,
        y: isCurrent ? 0 : targetIndex < viewIndex ? -distance : distance,
        filter: isCurrent ? "blur(0px)" : `blur(${blur}px)`,
        scale: isCurrent ? 1 : initialScale,
    };
}
