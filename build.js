#!/usr/bin/env node
// build.js — run automatically by GitHub Action on every push
// Scans /posts/, extracts metadata, writes posts.json

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, 'posts');
const OUTPUT = path.join(__dirname, 'posts.json');

function extractMeta(html, filename) {
  const idMatch = filename.match(/^(\d+)/);
  const id = idMatch ? idMatch[1].padStart(2, '0') : '00';

  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : filename.replace(/^\d+-/, '').replace(/\.html$/, '');

  // Prefer <meta name="excerpt"> if present
  const excerptMeta = html.match(/<meta\s+name=["']excerpt["']\s+content=["']([^"']+)["']/i);
  let excerpt = excerptMeta ? excerptMeta[1] : '';

  // Fallback: first <p> tag
  if (!excerpt) {
    const pMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    excerpt = pMatch ? pMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 200) : '';
  }

  const kwMatch = html.match(/<meta\s+name=["']keywords["']\s+content=["']([^"']+)["']/i);
  const keywords = kwMatch ? kwMatch[1].split(',').map(k => k.trim().toLowerCase()) : [];

  return { id, title, url: `posts/${filename}`, excerpt, keywords };
}

const files = fs.readdirSync(POSTS_DIR)
  .filter(f => f.endsWith('.html') && f !== 'template.html')
  .sort();

const posts = files.map(filename => {
  const html = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8');
  return extractMeta(html, filename);
});

fs.writeFileSync(OUTPUT, JSON.stringify(posts, null, 2));
console.log(`✓ Built posts.json with ${posts.length} posts`);
posts.forEach(p => console.log(`  #${p.id} — ${p.title}`));
