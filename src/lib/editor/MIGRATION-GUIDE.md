# Template Migration Guide: Old → New Standardized Editor

This guide shows how to migrate existing templates from the old `data-edit-node` format to the new standardized `data-edit-type` + `data-edit-field` format.

## Quick Reference

| Type | Old Format | New Format |
|------|-----------|-----------|
| Text | `data-edit-node="content.hero.headline"` | `data-edit-type="text" data-edit-field="content.hero.headline"` |
| Image | `data-edit-node="content.hero.logo"` | `data-edit-type="image" data-edit-field="content.hero.logo"` |
| Color | `data-edit-node="content.hero.textColor"` | `data-edit-type="color" data-edit-field="content.hero.textColor"` |
| Background | Hidden div with `data-edit-node` | `data-edit-type="background" data-edit-field="content.sectionStyle.hero.bg"` |

## Example: Hero Section Migration

### BEFORE (Old Format)

```jsx
<section
    className="relative py-32"
    style={{ backgroundColor: sectionStyle.hero?.bg ?? "#000000" }}
>
    {/* Hidden placeholders for editing */}
    <div className="hidden" data-edit-node="content.sectionStyle.hero.bg" />
    <div className="hidden" data-edit-node="content.hero.textColor" />
    
    <div className="mx-auto max-w-3xl px-6">
        {/* Eyebrow */}
        <p
            data-edit-node="content.hero.eyebrow"
            className="text-sm uppercase mb-4"
        >
            {content.hero.eyebrow}
        </p>

        {/* Headline */}
        <h1
            data-edit-node="content.hero.headline"
            className="text-6xl font-bold mb-6 cursor-text hover:opacity-80"
            style={{ color: heroTextColor }}
        >
            {content.hero.headline}
        </h1>

        {/* Subheadline */}
        <p
            data-edit-node="content.hero.subheadline"
            className="text-lg mb-8 cursor-text hover:opacity-80"
        >
            {content.hero.subheadline}
        </p>

        {/* CTA Button */}
        <a
            href={isEditor ? "#" : content.cta.href}
            onClick={(e) => { if (isEditor) e.preventDefault(); }}
            data-edit-node="content.cta.label"
            className="inline-block px-6 py-2 bg-blue-600 text-white"
        >
            {content.cta.label}
        </a>
    </div>
</section>
```

### AFTER (New Standardized Format)

```jsx
<section
    data-edit-type="background"
    data-edit-field="content.sectionStyle.hero.bg"
    data-edit-label="Hero Background"
    className="relative py-32"
    style={{ backgroundColor: sectionStyle.hero?.bg ?? "#000000" }}
>
    {/* No more hidden placeholders needed! */}
    
    <div className="mx-auto max-w-3xl px-6">
        {/* Eyebrow */}
        <p
            data-edit-type="text"
            data-edit-field="content.hero.eyebrow"
            data-edit-label="Eyebrow"
            className="text-sm uppercase mb-4 cursor-text hover:opacity-80 transition"
        >
            {content.hero.eyebrow ?? 'Add your eyebrow'}
        </p>

        {/* Headline */}
        <h1
            data-edit-type="text"
            data-edit-field="content.hero.headline"
            data-edit-label="Headline"
            className="text-6xl font-bold mb-6 cursor-text hover:opacity-80 transition"
            style={{ color: heroTextColor }}
        >
            {content.hero.headline ?? 'Your headline here'}
        </h1>

        {/* Subheadline */}
        <p
            data-edit-type="textarea"
            data-edit-field="content.hero.subheadline"
            data-edit-label="Subheadline"
            className="text-lg mb-8 cursor-text hover:opacity-80 transition"
        >
            {content.hero.subheadline ?? 'Your subheadline here'}
        </p>

        {/* Color editor for hero text */}
        {isEditor && (
            <div
                data-edit-type="color"
                data-edit-field="content.hero.textColor"
                data-edit-label="Text Color"
                style={{ display: 'none' }}
            />
        )}

        {/* CTA Button */}
        <a
            href={isEditor ? "#" : content.cta.href}
            onClick={(e) => { if (isEditor) e.preventDefault(); }}
            data-edit-type="text"
            data-edit-field="content.cta.label"
            data-edit-label="Button Text"
            className="inline-block px-6 py-2 bg-blue-600 text-white cursor-text hover:opacity-80 transition"
        >
            {content.cta.label ?? 'Get Started'}
        </a>
    </div>
</section>
```

### BEST PRACTICE: Using Helpers

