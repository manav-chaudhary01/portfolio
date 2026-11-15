import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const distDir = path.join(rootDir, 'dist');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Read configurable SITE_URL from environment
const rawSiteUrl = process.env.SITE_URL ? process.env.SITE_URL.trim().replace(/\/+$/, '') : '';
const isConfigured = Boolean(rawSiteUrl);

// If domain is not configured, use an explicit documented placeholder without inventing a domain
const siteUrl = isConfigured ? rawSiteUrl : 'https://YOUR_PRODUCTION_DOMAIN';

const routes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/work/meter-flow', changefreq: 'monthly', priority: '0.8' },
  { path: '/work/attendance-tracker', changefreq: 'monthly', priority: '0.8' },
  { path: '/work/leetcode-widget', changefreq: 'monthly', priority: '0.8' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/playground', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
  { path: '/activity', changefreq: 'daily', priority: '0.8' },
];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<!--
  SEO Sitemap
  Domain Configuration: ${isConfigured ? siteUrl : 'NOT_SET (Set SITE_URL in deployment environment to populate your production domain)'}
-->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${siteUrl}${r.path}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const robotsContent = `User-agent: *
Allow: /

# Sitemap location
# Configured via SITE_URL deployment environment variable (e.g. SITE_URL=https://example.com)
${!isConfigured ? '# NOTICE: SITE_URL was not set during build. Set SITE_URL in hosting variables for production.\n' : ''}Sitemap: ${siteUrl}/sitemap.xml
`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent, 'utf-8');
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent, 'utf-8');

if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsContent, 'utf-8');
}

console.log(`[generate-seo] Generated sitemap.xml and robots.txt using base: ${siteUrl} (configured: ${isConfigured})`);
