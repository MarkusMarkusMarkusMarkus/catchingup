# Catching Up

Field notes on GenAI. Live at [catchingup.now](https://catchingup.now)  

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
  posts/
    template.html      ← fallback template
    01-getting-it.html
    ...
  assets/
    images/
```
