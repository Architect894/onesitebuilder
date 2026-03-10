const express = require('express');
const { MongoClient } = require('mongodb');
const bcryptjs = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const app = express();
const PORT = 3001;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'onesitebuilder';

let cachedClient = null;

// Middleware
app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Database connection
async function connectToDatabase() {
    if (cachedClient) {
        return cachedClient;
    }

    try {
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        console.log('[DB] Connected to MongoDB');
        cachedClient = client;
        return client;
    } catch (error) {
        console.error('[DB Connection Error]', error);
        throw error;
    }
}

async function getCollection(name) {
    const client = await connectToDatabase();
    const db = client.db(MONGODB_DB_NAME);
    return db.collection(name);
}

// Routes
app.post('/auth/signup', async (req, res) => {
    try {
        const body = req.body;
        console.log('[Signup] Received:', { name: body.name, email: body.email, template: body.template });

        // Manual validation
        const { name, email, password, template } = body;

        if (!name || typeof name !== 'string' || name.trim().length < 2) {
            return res.status(400).json({ error: 'Name must be at least 2 characters' });
        }

        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        if (!password || typeof password !== 'string' || password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters' });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const normalizedName = name.trim();
        const templateKey = template || 'luxe-photo';

        console.log('[Signup] Validated');

        // Check if user exists
        const users = await getCollection('users');
        const existingUser = await users.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.status(409).json({ error: 'Email is already in use.' });
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Insert user
        const now = new Date();
        const userResult = await users.insertOne({
            name: normalizedName,
            email: normalizedEmail,
            password: hashedPassword,
            role: 'user',
            createdAt: now,
            updatedAt: now,
            lastLoginAt: now,
        });

        const userId = userResult.insertedId.toString();

        // Create a site for the user
        const sites = await getCollection('sites');
        const siteResult = await sites.insertOne({
            userId,
            name: `${normalizedName}'s Site`,
            template: templateKey,
            status: 'draft',
            isPublished: false,
            content: {
                hero: {
                    headline: 'Welcome to your site',
                    subheadline: 'Edit this content to get started',
                },
            },
            createdAt: now,
            updatedAt: now,
        });

        console.log('[Signup] User inserted:', userId);
        console.log('[Signup] Site created:', siteResult.insertedId.toString());

        return res.status(201).json({
            user: {
                id: userId,
                email: normalizedEmail,
                name: normalizedName,
            },
        });
    } catch (error) {
        console.error('[Signup Error]', error);
        return res.status(400).json({
            error: error?.message || 'Unable to create account.',
        });
    }
});

app.post('/auth/login', async (req, res) => {
    try {
        const body = req.body;
        console.log('[Login] Received:', { email: body.email });

        // Manual validation
        const { email, password } = body;

        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        if (!password || typeof password !== 'string' || password.length < 1) {
            return res.status(400).json({ error: 'Password is required' });
        }

        const normalizedEmail = email.trim().toLowerCase();

        console.log('[Login] Validated');

        // Find user
        const users = await getCollection('users');
        const user = await users.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Check password
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Update last login
        await users.updateOne(
            { _id: user._id },
            { $set: { lastLoginAt: new Date() } }
        );

        console.log('[Login] User authenticated:', user._id);

        return res.status(200).json({
            user: {
                id: String(user._id),
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        console.error('[Login Error]', error);
        return res.status(400).json({
            error: error?.message || 'Unable to log in.',
        });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Seed templates endpoint
app.get('/seed', async (req, res) => {
    try {
        const templatesCollection = await getCollection('templates');

        const templateDocuments = [
            {
                key: 'luxe-photo',
                name: 'Luxe Photo',
                description: 'Photo-booth and events focused landing page.',
                version: 1,
                isActive: true,
                schema: {},
                defaults: {
                    branding: {
                        primaryColor: '#9c8762',
                        accentColor: '#c6a16e',
                        neutralColor: '#000000',
                    },
                },
            },
            {
                key: 'luxe-modern',
                name: 'Luxe Modern',
                description: 'Clean modern landing page for event businesses.',
                version: 1,
                isActive: true,
                schema: {},
                defaults: {
                    branding: {
                        primaryColor: '#9c8762',
                        accentColor: '#e6b17e',
                        neutralColor: '#000000',
                    },
                },
            },
            {
                key: 'luxe-classic',
                name: 'Luxe Classic',
                description: 'Elegant timeless template with premium animations.',
                version: 1,
                isActive: true,
                schema: {},
                defaults: {
                    branding: {
                        primaryColor: '#d4a574',
                        accentColor: '#f1c886',
                        neutralColor: '#000000',
                    },
                },
            },
            {
                key: 'luxe-minimal',
                name: 'Luxe Minimal',
                description: 'Ultra-clean and minimalist for modern simplicity.',
                version: 1,
                isActive: true,
                schema: {},
                defaults: {
                    branding: {
                        primaryColor: '#000000',
                        accentColor: '#666666',
                        neutralColor: '#000000',
                    },
                },
            },
        ];

        let insertedCount = 0;
        for (const document of templateDocuments) {
            const result = await templatesCollection.updateOne(
                { key: document.key },
                {
                    $set: {
                        ...document,
                        updatedAt: new Date(),
                    },
                    $setOnInsert: {
                        createdAt: new Date(),
                    },
                },
                { upsert: true }
            );
            if (result.upsertedId || result.modifiedCount) {
                insertedCount++;
            }
        }

        console.log(`[Seed] Seeded ${insertedCount} templates`);
        return res.json({ status: 'ok', message: `Seeded ${insertedCount} templates` });
    } catch (error) {
        console.error('[Seed Error]', error);
        return res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`[Auth Server] Running on http://localhost:${PORT}`);
});
