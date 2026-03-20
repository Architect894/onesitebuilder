"use client";

/**
 * Template: Story + Luxe Light
 * 
 * Layout: Hero → About → Services → Gallery → Contact
 * Style: Bright minimal with dark accents
 */

import { createTemplate } from "@/templates/factories/createTemplate";
import { SKELETON_STORY } from "@/templates/skeletons/definitions";
import { STYLE_LUXE_LIGHT } from "@/templates/styles/presets";

export default createTemplate(SKELETON_STORY, STYLE_LUXE_LIGHT);
