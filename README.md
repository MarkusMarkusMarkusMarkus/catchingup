# Catching Up

Field notes on GenAI. Live at [catchingup.now](https://catchingup.now)

## Publishing a new post

1. Open `post-generator.html` in your browser (keep this file locally, don't upload it)
2. Fill in the post number, title, content, and keywords
3. Hit Generate → Download
4. Drag the downloaded `.html` file into the `/posts/` folder on GitHub
5. GitHub rebuilds automatically — live in ~60 seconds

That's it. No terminal needed.

## Adding images

Drop image files into `/assets/images/` on GitHub, then reference them in your post HTML:

```html
<figure>
  <img src="../assets/images/your-image.png" alt="">
</figure>
```

## File naming

Posts follow the pattern: `{number}-{slug}.html`

Examples:
- `01-getting-it.html`
- `32-new-post-title.html`

Always zero-pad to two digits.

## Structure

```
/
  index.html           ← homepage
  posts.json           ← auto-generated, don't touch
  build.js             ← runs automatically via GitHub Action
  post-generator.html  ← keep locally, use to create new posts
  posts/
    template.html      ← fallback template
    01-getting-it.html
    ...
  assets/
    images/
```
