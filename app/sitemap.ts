import { MetadataRoute } from 'next';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const BASE_URL = 'https://cavapyc.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static Routes
    const routes = [
        '',
        '/bitacora',
        '/admin',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic Routes (Blog Posts)
    const q = query(collection(db, 'blog_posts'), orderBy('date', 'desc'));
    const snapshot = await getDocs(q);

    const posts = snapshot.docs.map((doc) => ({
        url: `${BASE_URL}/bitacora/${doc.id}`,
        lastModified: doc.data().date?.toDate ? doc.data().date.toDate() : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [...routes, ...posts];
}
