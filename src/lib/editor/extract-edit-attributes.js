/**
 * Extracts standardized data-edit-* attributes from an element
 * Used to determine what editor controls should appear
 *
 * Attributes:
 * - data-edit-type: 'text', 'textarea', 'image', 'background', 'color', 'list'
 * - data-edit-field: schema path to the field (e.g., 'content.hero.headline')
 * - data-edit-group: optional grouping (e.g., 'features' for list items)
 */

export function extractEditAttributes(element) {
    if (!element) return null;

    const editType = element.getAttribute('data-edit-type');
    const editField = element.getAttribute('data-edit-field');
    const editGroup = element.getAttribute('data-edit-group');

    if (!editType || !editField) {
        return null;
    }

    return {
        type: editType,
        field: editField,
        group: editGroup || null,
        element,
    };
}

/**
 * Finds the nearest element with edit attributes
 * Searches up the DOM tree from the clicked element
 */
export function findNearestEditableElement(startElement) {
    let current = startElement;

    while (current && current !== document.body) {
        const attrs = extractEditAttributes(current);
        if (attrs) return attrs;
        current = current.parentElement;
    }

    return null;
}

/**
 * Get the editing control type based on the edit-type attribute
 * Returns configuration for which UI component should be shown
 */
export function getEditorConfig(editType) {
    const configs = {
        text: {
            uiType: 'inline', // Shows ghost text editor over element
            allowsColor: false,
            allowsFormat: false,
        },
        textarea: {
            uiType: 'inline', // Ghost textarea editor
            allowsColor: false,
            allowsFormat: false,
        },
        image: {
            uiType: 'modal', // Shows file uploader
            allowsFormat: true, // For size/crop options
        },
        background: {
            uiType: 'panel', // Floating panel with color + image options
            allowsColor: true,
            allowsGradient: true,
            allowsImage: true,
        },
        color: {
            uiType: 'panel', // Floating color picker
            allowsColor: true,
        },
        list: {
            uiType: 'sidebar', // Side panel for editing list items
            isArray: true,
        },
    };

    return configs[editType] || null;
}
