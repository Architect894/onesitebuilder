/**
 * Helper utilities for creating editable template elements
 * Provides consistent styling and attribute management
 */

/**
 * Create edit attributes for an element
 * @param {string} type - Edit type (text, image, color, background, list)
 * @param {string} field - Schema path (e.g., 'content.hero.headline')
 * @param {string} label - Human-readable label (optional)
 * @returns {object} Object with data-edit-* attributes
 */
export function createEditAttributes(type, field, label) {
    const attrs = {
        'data-edit-type': type,
        'data-edit-field': field,
    };
    
    if (label) {
        attrs['data-edit-label'] = label;
    }
    
    return attrs;
}

/**
 * Get edit attribute props as a spread object
 * Compatible with {...spread} syntax in JSX
 */
export function editableProps(type, field, label) {
    return createEditAttributes(type, field, label);
}

/**
 * Common editable element wrapper classes
 * Provides visual feedback that an element is editable
 */
export const editableClasses = {
    text: 'cursor-text hover:opacity-80 transition',
    image: 'cursor-pointer hover:opacity-75 transition',
    color: 'cursor-pointer hover:opacity-75 transition',
    background: 'cursor-pointer transition',
    list: 'cursor-pointer transition',
};

/**
 * Get combined className string for an editable element
 * @param {string} type - Edit type
 * @param {string} baseClass - Additional base classes
 * @returns {string} Combined className
 */
export function getEditableClassName(type, baseClass = '') {
    const classes = [editableClasses[type] || '', baseClass];
    return classes.filter(Boolean).join(' ');
}

/**
 * Helper for creating text-editable elements
 * @example
 * <h1 {...textEditable('content.hero.headline')}>
 *   {content.hero.headline}
 * </h1>
 */
export function textEditable(field, label = null) {
    return {
        ...editableProps('text', field, label),
        className: editableClasses.text,
    };
}

/**
 * Helper for creating textarea-editable elements
 */
export function textareaEditable(field, label = null) {
    return {
        ...editableProps('textarea', field, label),
        className: editableClasses.text,
    };
}

/**
 * Helper for creating image-editable elements
 */
export function imageEditable(field, label = null) {
    return {
        ...editableProps('image', field, label),
        className: editableClasses.image,
    };
}

/**
 * Helper for creating color-editable elements
 */
export function colorEditable(field, label = null) {
    return {
        ...editableProps('color', field, label),
        className: editableClasses.color,
    };
}

/**
 * Helper for creating background-editable sections
 */
export function backgroundEditable(field, label = null) {
    return editableProps('background', field, label);
}

/**
 * Helper for creating list-editable containers
 */
export function listEditable(field, label = null) {
    return {
        ...editableProps('list', field, label),
        className: editableClasses.list,
    };
}

/**
 * Get placeholder text for empty fields
 * @param {string} type - Edit type
 * @returns {string} Placeholder text
 */
export function getPlaceholder(type) {
    const placeholders = {
        text: 'Click to edit text',
        textarea: 'Click to edit content',
        image: 'No image selected',
        color: 'Choose a color',
        background: 'Click to edit background',
        list: 'Add items to this section',
    };
    return placeholders[type] || 'Click to edit';
}
