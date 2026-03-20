"use client";

/**
 * Template: Visual First + Editorial
 * 
 * Layout: Hero → Gallery → Services → Testimonials → CTA
 * Style: Bold editorial with vibrant accents
 */

import { createTemplate } from "@/templates/factories/createTemplate";
import { SKELETON_VISUAL_FIRST } from "@/templates/skeletons/definitions";
import { STYLE_EDITORIAL } from "@/templates/styles/presets";

export default createTemplate(SKELETON_VISUAL_FIRST, STYLE_EDITORIAL);
