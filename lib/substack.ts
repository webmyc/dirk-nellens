import Parser from 'rss-parser';

export interface SubstackArticle {
    id: string;
    title: string;
    link: string;
    pubDate: string;
    contentSnippet: string;
    content: string;
    slug: string;
    coverImage?: string;
}

const parser = new Parser({
    customFields: {
        item: ['content:encoded'],
    },
});

export async function getSubstackFeed(): Promise<SubstackArticle[]> {
    try {
        const feed = await parser.parseURL('https://reflectorsreflections.substack.com/feed');

        return feed.items.map((item) => {
            // Extract the slug from the url (e.g. https://reflectorsreflections.substack.com/p/human-design-and-therapy)
            const slugMatch = item.link?.match(/\/p\/([^/?]+)/);
            const slug = slugMatch ? slugMatch[1] : '';

            // Extract first image from content:encoded for cover image
            let coverImage;
            const contentEncoded = item['content:encoded'] || item.content || '';

            // Look for images excluding tiny trackers like substackcdn 120w or twemoji
            const imgMatches = contentEncoded.matchAll(/<img[^>]+src="([^">]+)"/g);
            for (const match of imgMatches) {
                if (!match[1].includes('substackcdn.com/image/fetch/w_120') && !match[1].includes('twemoji')) {
                    coverImage = match[1];
                    break;
                }
            }

            return {
                id: item.guid || (item as any).id || slug,
                title: item.title || '',
                link: item.link || '',
                pubDate: item.pubDate || '',
                contentSnippet: item.contentSnippet || '',
                content: contentEncoded,
                slug,
                coverImage,
            };
        });
    } catch (error) {
        console.error('Error fetching Substack RSS feed:', error);
        return [];
    }
}

export async function getFeaturedTherapyGridArticles(): Promise<SubstackArticle[]> {
    const allArticles = await getSubstackFeed();

    // Find the anchor article
    const therapyArticle = allArticles.find((a: SubstackArticle) => a.slug === 'human-design-and-therapy');

    if (!therapyArticle) return [];

    // Extract all substack URLs linked in the body
    const links: string[] = [];
    const linkMatches = therapyArticle.content.matchAll(/href="([^"]+)"/g);
    for (const match of linkMatches) {
        if (match[1].includes('reflectorsreflections.substack.com/p/')) {
            links.push(match[1]);
        }
    }

    // Find the articles in the feed that match those links
    const linkedSlugs = links.map(link => {
        const match = link.match(/\/p\/([^/?]+)/);
        return match ? match[1] : null;
    }).filter(Boolean) as string[];

    // Return unique articles that were linked
    const uniqueLinkedArticles = Array.from(new Set(linkedSlugs))
        .map(slug => allArticles.find((a: SubstackArticle) => a.slug === slug))
        .filter(Boolean) as SubstackArticle[];

    return uniqueLinkedArticles;
}
