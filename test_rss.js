const Parser = require('rss-parser');

async function test() {
    const parser = new Parser();
    const feed = await parser.parseURL('https://reflectorsreflections.substack.com/feed');
    for (const item of feed.items.slice(0, 3)) {
        console.log("TITLE:", item.title);
        const content = item['content:encoded'] || item.content || '';
        const imgMatches = content.match(/<img[^>]+src="([^">]+)"/);
        console.log("FIRST IMG MATCH:", imgMatches ? imgMatches[1] : null);

        // Check original substack image regex
        const allMatches = Array.from(content.matchAll(/<img[^>]+src="([^">]+)"/g));
        const finalImg = allMatches.find(m => !m[1].includes('w_120') && !m[1].includes('twemoji'));
        console.log("FINAL CHOSEN IMG:", finalImg ? finalImg[1] : 'NONE');
        console.log("---");
    }
}

test();
