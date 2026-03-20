"use client";

/**
 * Template: Showcase + Minimal Elegant
 * 
 * Layout: Hero → Services → Gallery → Testimonials → CTA
 * Style: Minimal aesthetic with earthy tones
 */

import { createTemplate } from "@/templates/factories/createTemplate";
import { SKELETON_SHOWCASE } from "@/templates/skeletons/definitions";
import { STYLE_MINIMAL_ELEGANT } from "@/templates/styles/presets";

export default createTemplate(SKELETON_SHOWCASE, STYLE_MINIMAL_ELEGANT);
