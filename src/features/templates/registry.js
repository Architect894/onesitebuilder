import LuxePhotoTemplate from "@/templates/luxe-photo/Template";
import luxePhotoSchema from "@/templates/luxe-photo/schema";

import LuxeModernTemplate from "@/templates/luxe-modern/Template";
import luxeModernSchema from "@/templates/luxe-modern/Schema";

export const templateRegistry = {
    "luxe-photo": {
        component: LuxePhotoTemplate,
        schema: luxePhotoSchema,
    },

    "luxe-modern": {
        component: LuxeModernTemplate,
        schema: luxeModernSchema,
    },
};