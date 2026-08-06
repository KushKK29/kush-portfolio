const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

// change this to your site URL
const siteUrl = 'https://kush-portfolio-virid.vercel.app';

// list your pages here
const links = [
  { url: '/', changefreq: 'monthly', priority: 1.0 },
  { url: '/work/articleship', changefreq: 'monthly', priority: 0.8 },
  { url: '/work/humantic-ai', changefreq: 'monthly', priority: 0.8 },
  { url: '/work/geeksforgeeks', changefreq: 'monthly', priority: 0.8 },
  { url: '/work/stock-analyser', changefreq: 'monthly', priority: 0.8 },
  { url: '/work/trade-shala', changefreq: 'monthly', priority: 0.8 },
];

const stream = new SitemapStream({ hostname: siteUrl });
const writeStream = createWriteStream('./public/sitemap.xml');

streamToPromise(stream).then(() =>
  console.log('✅ Sitemap generated!')
);

links.forEach(link => stream.write(link));
stream.end();
stream.pipe(writeStream);
