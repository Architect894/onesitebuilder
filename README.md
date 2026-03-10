# OneSiteBuilder

OneSiteBuilder is a simple SaaS-style web app that allows users to create and manage single-page websites from prebuilt templates. Users can log in, choose a template, customize content within limits, and save/update/delete their site.

The project uses:

- Next.js
- MongoDB
- Zod validation
- Cookie-based session authentication

---

# Setup

## Install dependencies

### Frontend

```bash
npm install
```

### Backend packages

```bash
npm install mongodb bcryptjs jose zod dotenv
```

Backend packages used:

| Package | Purpose |
|-------|--------|
| mongodb | Connect to MongoDB |
| bcryptjs | Hash user passwords |
| jose | Session authentication |
| zod | Request validation |
| dotenv | Environment variables |

---

# Environment Variables

Create a `.env.local` file in the project root.

Example:

```
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=onesitebuilder
SESSION_SECRET=Vegeta@96
```

---

# Seed the Database

To load default templates into MongoDB run:

```bash
node scripts/seed.mjs
```

This creates the `templates` collection with starter templates such as:

- `luxe-photo`
- `luxe-modern`

---

# Backend Structure

```
src
│
├── lib
│   ├── mongodb.js
│   └── auth.js
│
├── models
│   ├── userModel.js
│   ├── siteModel.js
│   └── templateModel.js
│
├── validation
│   └── siteSchema.js
│
├── app
│   └── api
│        ├── auth
│        │   ├── signup
│        │   ├── login
│        │   ├── logout
│        │   └── me
│        │
│        ├── sites
│        │   ├── route.js
│        │   └── [id]
│        │
│        └── templates
│            └── route.js
│
scripts
└── seed.mjs
```

---

# API Endpoints

## Templates

### Get all templates

```
GET /api/templates
```

Returns available page templates.

Example response:

```json
{
  "templates": [
    {
      "key": "luxe-photo",
      "name": "Luxe Photo"
    }
  ]
}
```

---

# Authentication

## Signup

```
POST /api/auth/signup
```

Body example:

```json
{
  "name": "Josh",
  "email": "josh@test.com",
  "password": "password123"
}
```

Creates a user and logs them in.

---

## Login

```
POST /api/auth/login
```

Body:

```json
{
  "email": "josh@test.com",
  "password": "password123"
}
```

Creates a session cookie.

---

## Logout

```
POST /api/auth/logout
```

Clears the session.

---

## Current User

```
GET /api/auth/me
```

Returns the currently authenticated user.

---

# Sites API

Sites represent a generated landing page created by a user.

---

## Get user sites

```
GET /api/sites
```

Returns all sites belonging to the logged-in user.

---

## Create site

```
POST /api/sites
```

Example body:

```json
{
  "name": "Josh Photography",
  "subdomain": "joshphoto",
  "templateKey": "luxe-photo",
  "status": "draft",
  "branding": {
    "primaryColor": "#9c8762",
    "accentColor": "#c6a16e",
    "neutralColor": "#000000"
  },
  "content": {
    "hero": {
      "logo": null,
      "eyebrow": "Arkansas Event Photography",
      "headline": "Capture the moments that matter",
      "subheadline": "Modern event photography"
    },
    "about": {
      "title": "About Us",
      "body": "Professional photography for events."
    },
    "services": [
      "Wedding Photography",
      "Corporate Events"
    ],
    "gallery": [
      {
        "id": "1",
        "url": "https://images.unsplash.com/photo-example"
      }
    ],
    "cta": {
      "label": "Book Now",
      "href": "https://example.com/contact"
    }
  },
  "links": {
    "instagram": "",
    "facebook": "",
    "tiktok": ""
  }
}
```

---

## Get single site

```
GET /api/sites/:id
```

Returns one site.

---

## Update site

```
PATCH /api/sites/:id
```

Example:

```json
{
  "name": "Updated Site Name"
}
```

---

## Delete site

```
DELETE /api/sites/:id
```

Deletes the site.

---

# Authentication Notes

Authentication uses cookie-based sessions.

When calling APIs from the frontend you must include credentials:

```javascript
fetch("/api/sites", {
  method: "GET",
  credentials: "include"
});
```

Without `credentials: "include"` the browser will not send the login cookie.

---

# Database Collections

MongoDB automatically creates the following collections:

```
users
sites
templates
```

---

# Run Development Server

Start the app locally:

```bash
npm run dev
```

Server will run at:

```
http://localhost:3000
```

---

# Current Features

- User signup and login
- Template retrieval
- Site creation
- Site editing
- Site deletion
- MongoDB data persistence