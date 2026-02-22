const Parser = require('rss-parser');

async function test() {
  const parser = new Parser({
    customFields: {
      item: [
        ['itunes:image', 'itunesImage']
      ]
    }
  });
  const feed = await parser.parseURL('https://reflectorsreflections.substack.com/feed');
  console.log(feed.items[0].itunesImage);
  console.log(feed.items[0]['itunes:image']);
  console.log(feed.items[0].itunes);
}

test();
