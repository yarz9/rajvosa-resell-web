# Brand assets

Place the final Rajvosa Resell logo here:

```
public/brand/rajvosa-resell-logo.png
```

Optional, picked up automatically if present:

```
public/brand/rajvosa-resell-logo.webp     # smaller payload, modern browsers
public/brand/rajvosa-resell-logo@2x.png   # high-DPI variant
```

The site references `/brand/rajvosa-resell-logo.png` everywhere via the
constant in `src/lib/brand.js`. Vite serves anything under `public/` at
the site root, so no imports or rebuilds are needed when the file is
updated — drop the new file in and refresh.

While the file is missing the BrandMark component falls back to the
styled `RAJVOSA/RESELL` wordmark so the site never visibly breaks.
