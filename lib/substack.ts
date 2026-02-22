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
    videoIframe?: string;
    audioUrl?: string;
}

const parser = new Parser({
    customFields: {
        item: ['content:encoded', 'enclosure'],
    },
});

export async function getSubstackFeed(): Promise<SubstackArticle[]> {
    try {
        const feed = await parser.parseURL('https://reflectorsreflections.substack.com/feed');

        return feed.items.map((item) => {
            // Extract the slug from the url (e.g. https://reflectorsreflections.substack.com/p/human-design-and-therapy)
            const slugMatch = item.link?.match(/\/p\/([^/?]+)/);
            const slug = slugMatch ? slugMatch[1] : '';

            let contentEncoded = item['content:encoded'] || item.content || '';

            // Clean up Substack UI artifacts (like the expand/maximize SVGs on images)
            contentEncoded = contentEncoded.replace(/<svg\b[^>]*?(?:lucide|maximize)[^>]*?>.*?<\/svg>/gi, '');

            // Extract first image from content:encoded for cover image
            let coverImage;

            // Otherwise comb the content for an image
            const imgRegex = /<img[^>]+src="([^">]+)"/g;
            let match;
            while ((match = imgRegex.exec(contentEncoded)) !== null) {
                // Ignore tracking pixels or small icons
                if (!match[1].includes('w_120') && !match[1].includes('twemoji')) {
                    coverImage = match[1];
                    break;
                }
            }

            // Extract iframe for video (e.g. YouTube embeds)
            let videoIframe;
            const iframeMatch = contentEncoded.match(/<iframe[^>]*src="([^">]*youtube\.com[^">]*|[^">]*vimeo\.com[^">]*)"[^>]*>/i);
            if (iframeMatch) {
                // Return the whole iframe tag but rewrite the width/height to be responsive or just keep the tag
                videoIframe = iframeMatch[0];
            }

            // Extract Audio Enclosure
            let audioUrl;
            if (item.enclosure && item.enclosure.url && item.enclosure.type?.startsWith('audio/')) {
                audioUrl = item.enclosure.url;
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
                videoIframe,
                audioUrl,
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
