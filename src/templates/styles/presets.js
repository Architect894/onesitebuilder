/**
 * Style presets for templates.
 * 
 * These define visual design decisions for a template:
 * - Color palette
 * - Typography
 * - Spacing
 * - Component styling
 * - Background treatments
 * 
 * Presets are applied on top of layout skeletons to create complete templates.
 */

export const STYLE_LUXE_DARK = {
    key: "luxe-dark",
    name: "Luxe Dark",
    heroDefaults: {
        bg: "#0d0b0a",
        accentColor: "#c9a96e",
        textColor: "#f5f0e8",
    },
    aboutDefaults: {
        bg: "#0f0d0c",
        textColor: "#f5f0e8",
    },
    servicesDefaults: {
        bg: "#0d0b0a",
        textColor: "#f5f0e8",
    },
    galleryDefaults: {
        bg: "#0a0a0a",
        textColor: "#f5f0e8",
    },
    featureDefaults: {
        bg: "#0d0d0d",
        textColor: "#f5f0e8",
    },
    ctaDefaults: {
        bg: "#111111",
        textColor: "#f5f0e8",
    },
    typography: {
        serif: "Georgia, 'Times New Roman', serif",
        sansSerif: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    spacing: {
        sectionPadding: "px-12 py-20",
        elementGap: "gap-6",
        rule: true, // render thin accent rules between sections
    },
    components: {
        buttonStyle: "border transition-all duration-300",
        buttonHover: "hover:border-opacity-100 hover:bg-opacity-10",
    },
    sceneScale: 1.02, // settle-in scale effect
    description: "Dark luxury aesthetic with serif accents. Classic and timeless.",
};

export const STYLE_LUXE_LIGHT = {
    key: "luxe-light",
    name: "Luxe Light",
    heroDefaults: {
        bg: "#fafafa",
        accentColor: "#1a1a1a",
        textColor: "#1a1a1a",
    },
    aboutDefaults: {
        bg: "#ffffff",
        textColor: "#1a1a1a",
    },
    servicesDefaults: {
        bg: "#fafafa",
        textColor: "#1a1a1a",
    },
    galleryDefaults: {
        bg: "#ffffff",
        textColor: "#1a1a1a",
    },
    featureDefaults: {
        bg: "#f5f5f5",
        textColor: "#1a1a1a",
    },
    ctaDefaults: {
        bg: "#fafafa",
        textColor: "#1a1a1a",
    },
    typography: {
        serif: "Georgia, 'Times New Roman', serif",
        sansSerif: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    spacing: {
        sectionPadding: "px-12 py-20",
        elementGap: "gap-6",
        rule: true,
    },
    components: {
        buttonStyle: "border transition-all duration-300",
        buttonHover: "hover:border-opacity-100",
    },
    sceneScale: 1.02,
    description: "Bright minimal aesthetic with dark accents. Clean and modern.",
};

export const STYLE_EDITORIAL = {
    key: "editorial",
    name: "Editorial",
    heroDefaults: {
        bg: "#0a0a0a",
        accentColor: "#ff6b6b",
        textColor: "#ffffff",
    },
    aboutDefaults: {
        bg: "#1a1a1a",
        textColor: "#ffffff",
    },
    servicesDefaults: {
        bg: "#0a0a0a",
        textColor: "#ffffff",
    },
    galleryDefaults: {
        bg: "#0f0f0f",
        textColor: "#ffffff",
    },
    featureDefaults: {
        bg: "#1a1a1a",
        textColor: "#ffffff",
    },
    ctaDefaults: {
        bg: "#000000",
        textColor: "#ffffff",
    },
    typography: {
        serif: "'Crimson Text', 'Garamond', serif",
        sansSerif: "'Inter', '-apple-system', sans-serif",
    },
    spacing: {
        sectionPadding: "px-16 py-24",
        elementGap: "gap-8",
        rule: false,
    },
    components: {
        buttonStyle: "rounded-none uppercase tracking-widest",
        buttonHover: "hover:bg-opacity-75",
    },
    sceneScale: 1.015, // more subtle scale
    description: "Bold editorial aesthetic. Stark and dramatic for creative agencies.",
};

export const STYLE_BOLD_MODERN = {
    key: "bold-modern",
    name: "Bold Modern",
    heroDefaults: {
        bg: "#ffffff",
        accentColor: "#0066ff",
        textColor: "#000000",
    },
    aboutDefaults: {
        bg: "#f8f8f8",
        textColor: "#000000",
    },
    servicesDefaults: {
        bg: "#ffffff",
        textColor: "#000000",
    },
    galleryDefaults: {
        bg: "#f0f0f0",
        textColor: "#000000",
    },
    featureDefaults: {
        bg: "#fafafa",
        textColor: "#000000",
    },
    ctaDefaults: {
        bg: "#0066ff",
        textColor: "#ffffff",
    },
    typography: {
        serif: "'Space Mono', monospace",
        sansSerif: "'Poppins', '-apple-system', sans-serif",
    },
    spacing: {
        sectionPadding: "px-8 py-16",
        elementGap: "gap-4",
        rule: false,
    },
    components: {
        buttonStyle: "rounded-lg font-bold text-sm",
        buttonHover: "hover:scale-105",
    },
    sceneScale: 1.02,
    description: "Vibrant modern tech aesthetic. High contrast and energetic.",
};

export const STYLE_MINIMAL_ELEGANT = {
    key: "minimal-elegant",
    name: "Minimal Elegant",
    heroDefaults: {
        bg: "#f5f5f5",
        accentColor: "#8b7355",
        textColor: "#2a2a2a",
    },
    aboutDefaults: {
        bg: "#ffffff",
        textColor: "#2a2a2a",
    },
    servicesDefaults: {
        bg: "#f9f9f9",
        textColor: "#2a2a2a",
    },
    galleryDefaults: {
        bg: "#ffffff",
        textColor: "#2a2a2a",
    },
    featureDefaults: {
        bg: "#f5f5f5",
        textColor: "#2a2a2a",
    },
    ctaDefaults: {
        bg: "#f9f9f9",
        textColor: "#2a2a2a",
    },
    typography: {
        serif: "'Lora', serif",
        sansSerif: "'Raleway', '-apple-system', sans-serif",
    },
    spacing: {
        sectionPadding: "px-10 py-16",
        elementGap: "gap-5",
        rule: false,
    },
    components: {
        buttonStyle: "border border-current rounded-sm uppercase tracking-wide text-xs",
        buttonHover: "hover:bg-current hover:text-white",
    },
    sceneScale: 1.01, // very subtle scale
    description: "Minimal aesthetic with warm earthy tones. Sophisticated simplicity.",
};

export const STYLES = {
    [STYLE_LUXE_DARK.key]: STYLE_LUXE_DARK,
    [STYLE_LUXE_LIGHT.key]: STYLE_LUXE_LIGHT,
    [STYLE_EDITORIAL.key]: STYLE_EDITORIAL,
    [STYLE_BOLD_MODERN.key]: STYLE_BOLD_MODERN,
    [STYLE_MINIMAL_ELEGANT.key]: STYLE_MINIMAL_ELEGANT,
};

export function getStylePreset(key) {
    return STYLES[key];
}

export const DEFAULT_STYLE = STYLE_LUXE_DARK;
