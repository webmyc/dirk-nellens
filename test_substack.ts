import { getSubstackFeed } from './lib/substack';

async function test() {
  const articles = await getSubstackFeed();
  console.log(articles.slice(0, 3).map(a => ({ title: a.title, coverImage: a.coverImage })));
}
test();
