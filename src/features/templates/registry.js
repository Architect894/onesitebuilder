import LuxePhotoTemplate from "@/templates/luxe-photo/Template";
import luxePhotoSchema from "@/templates/luxe-photo/schema";

import LuxeModernTemplate from "@/templates/luxe-modern/Template";
import luxeModernSchema from "@/templates/luxe-modern/Schema";

import LuxeClassicTemplate from "@/templates/luxe-classic/Template";
import luxeClassicSchema from "@/templates/luxe-classic/Schema";

import LuxeMinimalTemplate from "@/templates/luxe-minimal/Template";
import luxeMinimalSchema from "@/templates/luxe-minimal/Schema";

// New factory-based templates
import TemplateShowcaseLuxeDark from "@/templates/prebuilt/TemplateShowcaseLuxeDark";
import TemplateStoryLuxeLight from "@/templates/prebuilt/TemplateStoryLuxeLight";
import TemplateVisualFirstEditorial from "@/templates/prebuilt/TemplateVisualFirstEditorial";
import TemplateConversionBoldModern from "@/templates/prebuilt/TemplateConversionBoldModern";
import TemplateShowcaseMinimalElegant from "@/templates/prebuilt/TemplateShowcaseMinimalElegant";

// Registry keyed by templateKey for O(1) lookup in the editor.
// Each entry merges the schema metadata with the component so a single import
// gives callers everything they need.
// 
// Legacy templates use explicit schemas; factory-based templates share a unified schema.
export const templateRegistry = {
    // ── Legacy templates (monolithic, schema-explicit) ──
    "luxe-photo": {
        component: LuxePhotoTemplate,
        schema: luxePhotoSchema,
        isFactory: false,
    },
    "luxe-modern": {
        component: LuxeModernTemplate,
        schema: luxeModernSchema,
        isFactory: false,
    },
    "luxe-classic": {
        component: LuxeClassicTemplate,
        schema: luxeClassicSchema,
        isFactory: false,
    },
    "luxe-minimal": {
        component: LuxeMinimalTemplate,
        schema: luxeMinimalSchema,
        isFactory: false,
    },

    // ── Factory-based templates (skeleton + style) ──
    // These share the same unified schema since they all use the same content structure
    "showcase-luxe-dark": {
        component: TemplateShowcaseLuxeDark,
        schema: luxePhotoSchema,
        isFactory: true,
        skeleton: "showcase",
        style: "luxe-dark",
        name: "Showcase",
        description: "Visual showcase with dark luxury aesthetic",
        industries: ["photo-booth", "wedding-photographer", "event-venue"],
    },
    "story-luxe-light": {
        component: TemplateStoryLuxeLight,
        schema: luxePhotoSchema,
        isFactory: true,
        skeleton: "story",
        style: "luxe-light",
        name: "Story",
        description: "Narrative-focused with bright minimal design",
        industries: ["wedding-planner", "event-venue", "consulting"],
    },
    "visual-first-editorial": {
        component: TemplateVisualFirstEditorial,
        schema: luxePhotoSchema,
        isFactory: true,
        skeleton: "visual-first",
        style: "editorial",
        name: "Editorial",
        description: "Gallery-first design with bold editorial styling",
        industries: ["wedding-photographer", "photo-booth", "videographer"],
    },
    "conversion-bold-modern": {
        component: TemplateConversionBoldModern,
        schema: luxePhotoSchema,
        isFactory: true,
        skeleton: "conversion",
        style: "bold-modern",
        name: "Conversion",
        description: "Booking-optimized with vibrant modern design",
        industries: ["wedding-dj", "event-venue", "catering", "salon"],
    },
    "showcase-minimal-elegant": {
        component: TemplateShowcaseMinimalElegant,
        schema: luxePhotoSchema,
        isFactory: true,
        skeleton: "showcase",
        style: "minimal-elegant",
        name: "Elegant",
        description: "Visual showcase with minimal elegant aesthetic",
        industries: ["wedding-photographer", "consulting", "salon"],
    },
};

// ── Helper functions ──────────────────────────────────────────────────────────

/** Return all templates as a flat array (schema + component together). */
export function getAllTemplates() {
    return Object.entries(templateRegistry)
        .filter(([_, entry]) => entry.isFactory) // Only return factory templates
        .map(([key, entry]) => {
            // Factory-based templates: merge metadata from registry + schema
            // NOTE: We exclude 'component' as it's non-serializable and handled client-side by key lookup
            return {
                ...entry.schema, // Get editable schema fields
                key: key,
                name: entry.name,
                description: entry.description,
                industries: entry.industries || [],
                style: entry.style, // For UI styling (accents in cards)
                skeleton: entry.skeleton,
                isFactory: true,
            };
        });
}

/**
 * Return templates compatible with a given industry slug.
 * e.g. getTemplatesByIndustry("photo-booth")
 */
export function getTemplatesByIndustry(industry) {
    return getAllTemplates().filter(
        (t) => Array.isArray(t.industries) && t.industries.includes(industry)
    );
}

/**
 * Return templates matching a style slug.
 * e.g. getTemplatesByStyle("modern")
 */
export function getTemplatesByStyle(style) {
    return getAllTemplates().filter((t) => t.style === style);
}

/**
 * Return templates matching one or more tags.
 * e.g. getTemplatesByTag("dark")
 */
export function getTemplatesByTag(tag) {
    return getAllTemplates().filter(
        (t) => Array.isArray(t.tags) && t.tags.includes(tag)
    );
}

/**
 * All unique industry slugs across all registered templates.
 * Useful for building filter UIs.
 */
export function getAllIndustries() {
    const set = new Set();
    getAllTemplates().forEach((t) => (t.industries ?? []).forEach((i) => set.add(i)));
    return [...set].sort();
}

/**
 * All unique style slugs across all registered templates.
 */
export function getAllStyles() {
    const set = new Set();
    getAllTemplates().forEach((t) => { if (t.style) set.add(t.style); });
    return [...set].sort();
}
