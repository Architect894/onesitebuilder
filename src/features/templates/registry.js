import LuxePhotoTemplate from "@/templates/luxe-photo/Template";
import luxePhotoSchema from "@/templates/luxe-photo/schema";

import LuxeModernTemplate from "@/templates/luxe-modern/Template";
import luxeModernSchema from "@/templates/luxe-modern/Schema";

import LuxeClassicTemplate from "@/templates/luxe-classic/Template";
import luxeClassicSchema from "@/templates/luxe-classic/Schema";

import LuxeMinimalTemplate from "@/templates/luxe-minimal/Template";
import luxeMinimalSchema from "@/templates/luxe-minimal/Schema";

export const templateRegistry = {
    "luxe-photo": {
        component: LuxePhotoTemplate,
        schema: luxePhotoSchema,
    },

    "luxe-modern": {
        component: LuxeModernTemplate,
        schema: luxeModernSchema,
    },

    "luxe-classic": {
        component: LuxeClassicTemplate,
        schema: luxeClassicSchema,
    },

    "luxe-minimal": {
        component: LuxeMinimalTemplate,
        schema: luxeMinimalSchema,
    },
};