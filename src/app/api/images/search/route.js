import { NextResponse } from 'next/server';

// Pixabay free API — set PIXABAY_API_KEY in .env.local
// Sign up at https://pixabay.com/api/docs/ (free)
const PIXABAY_KEY = process.env.PIXABAY_API_KEY;

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.trim();
    const page = searchParams.get('page') ?? '1';

    if (!q) {
        return NextResponse.json({ error: 'Missing query param q' }, { status: 400 });
    }

    if (!PIXABAY_KEY) {
        return NextResponse.json(
            { error: 'PIXABAY_API_KEY not set in environment' },
            { status: 503 },
        );
    }

    const url = new URL('https://pixabay.com/api/');
    url.searchParams.set('key', PIXABAY_KEY);
    url.searchParams.set('q', q);
    url.searchParams.set('image_type', 'photo');
    url.searchParams.set('per_page', '24');
    url.searchParams.set('page', page);
    url.searchParams.set('safesearch', 'true');

    const res = await fetch(url.toString());
    if (!res.ok) {
        return NextResponse.json({ error: 'Pixabay request failed' }, { status: 502 });
    }

    const data = await res.json();
    const images = data.hits.map((hit) => ({
        id: hit.id,
        thumb: hit.previewURL,
        full: hit.largeImageURL,
        photographer: hit.user,
    }));

    return NextResponse.json({ images, total: data.totalHits });
}
