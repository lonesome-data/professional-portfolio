# Professional Portfolio

**[lonesome-data.github.io/professional-portfolio](https://lonesome-data.github.io/professional-portfolio/)**

Single-page static portfolio for recruiter and hiring manager review. Reinforces LinkedIn positioning with project depth, metrics, and technical credibility that a profile can't show.

## Stack

Static HTML/CSS. No JavaScript. No frameworks. No build step. Google Fonts (Inter) is the only external dependency.

Hosted on GitHub Pages.

## Structure

| Section | Purpose |
|---|---|
| Hero | Name, headline, hook |
| What I Do | Bridge narrative — technical architecture meets business strategy |
| Selected Work | Six case study cards with verified metrics |
| Certifications | Current and expired, clearly labeled |
| Footer | LinkedIn, GitHub, email |

## Open Graph

OG meta tags are configured for clean LinkedIn Featured section rendering. The `og:image` is a 2400x1260 PNG at `assets/og-image.png`.

## Files

```
index.html              Single-page site (HTML + inline CSS)
assets/og-image.png     LinkedIn preview card image
.nojekyll               Bypass Jekyll processing on GitHub Pages
google*.html            Google Search Console verification
```

## License

MIT
