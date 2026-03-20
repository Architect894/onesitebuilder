# Universal Editor Architecture Implementation

## Summary

Implemented a comprehensive standardized editing system for the SimplePeek site builder that enables templates to declare editable elements using consistent, self-documenting attributes. This architecture decouples template rendering from schema definitions, making templates more maintainable and easier to understand at a glance.

## What Was Implemented

### 1. **Standardized Attribute System**

Introduced three new data attributes for declaring editable elements:

```jsx
<element
    data-edit-type="text"              // Type of editor to show
    data-edit-field="content.section.field"  // Path to the field
    data-edit-label="Human Label"      // Optional label for UI
>
    {content.section.field}
</element>
```

**Supported Edit Types:**
- `text` - Single-line text input
- `textarea` - Multi-line text input
- `image` - Image URL/upload
- `color` - Color picker
- `background` - Background color/image editor
- `list` - Array/list items with batch editing

### 2. **Core Utilities**

#### `src/lib/editor/extract-edit-attributes.js`
- `extractEditAttributes(element)` - Parses data-edit-* attributes from DOM elements
- `findNearestEditableElement(startElement)` - Searches up DOM tree for editable elements
- `getEditorConfig(editType)` - Maps edit types to UI configurations

#### `src/lib/editor/editable-helpers.js`
Helper functions for template developers:
```javascript
textEditable(field, label)           // → text editor
imageEditable(field, label)          // → image editor
colorEditable(field, label)          // → color picker
backgroundEditable(field, label)     // → background editor
listEditable(field, label)           // → list editor
getEditableClassName(type, base)     // → responsive CSS classes
```

### 3. **Enhanced Editor Components**

#### `EditableFieldOverlay.js`
**New Features:**
- Detects both old `data-edit-node` (backward compatible) and new `data-edit-type` attributes
- Automatically scans DOM for editable elements using both formats
- Added `FloatingBackgroundPanel` component for background editing with tabs:
  - Color mode (with color picker and ambient presets)
  - Image mode (image URL input)
  - Gradient mode (placeholder for future enhancement)

#### `SiteEditorClient.js`
**Changes:**
- Updated click detection to prioritize new `data-edit-type` format
- Falls back to `data-edit-node` for backward compatibility
- Supports field path extraction from both attribute types

### 4. **Comprehensive Documentation**

#### `src/lib/editor/STANDARDIZED-ATTRIBUTES.md`
Complete reference guide covering:
- Overview of the standardized system
- Each editor type with examples
- Field naming conventions
- Implementation steps
- Best practices
- Complete working hero section example

#### `src/lib/editor/TEMPLATE-IMPLEMENTATION-GUIDE.js`
Real-world examples demonstrating:
- Hero section with multiple editable elements
- Services list section
- Gallery/portfolio section with images
- About section with color-editable text
- Key implementation patterns and best practices

#### `src/lib/editor/MIGRATION-GUIDE.md`
Step-by-step guide for updating existing templates:
- Before/after code comparisons
- Migration checklist
- Common patterns with solutions
- Phase-based rollout strategy

### 5. **Backward Compatibility**

The system maintains 100% backward compatibility:
- Old `data-edit-node` attributes continue to work
- Schema-based field detection still functions
- No breaking changes to existing templates
- Gradual migration path for developers

## Key Architectural Benefits

### For Developers
1. **Self-Documenting** - Template code clearly shows what's editable
2. **Type Safety** - `data-edit-type` indicates the exact editor needed
3. **Flexible** - No need to update templates when schema changes
4. **Helper Functions** - Easy-to-use utility functions reduce boilerplate

### For Templates
1. **Cleaner Code** - No hidden placeholder divs needed
2. **Better DX** - Labels and types visible in markup
3. **Maintainable** - Schema decoupled from template rendering
4. **Extensible** - New editor types can be added without template changes

### For Editor UI
1. **Smart Detection** - Automatically finds all editable elements
2. **Responsive** - Handles dynamic content and re-renders
3. **Type-Specific** - Shows appropriate editor for each element type
4. **Visual Feedback** - Color-coded dots and highlighting

## File Structure

```
src/lib/editor/
├── extract-edit-attributes.js        (Utility: Parse attributes)
├── editable-helpers.js               (Utility: Helper functions)
├── STANDARDIZED-ATTRIBUTES.md        (Doc: Complete reference)
├── TEMPLATE-IMPLEMENTATION-GUIDE.js  (Doc: Examples & patterns)
└── MIGRATION-GUIDE.md                (Doc: Migration instructions)

src/components/editor/
├── EditableFieldOverlay.js           (Component: Element detection & editing)
└── SiteEditorClient.js               (Component: Click handling)
```

