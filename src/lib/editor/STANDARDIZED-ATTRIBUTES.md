# Standardized Editor Attributes Guide

The universal editing system uses standardized `data-*` attributes to make template elements editable. This allows the editor to automatically detect clickable elements and determine which editing controls should appear.

## Overview

Every editable element must have these attributes:
- **`data-edit-type`**: Type of editor UI to show (text, image, color, background, etc.)
- **`data-edit-field`**: Schema path to the field being edited (e.g., `content.hero.headline`)
- **`data-edit-label`** (optional): Human-readable label for the editor UI

## Attribute Types

### `data-edit-type` Values

#### `text`
- Shows inline ghost text editor over the element
- Single-line text input
- Example: Headlines, eyebrows, button labels

```jsx
<h1
  data-edit-type="text"
  data-edit-field="content.hero.headline"
  data-edit-label="Headline"
>
  {content.hero.headline}
</h1>
```

#### `textarea`
- Shows inline ghost text editor for multi-line content
- Example: Descriptions, body text, long paragraphs

```jsx
<p
  data-edit-type="textarea"
  data-edit-field="content.hero.subheadline"
  data-edit-label="Subheadline"
>
  {content.hero.subheadline}
</p>
```

#### `color`
- Shows floating color picker panel
- Allows hex color input and color swatches
- Example: Text colors, accent colors, primary colors

```jsx
<div
  data-edit-type="color"
  data-edit-field="content.hero.textColor"
  data-edit-label="Text Color"
  style={{ color: content.hero.textColor }}
>
  {content.text}
</div>
```

#### `image`
- Shows floating image upload/URL panel
- Allows uploading new images or entering image URLs
- Example: Logos, featured images, gallery items

```jsx
<img
  data-edit-type="image"
  data-edit-field="content.hero.logo"
  data-edit-label="Logo"
  src={content.hero.logo}
  alt="Logo"
/>
```

#### `background`
- Shows floating panel with multiple options:
  - Background color picker
  - Background image upload
  - Gradient options
  - Ambient color selections
- Example: Section backgrounds, hero backgrounds

```jsx
<section
  data-edit-type="background"
  data-edit-field="content.sectionStyle.hero.bg"
  data-edit-label="Background"
  style={{ backgroundColor: sectionStyle.hero?.bg }}
>
  {content}
</section>
```

#### `list`
- Shows sidebar panel for editing list items
- Used for arrays of items (services, features, gallery items, etc.)
- Each item in the array should be individually editable
- Example: Services list, portfolio items, testimonials

```jsx
<div
  data-edit-type="list"
  data-edit-field="content.services"
  data-edit-label="Services"
>
  {content.services?.map((service, i) => (
    <div key={i} data-edit-group="services">
      {service.title}
    </div>
  ))}
</div>
```

## Field Path Naming Convention

Schema paths follow a nested structure:

```
content.section.field
├── content = site content object
├── section = section name (hero, about, services, etc.)
└── field = field name (headline, textColor, bg, etc.)
```

### Examples

**Hero Section:**
- `content.hero.headline` - Hero headline text
- `content.hero.subheadline` - Hero sub-text
- `content.hero.eyebrow` - Small eyebrow text above headline
- `content.hero.textColor` - Hero text color
- `content.sectionStyle.hero.bg` - Hero background color

**Services Section:**
- `content.services` - Array of service items
- `content.services[0].title` - First service title
- `content.services[0].description` - First service description
- `content.servicesSection.heading` - Section heading
- `content.servicesSection.eyebrow` - Section eyebrow

**Background Styles:**
- `content.sectionStyle.section.bg` - Section background
- `content.sectionStyle.section.gradient` - Section gradient
- `content.sectionStyle.section.image` - Section background image

## Implementation Steps

### 1. Add Attributes to Clickable Elements

For static content elements:

