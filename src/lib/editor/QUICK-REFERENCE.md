# Editor Quick Reference Card

## One-Minute Introduction

Every editable element needs:
1. **`data-edit-type`** - What kind of editor? (text, image, color, background, list)
2. **`data-edit-field`** - Where does it go? (path like `content.hero.headline`)
3. **`data-edit-label`** - What's the label? (for editor UI)

## Edit Types at a Glance

```
┌─────────────┬───────────────────────┬─────────────────────────────────┐
│ Type        │ When to Use           │ Example                         │
├─────────────┼───────────────────────┼─────────────────────────────────┤
│ text        │ Single-line text      │ Headline, button label          │
│ textarea    │ Multi-line text       │ Description, body text          │
│ image       │ Image URL/file        │ Logo, featured image            │
│ color       │ Color picker          │ Text color, accent color        │
│ background  │ Section background    │ Hero background, section BG     │
│ list        │ Array of items        │ Services, features, gallery     │
└─────────────┴───────────────────────┴─────────────────────────────────┘
```

## Copy-Paste Templates

### Text (Headline)
```jsx
<h1
    data-edit-type="text"
    data-edit-field="content.section.heading"
    data-edit-label="Heading"
    className="text-4xl font-bold cursor-text hover:opacity-80"
>
    {content.section?.heading ?? 'Add heading'}
</h1>
```

### Text Area (Description)
```jsx
<p
    data-edit-type="textarea"
    data-edit-field="content.section.description"
    data-edit-label="Description"
    className="text-lg cursor-text hover:opacity-80"
>
    {content.section?.description ?? 'Add description'}
</p>
```

### Image
```jsx
<img
    data-edit-type="image"
    data-edit-field="content.hero.logo"
    data-edit-label="Logo"
    className="h-12 object-contain cursor-pointer hover:opacity-75"
    src={content.hero?.logo ?? '/placeholder.png'}
    alt="Logo"
/>
```

### Color (Using Hidden Element)
```jsx
{isEditor && (
    <div
        data-edit-type="color"
        data-edit-field="content.section.textColor"
        data-edit-label="Text Color"
        style={{ display: 'none' }}
    />
)}
```

### Background Section
```jsx
<section
    data-edit-type="background"
    data-edit-field="content.sectionStyle.section.bg"
    data-edit-label="Background"
    style={{ backgroundColor: sectionStyle.section?.bg }}
>
    {/* section content */}
</section>
```

### List (Array Items)
```jsx
<div
    data-edit-type="list"
    data-edit-field="content.services"
    data-edit-label="Services"
>
    {content.services?.map((service, i) => (
        <div key={i} data-edit-group="services">
            <h3
                data-edit-type="text"
                data-edit-field={`content.services[${i}].title`}
                data-edit-label="Title"
            >
                {service.title ?? 'Service title'}
            </h3>
        </div>
    ))}
</div>
```

## Using Helper Functions

```javascript
import { textEditable, textareaEditable, imageEditable, 
         colorEditable, backgroundEditable } from '@/lib/editor/editable-helpers';

// Single-line text
<h1 {...textEditable('content.section.heading', 'Heading')}>
    {content.section?.heading}
</h1>

// Multi-line text
<p {...textareaEditable('content.section.body', 'Body')}>
    {content.section?.body}
</p>

// Image
<img {...imageEditable('content.hero.logo', 'Logo')} src={logo} />

// Color (hidden)
<div {...colorEditable('content.section.color', 'Color')} style={{display:'none'}} />

// Background
<section {...backgroundEditable('content.sectionStyle.hero.bg', 'Background')} />
```

## Field Path Convention

```
content.section.field
├─ content          = always this for site content
├─ section          = section name (hero, about, services, etc.)
└─ field            = field name (heading, textColor, bg, etc.)

content.sectionStyle.section.bg
├─ content          = site content object
├─ sectionStyle     = style object for all sections
├─ section          = which section (hero, about, etc.)
└─ bg               = background specific field

content.services[0].title
├─ content.services = array of service items
├─ [0]              = array index
└─ title            = field in that item
```

## Common Field Paths

```
Hero Section:
  content.hero.headline
  content.hero.subheadline
  content.hero.eyebrow
  content.hero.textColor
  content.sectionStyle.hero.bg

Services Section:
  content.servicesSection.heading
  content.servicesSection.eyebrow
  content.services[i].title
  content.services[i].description

About Section:
  content.about.heading
  content.about.body
  content.about.headingColor
  content.about.bodyColor
  content.sectionStyle.about.bg

CTA Section:
  content.cta.heading
  content.cta.body
  content.cta.label
  content.cta.href

Footer:
  content.footer.description
  content.footer.links[i].text
  content.footer.links[i].href
```

## CSS Classes for Editable Elements

```javascript
// Text elements - show they're clickable
className="cursor-text hover:opacity-80 transition"

// Image elements
className="cursor-pointer hover:opacity-75 transition"

// Sections
className="cursor-pointer transition"

// Combinations
className="text-6xl font-bold cursor-text hover:opacity-80 transition"
```

## Editor Mode Checks

```jsx
// Show placeholder text in editor mode
{content.hero?.headline ?? (isEditor ? 'Click to edit' : 'No headline')}

// Conditional render editor-only elements
{isEditor && (
    <div data-edit-type="color" data-edit-field="content.color" />
)}

// Disable link navigation in editor
href={isEditor ? "#" : content.cta.href}
onClick={(e) => { if (isEditor) e.preventDefault(); }}
```

## What Happens When User Clicks

```
1. User clicks element → Editor detects click
2. Editor finds nearest data-edit-type attribute
3. Editor reads data-edit-field and data-edit-type
4. Based on type, shows appropriate UI:
   - text/textarea → Ghost text editor
   - color → Floating color picker
   - image → Floating URL input
   - background → Floating panel with tabs
   - list → Sidebar list editor
5. User edits → Field updates in real-time
6. Site preview reflects changes instantly
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Element doesn't highlight on hover | Add `data-edit-type` and `data-edit-field` attributes |
| Editor shows wrong UI type | Check `data-edit-type` value matches field content |
| Field path not updating | Verify `data-edit-field` matches exact schema path |
| Empty element in editor | Add default value with `?? 'placeholder'` |
| Can't edit after change | Ensure `isEditor={true}` prop is passed to template |
| Floating panel positioned wrong | Check if parent element has `position: relative` |

## Testing Checklist

- [ ] Element highlights blue when hovering
- [ ] Click shows correct editor UI for the type
- [ ] Changes appear in real-time in preview
- [ ] Closing editor persists the change
- [ ] Default values show when field is empty
- [ ] Editor-only elements hidden in published view
- [ ] All field paths match schema exactly

## Links to Full Documentation

- **Complete Reference**: `src/lib/editor/STANDARDIZED-ATTRIBUTES.md`
- **Code Examples**: `src/lib/editor/TEMPLATE-IMPLEMENTATION-GUIDE.js`
- **Migrate Old Template**: `src/lib/editor/MIGRATION-GUIDE.md`
- **Helper Functions**: `src/lib/editor/editable-helpers.js`

## Quick Help

Need to add an editable field to a template?

1. **Pick the type**: text, image, color, background, or list
2. **Find the field path**: e.g., `content.hero.headline`
3. **Add attributes**: `data-edit-type` and `data-edit-field`
4. **Add label**: `data-edit-label` for better UI
5. **Add CSS**: cursor and hover classes for feedback
6. **Add default**: Use `?? 'placeholder'` in JSX
7. **Test it**: Click in editor and verify it works

That's it! The editor handles the rest.
