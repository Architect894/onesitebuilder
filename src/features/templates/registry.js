import LuxePhotoTemplate from "@/templates/luxe-photo/Template";
import luxePhotoSchema from "@/templates/luxe-photo/schema";

export const templateRegistry = {
    "luxe-photo": {
        component: LuxePhotoTemplate,
        schema: luxePhotoSchema,
    },
};