/**
 * Layout skeleton definitions.
 * 
 * These define the structure and section order of templates but contain no styling.
 * They are combined with style presets to create complete templates.
 * 
 * Each skeleton defines:
 * - sections: ordered array of section IDs
 * - scrollSections: sections that allow inner scrolling before crossfading
 * - description: human-readable template structure
 */

export const SKELETON_SHOWCASE = {
    key: "showcase",
    sections: ["hero", "services", "gallery", "testimonials", "cta"],
    scrollSections: ["services"],
    description: "Hero → Services → Gallery → Testimonials → CTA. Perfect for visual portfolios and creative businesses.",
};

export const SKELETON_STORY = {
    key: "story",
    sections: ["hero", "about", "services", "gallery", "contact"],
    scrollSections: ["services"],
    description: "Hero → About → Services → Gallery → Contact. Narrative-focused for storytelling brands.",
};

export const SKELETON_VISUAL_FIRST = {
    key: "visual-first",
    sections: ["hero", "gallery", "services", "testimonials", "cta"],
    scrollSections: ["services"],
    description: "Hero → Gallery → Services → Testimonials → CTA. Gallery-first for photography and visual work.",
};

export const SKELETON_CONVERSION = {
    key: "conversion",
    sections: ["hero", "services", "features", "testimonials", "cta"],
    scrollSections: ["features"],
    description: "Hero → Services → Features → Testimonials → CTA. Optimized for booking and conversion.",
};

/**
 * Map skeleton keys to definitions for quick lookup.
 */
export const SKELETONS = {
    [SKELETON_SHOWCASE.key]: SKELETON_SHOWCASE,
    [SKELETON_STORY.key]: SKELETON_STORY,
    [SKELETON_VISUAL_FIRST.key]: SKELETON_VISUAL_FIRST,
    [SKELETON_CONVERSION.key]: SKELETON_CONVERSION,
};

export function getSkeletonDefinition(key) {
    return SKELETONS[key];
}