```jsx
import { textEditable, textareaEditable, colorEditable, backgroundEditable } from '@/lib/editor/editable-helpers';

<section
    {...backgroundEditable('content.sectionStyle.hero.bg', 'Hero Background')}
    className="relative py-32"
    style={{ backgroundColor: sectionStyle.hero?.bg ?? "#000000" }}
>
    <div className="mx-auto max-w-3xl px-6">
        <p {...textEditable('content.hero.eyebrow', 'Eyebrow')}>
            {content.hero.eyebrow ?? 'Add your eyebrow'}
        </p>

        <h1
            {...textEditable('content.hero.headline', 'Headline')}
            className="text-6xl font-bold mb-6"
            style={{ color: heroTextColor }}
        >
            {content.hero.headline ?? 'Your headline here'}
        </h1>

        <p {...textareaEditable('content.hero.subheadline', 'Subheadline')}>
            {content.hero.subheadline ?? 'Your subheadline here'}
        </p>

        {isEditor && (
            <div
                {...colorEditable('content.hero.textColor', 'Text Color')}
                style={{ display: 'none' }}
            />
        )}
    </div>
</section>
```

## Migration Checklist

For each element in your template:

- [ ] Replace `data-edit-node` with `data-edit-type` + `data-edit-field`
- [ ] Add `data-edit-label` for better editor UX
- [ ] Add `cursor-pointer` or `cursor-text` class for visual feedback
- [ ] Add `hover:opacity-80` or similar for hover states
- [ ] Replace hardcoded values with `?? 'default'` pattern
- [ ] Move hidden edit placeholders to section level (if editing background)
- [ ] Test that element highlights and edits correctly in editor

## Common Migration Patterns

### Pattern 1: Simple Text Field

**Before:**
```jsx
<h2 data-edit-node="content.about.heading">
    {content.about.heading}
</h2>
```

**After:**
```jsx
<h2
    data-edit-type="text"
    data-edit-field="content.about.heading"
    data-edit-label="Heading"
    className="cursor-text hover:opacity-80"
>
    {content.about.heading ?? 'Add heading'}
</h2>
```

### Pattern 2: Image Field

**Before:**
```jsx
<img
    data-edit-node="content.hero.logo"
    src={logo}
    alt="Logo"
/>
```

**After:**
```jsx
<img
    data-edit-type="image"
    data-edit-field="content.hero.logo"
    data-edit-label="Logo"
    className="cursor-pointer hover:opacity-75"
    src={logo ?? '/placeholder.png'}
    alt="Logo"
/>
```

### Pattern 3: Color Field (Hidden)

**Before:**
```jsx
<div className="hidden" data-edit-node="content.about.textColor" />
```

**After:**
```jsx
{isEditor && (
    <div
        data-edit-type="color"
        data-edit-field="content.about.textColor"
        data-edit-label="Text Color"
        style={{ display: 'none' }}
    />
)}
```

### Pattern 4: Background Section

**Before:**
```jsx
<section style={{ backgroundColor: sectionStyle.about?.bg }}>
    <div className="hidden" data-edit-node="content.sectionStyle.about.bg" />
    {/* content */}
</section>
```

**After:**
```jsx
<section
    data-edit-type="background"
    data-edit-field="content.sectionStyle.about.bg"
    data-edit-label="Background"
    style={{ backgroundColor: sectionStyle.about?.bg }}
>
    {/* content */}
</section>
```

### Pattern 5: Array/List Items

**Before:**
```jsx
<div>
    {items.map((item, i) => (
        <div key={i} data-edit-node={`content.items[${i}].title`}>
            {item.title}
        </div>
    ))}
</div>
```

**After:**
```jsx
<div
    data-edit-type="list"
    data-edit-field="content.items"
    data-edit-label="Items List"
>
    {items.map((item, i) => (
        <div key={i} data-edit-group="items">
            <h3
                data-edit-type="text"
                data-edit-field={`content.items[${i}].title`}
                data-edit-label="Item Title"
                className="cursor-text hover:opacity-80"
            >
                {item.title ?? 'Item title'}
            </h3>
        </div>
    ))}
</div>
```

## Benefits of New Format

1. **Clarity**: `data-edit-type="text"` is clearer than looking up the field in schema
2. **Self-Documenting**: `data-edit-label` provides UX improvements without code comments
3. **Flexibility**: Specifies exactly what editor should appear for each element
4. **Maintainability**: Schema changes don't affect template element detection
5. **Backwards Compatible**: Old `data-edit-node` format still works

## Rollout Strategy

### Phase 1 (Immediate)
- Both formats work side-by-side
- New templates use new format
- Update templates incrementally

### Phase 2 (Future)
- Consider deprecating `data-edit-node`
- Migrate all existing templates
- Standardize on new format across codebase

### Phase 3 (Later)
- If needed, remove `data-edit-node` support
- Clean up schema lookup code in editor

## Need Help?

Refer to these files:
- **Full Reference**: `src/lib/editor/STANDARDIZED-ATTRIBUTES.md`
- **Examples**: `src/lib/editor/TEMPLATE-IMPLEMENTATION-GUIDE.js`
- **Helper Functions**: `src/lib/editor/editable-helpers.js`
