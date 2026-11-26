# Allied Marcomm website

Static one-page site for **Allied Marcomm** (alliedmarcomm.com), a branding, communication & design and marketing team based in Hyderabad, with a presence in Bengaluru.

Sections: Home, Our Story, Services, Portfolio, Let's Talk (contact form + map), footer.
Style follows the reference: a blue-to-green gradient contact block, a circular map, a red pill button and a dark footer, set in Poppins.

## Run locally

No build step. Open `index.html` in a browser, or serve the folder:

```
python -m http.server 8000
```

## Add portfolio creatives (30-40 images)

1. Copy the JPGs into `img/portfolio/`.
2. List them in `js/portfolio.js`:

```js
window.PORTFOLIO = [
  { src: "img/portfolio/01.jpg", title: "Client - Campaign", category: "Branding" },
  { src: "img/portfolio/02.jpg", title: "Client - Hoarding", category: "Outdoor" },
];
```

Filter buttons appear automatically when there are 2+ categories. Until images are added, placeholder tiles are shown.

## Contact form

The form is static: on submit it opens the visitor's email app with the message pre-filled, addressed to `sunil@alliedmarcomm.com` (cc `alliedmarcomm@gmail.com`). To receive submissions without a mail app, point the form at a service such as Formspree.

## Deploy

Any static host works (GitHub Pages, Netlify, or the hosting at NettiGritty, where the domain is registered). Upload the files as-is and point `alliedmarcomm.com` at the host.
