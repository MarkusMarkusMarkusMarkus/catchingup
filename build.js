#!/usr/bin/env node
// build.js — run this before pushing: `node build.js`
// Scans /posts/, extracts metadata, writes posts.json

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, 'posts');
const OUTPUT = path.join(__dirname, 'posts.json');

function extractMeta(html, filename) {
  // ID from filename: 01-getting-it.html → "01"
  const idMatch = filename.match(/^(\d+)/);
  const id = idMatch ? idMatch[1].padStart(2, '0') : '00';

  // Title from <title> tag or <h1>
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i)
    || html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  const title = titleMatch ? titleMatch[1].trim() : filename.replace(/^\d+-/, '').replace(/\.html$/, '').replace(/-/g, ' ');

  // Excerpt: first <p> tag content, strip tags
  const pMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const excerpt = pMatch
    ? pMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 200)
    : '';

  // Keywords from <meta name="keywords">
  const kwMatch = html.match(/<meta\s+name=["']keywords["']\s+content=["']([^"']+)["']/i);
  const keywords = kwMatch
    ? kwMatch[1].split(',').map(k => k.trim().toLowerCase())
    : [];

  const url = `posts/${filename}`;

  return { id, title, url, excerpt, keywords };
}

// Read all .html files in /posts/
const files = fs.readdirSync(POSTS_DIR)
  .filter(f => f.endsWith('.html'))
  .sort(); // sorts by filename, so 01- comes before 02- etc.

const posts = files.map(filename => {
  const html = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8');
  return extractMeta(html, filename);
});

fs.writeFileSync(OUTPUT, JSON.stringify(posts, null, 2));
console.log(`✓ Built posts.json with ${posts.length} posts`);
posts.forEach(p => console.log(`  #${p.id} — ${p.title}`));
