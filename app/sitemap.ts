import { MetadataRoute } from 'next';
import { getSubstackFeed } from '@/lib/substack';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://dirk.respira.cafe';

    // Get dynamic routes
    const articles = await getSubstackFeed();
    const articleUrls = articles.map((article) => ({
        url: `${baseUrl}/blog/newsletter/${article.slug}`,
        lastModified: new Date(article.pubDate),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // Static routes
    const staticRoutes = [
        '',
        '/about',
        '/book',
        '/podcasts',
        '/community',
        '/courses',
        '/sessions',
        '/blog/newsletter',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.9,
    }));

    return [...staticRoutes, ...articleUrls];
}
