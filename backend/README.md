# OneSiteBuilder MongoDB backend drop-in

This backend scaffold is designed for your current Next.js App Router project.

## What it adds

- MongoDB connection helper
- Cookie-based JWT auth
- `users`, `sites`, and `templates` collections
- Auth routes: signup, login, logout, me
- User site CRUD routes
- Public template read routes
- Admin template CRUD routes
- `getSiteBySubdomain()` service backed by MongoDB
- Seed script for the two existing template keys: `luxe-photo` and `luxe-modern`

## Install

Add these packages to your app:

```bash
npm i mongodb bcryptjs jose zod
```

## Copy files

Merge the `src/` and `scripts/` folders from this package into your repo.

## Environment

Create `.env.local`:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/onesitebuilder
MONGODB_DB_NAME=onesitebuilder
JWT_SECRET=replace-with-a-long-random-string
```

## Seed templates and indexes

```bash
node --env-file=.env.local scripts/seed.js
```

## Suggested frontend wiring

### Signup page
POST to `/api/auth/signup`

```js
await fetch("/api/auth/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, password }),
});
```

### Login page
POST to `/api/auth/login`

```js
await fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
```

### Dashboard page
Replace the mock import with a fetch to `/api/sites`.

### Tenant page
Your existing `getSiteBySubdomain()` service can now read from MongoDB.

## Collections

### users
- `_id`
- `name`
- `email`
- `passwordHash`
- `role`
- `createdAt`
- `updatedAt`
- `lastLoginAt`

### sites
- `_id`
- `userId`
- `name`
- `subdomain`
- `customDomain`
- `templateKey`
- `templateVersion`
- `status`
- `branding`
- `content`
- `links`
- `createdAt`
- `updatedAt`

### templates
- `_id`
- `key`
- `name`
- `description`
- `version`
- `isActive`
- `schema`
- `defaults`
- `createdAt`
- `updatedAt`

## Notes

- Admin access is role-based from the `users.role` field.
- The site validation schema matches the shape of your current mock data closely.
- The public tenant page will only return `published` sites.