## Usage Examples

### Basic Text Element
```jsx
<h1
    data-edit-type="text"
    data-edit-field="content.hero.headline"
    data-edit-label="Headline"
    className="text-6xl font-bold cursor-text hover:opacity-80"
>
    {content.hero.headline ?? 'Add headline'}
</h1>
```

### Using Helpers
```jsx
import { textEditable } from '@/lib/editor/editable-helpers';

<h1 {...textEditable('content.hero.headline', 'Headline')}>
    {content.hero.headline ?? 'Add headline'}
</h1>
```

### Background Section
```jsx
<section
    data-edit-type="background"
    data-edit-field="content.sectionStyle.hero.bg"
    data-edit-label="Hero Background"
    style={{ backgroundColor: sectionStyle.hero?.bg }}
>
    {/* section content */}
</section>
```

### Array/List Items
```jsx
<div
    data-edit-type="list"
    data-edit-field="content.services"
    data-edit-label="Services List"
>
    {services.map((item, i) => (
        <div key={i} data-edit-group="services">
            <h3
                data-edit-type="text"
                data-edit-field={`content.services[${i}].title`}
            >
                {item.title}
            </h3>
        </div>
    ))}
</div>
```

## Editor Features

### Editor Types Implemented

| Type | UI | Input | Use Case |
|------|----|----|----------|
| `text` | Ghost overlay | Single line | Headlines, labels, short text |
| `textarea` | Ghost overlay | Multi-line | Descriptions, paragraphs |
| `color` | Float panel | Color picker | Text color, accents |
| `background` | Float panel (tabs) | Color/Image | Section backgrounds |
| `image` | Float panel | URL input | Logos, featured images |
| `list` | Sidebar | Array editor | Services, features, items |

### Floating Panels
- **Color Panel**: Hex input, color picker, quick swatches
- **Background Panel**: Color/Image/Gradient tabs with presets
- **Image Panel**: URL input with preview

### Ghost Editors
- **Text/Textarea**: Transparent input overlaid on element
- Matches element styling (font, size, color, spacing)
- Blinking cursor visible over original text
- Auto-focus with selection management

## Testing

The implementation has been tested for:
- ✅ Attribute extraction from DOM
- ✅ Backward compatibility with `data-edit-node`
- ✅ Multiple editor type detection
- ✅ Dynamic content in templates
- ✅ Responsive positioning of floating panels
- ✅ Real-time updates to site data

## Next Steps

### Immediate (Template Migration)
1. Gradually update templates to use new attributes
2. Reference MIGRATION-GUIDE.md for examples
3. Use helper functions for consistency
4. Add `data-edit-label` for better UX

### Future Enhancements
1. Drag-to-reorder for list items
2. Gradient editor implementation
3. Image cropping/resizing tools
4. Rich text editor for textarea
5. Custom editor types for complex fields

### Maintenance
- Monitor backward compatibility as library updates
- Add new editor types as needed
- Keep documentation up to date with examples
- Update templates to new format over time

## Integration Points

### With Schema System
- Editor types don't depend on schema
- Schema still used as fallback for old format
- No schema changes required

### With Template Registry
- Works with all template implementations
- No changes needed to template loading

### With Site Editor
- Direct integration with click detection
- Real-time updates through `handleFieldChange`
- Sidebar/overlay UI controlled by field type

## Documentation Access

For developers implementing editable elements:

1. **Quick Start**: Use the helper functions
   ```javascript
   import { textEditable } from '@/lib/editor/editable-helpers';
   ```

2. **Full Reference**: `src/lib/editor/STANDARDIZED-ATTRIBUTES.md`

3. **Code Examples**: `src/lib/editor/TEMPLATE-IMPLEMENTATION-GUIDE.js`

4. **Migration Help**: `src/lib/editor/MIGRATION-GUIDE.md`

## Conclusion

This standardized editor architecture significantly improves:
- **Developer Experience**: Clear, self-documenting templates
- **Code Quality**: Less boilerplate, better maintainability
- **User Experience**: Consistent, responsive editing interface
- **System Flexibility**: Easy to extend and customize

Templates can now clearly declare what's editable, and the editor automatically provides the appropriate interface based on the declared type.
