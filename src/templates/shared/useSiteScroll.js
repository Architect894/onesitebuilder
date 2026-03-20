"use client";

import { useState, useRef, useEffect } from "react";

/**
 * Hybrid scroll engine for Luxe templates.
 *
 * "Snap" sections (default): wheel immediately crossfades to the next section.
 * "Scroll" sections: wheel scrolls through inner content first; crossfade fires
 *   only when the user reaches the top or bottom boundary.
 *
 * When navigating INTO a scroll section going backward, the section is
 * auto-scrolled to its bottom so the user can scroll back up through it naturally.
 *
 * Usage:
 *   const { view, switchView, containerRef, getScrollRef } = useSiteScroll(
 *     SECTIONS,
 *     { scrollSections: new Set(["about", "services"]), isEditor }
 *   );
 *
 *   Attach containerRef to the outer <main>.
 *   Attach getScrollRef("about") as the ref prop on the scroll section's root div.
 */
export function useSiteScroll(sections, { scrollSections = new Set(), isEditor = false } = {}) {
  const [view, setView] = useState(sections[0]);
  const viewRef = useRef(sections[0]);
  const transitioningRef = useRef(false);
  const containerRef = useRef(null);
  const sectionScrollRefs = useRef({});

  function switchView(next) {
    if (viewRef.current === next || transitioningRef.current) return;

    const nextIdx = sections.indexOf(next);
    const currIdx = sections.indexOf(viewRef.current);
    const goingBack = nextIdx < currIdx;

    transitioningRef.current = true;
    viewRef.current = next;
    setView(next);

    // Position the incoming scroll section at the right end before it fades in
    if (scrollSections.has(next)) {
      requestAnimationFrame(() => {
        const el = sectionScrollRefs.current[next];
        if (el) el.scrollTop = goingBack ? el.scrollHeight : 0;
      });
    }

    setTimeout(() => {
      transitioningRef.current = false;
    }, 900);
  }

  /** Returns a callback ref to attach to a scroll section's root div. */
  function getScrollRef(sectionId) {
    return (el) => {
      sectionScrollRefs.current[sectionId] = el;
    };
  }

  useEffect(() => {
    if (isEditor) return;
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const current = viewRef.current;
      const idx = sections.indexOf(current);

      if (scrollSections.has(current)) {
        const innerEl = sectionScrollRefs.current[current];
        if (innerEl) {
          const atBottom = innerEl.scrollHeight - innerEl.scrollTop <= innerEl.clientHeight + 4;
          const atTop = innerEl.scrollTop <= 4;

          // Not at boundary → scroll the inner content and absorb the event
          if (e.deltaY > 10 && !atBottom) {
            e.preventDefault();
            innerEl.scrollTop += e.deltaY * 0.85;
            return;
          }
          if (e.deltaY < -10 && !atTop) {
            e.preventDefault();
            innerEl.scrollTop += e.deltaY * 0.85;
            return;
          }
        }
      }

      // Boundary reached (or snap section) → crossfade
      e.preventDefault();
      if (transitioningRef.current) return;
      if (e.deltaY > 10 && idx < sections.length - 1) switchView(sections[idx + 1]);
      if (e.deltaY < -10 && idx > 0) switchView(sections[idx - 1]);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isEditor]); // eslint-disable-line react-hooks/exhaustive-deps

  return { view, switchView, containerRef, getScrollRef };
}
