"use client";

/**
 * Template: Showcase + Luxe Dark
 * 
 * Layout: Hero → Services → Gallery → Testimonials → CTA
 * Style: Dark luxury with warm gold accents
 */

import { createTemplate } from "@/templates/factories/createTemplate";
import { SKELETON_SHOWCASE } from "@/templates/skeletons/definitions";
import { STYLE_LUXE_DARK } from "@/templates/styles/presets";

export default createTemplate(SKELETON_SHOWCASE, STYLE_LUXE_DARK);
