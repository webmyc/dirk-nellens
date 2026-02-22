import Parser from 'rss-parser';

const parser = new Parser({
    customFields: {
        item: ['content:encoded', 'enclosure', 'media:content']
    }
});

async function test() {
    const feed = await parser.parseURL('https://reflectorsreflections.substack.com/feed');
    console.log(`Found ${feed.items.length} items`);
    if (feed.items.length > 0) {
        const first = feed.items[0];
        console.log("Title:", first.title);
        console.log("Has Enclosure:", !!first.enclosure);
        if (first.enclosure) console.log(first.enclosure);

        console.log("Content Encoded length:", first['content:encoded']?.length);

        // Find iframe in content
        const iframeMatch = first['content:encoded']?.match(/<iframe[^>]*>/);
        if (iframeMatch) {
            console.log("Found iframe:", iframeMatch[0]);
        }

        // Find img in content
        const imgMatch = first['content:encoded']?.match(/<img[^>]*src="([^"]+)"[^>]*>/);
        if (imgMatch) {
            console.log("Found img:", imgMatch[1]);
        }
    }
}

test();