```jsx
<h1
  data-edit-type="text"
  data-edit-field="content.hero.headline"
  data-edit-label="Headline"
  className="cursor-text hover:opacity-80"
>
  {content.hero.headline}
</h1>
```

### 2. Style Editable Elements

Add visual feedback to show elements are editable:

```jsx
<div
  data-edit-type="text"
  data-edit-field="content.about.heading"
  className="cursor-pointer hover:opacity-80 transition"
>
  {content.about.heading}
</div>
```

### 3. Handle InEditor Mode

When an element should only be editable in editor mode:

```jsx
{isEditor && (
  <div
    data-edit-type="text"
    data-edit-field="content.hero.headline"
  >
    {content.hero.headline || 'Click to edit headline'}
  </div>
)}
```

### 4. Background Elements

For section backgrounds, use a hidden element with the attribute:

```jsx
<section
  style={{ backgroundColor: sectionStyle.hero?.bg }}
  className="relative"
>
  {/* Hidden element for background color editing */}
  {isEditor && (
    <div
      data-edit-type="background"
      data-edit-field="content.sectionStyle.hero.bg"
      data-edit-label="Background"
      style={{ display: 'none' }}
    />
  )}
  
  {/* Visible content */}
  <div className="content">...</div>
</section>
```

## Backward Compatibility

The system supports the legacy `data-edit-node` attribute for backward compatibility:

```jsx
{/* Old format - still works */}
<h1 data-edit-node="content.hero.headline">
  {content.hero.headline}
</h1>

{/* New format - preferred */}
<h1
  data-edit-type="text"
  data-edit-field="content.hero.headline"
>
  {content.hero.headline}
</h1>
```

## Best Practices

1. **Specificity**: Make sure each editable element is clearly visible to users when hovering
2. **Labels**: Always provide `data-edit-label` for better UI clarity
3. **Visibility**: Don't hide elements with editability - let users see what they can edit
4. **Hover States**: Add `hover:opacity-80` or similar to indicate editability
5. **Cursor**: Use `cursor-text` for text elements, `cursor-pointer` for others
6. **Validation**: Ensure the field path in `data-edit-field` matches your schema exactly
7. **Arrays**: Use `data-edit-type="list"` for array fields with batch editing support

## Example: Complete Hero Section

```jsx
<section
  data-edit-type="background"
  data-edit-field="content.sectionStyle.hero.bg"
  style={{ backgroundColor: sectionStyle.hero?.bg }}
  className="relative py-32"
>
  <div className="mx-auto max-w-4xl px-6">
    <p
      data-edit-type="text"
      data-edit-field="content.hero.eyebrow"
      data-edit-label="Eyebrow"
      className="text-sm uppercase tracking-widest mb-4"
    >
      {content.hero.eyebrow}
    </p>

    <h1
      data-edit-type="text"
      data-edit-field="content.hero.headline"
      data-edit-label="Headline"
      className="text-6xl font-bold mb-6 cursor-text hover:opacity-80"
      style={{ color: content.hero.textColor }}
    >
      {content.hero.headline}
    </h1>

    <p
      data-edit-type="textarea"
      data-edit-field="content.hero.subheadline"
      data-edit-label="Subheadline"
      className="text-xl mb-8 max-w-2xl cursor-text hover:opacity-80"
    >
      {content.hero.subheadline}
    </p>

    <a
      href="#"
      data-edit-type="text"
      data-edit-field="content.cta.label"
      data-edit-label="Button Text"
      className="inline-block px-8 py-3 bg-blue-600 text-white rounded cursor-text hover:opacity-80"
    >
      {content.cta.label}
    </a>
  </div>
</section>
```

## Editor Integration

The editor automatically:
1. Detects all elements with `data-edit-type` attributes
2. Shows clickable dots on hover or when selected
3. Renders the appropriate editor UI based on the type
4. Updates the site data in real-time as you edit
5. Maps changes directly to the schema field path

No additional setup is needed beyond adding the attributes to your template elements.
