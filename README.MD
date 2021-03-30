# Static Html Starter

A static html starter base on gulp build. Using html5, tailwindcss and svg icon.

**Note:**
- Strongly recommend using [`nvm`](https://github.com/coreybutler/nvm-windows/) to switch the version of node, suitable for different projects.
- Tailwind CSS requires Node.js 12.13.0 or higher.
- To make sure working, please follow the version of node where `.nvmrc` list.
- Please use `npm` instead of `yarn` to make sure all of dependencies install correctly.

## Build Setup

```bash
# install gulp globally
$ npm install -g gulp

# install
$ npm install

# build for production
$ gulp prod:build

# serve with hot reload at localhost:3000
$ gulp
```

## Icon component usage

```html
<i class="inline-block leading-none align-middle text-red-500 h-4 w-4">
  @@include('<path>/icon.shtml', {'name': 'search'})
</i>
```
- Set icon color: `text-red-500`
- Set icon size: `h-4 w-4`
- Set icon name: `{'name': 'search'}`


## Tips for development

**For performance**
1. Defer offscreen images, [Lazy load offscreen images with lazysizes codelab](https://web.dev/codelab-use-lazysizes-to-lazyload-images/).

```html
<img src="..." alt="xx" title="xxx" loading="lazy" />
```

2. Efficiently encode images

**There are many steps you can take to optimize your images, including:**
- [Using image CDNs](https://web.dev/image-cdns/)
- [Compressing images](https://web.dev/use-imagemin-to-compress-images/)
- [Replacing animated GIFs with video](https://web.dev/replace-gifs-with-videos/)
- [Lazy loading images](https://web.dev/use-lazysizes-to-lazyload-images/)
- [Serving responsive images](https://web.dev/serve-responsive-images/)
- [Serving images with correct dimensions](https://web.dev/serve-images-with-correct-dimensions/)
- [Using WebP images](https://web.dev/serve-images-webp/)

3. Ensure text remains visible during webfont load

- By including `font-display: swap` in your `@font-face` style, you can avoid <FOIT> in most modern browsers:

```html
<link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet">
```

```css
@font-face {
  font-family: 'Pacifico';
  font-style: normal;
  font-weight: 400;
  src: local('Pacifico Regular'), local('Pacifico-Regular'), url(https://fonts.gstatic.com/s/pacifico/v12/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2) format('woff2');
  font-display: swap;
}
```

4. Preload key request
```html
<head>
  ...
  <link rel="preload" href="styles.css" as="style">
  <link rel="preload" href="ui.js" as="script">
  <link rel="preload" href="/assets/Pacifico-Bold.woff2" as="font" type="font/woff2" crossorigin>
  ...
</head>
```

5. Image elements have explicit width and height.

- Always include width and height size attributes on your images and video elements.
- Alternatively, reserve the required space with [CSS aspect ratio boxes](https://css-tricks.com/aspect-ratio-boxes/).

**Responsive images**
```html
<picture>
  <source media="(max-width: 799px)" srcset="puppy-480w-cropped.jpg" />
  <source media="(min-width: 800px)" srcset="puppy-800w.jpg" />
  <img src="puppy-800w.jpg" alt="Puppy with balloons" />
</picture>
```

6. Optimize Cumulative Layout Shift.

**The most common causes of a poor CLS are:**

- Images without dimensions
- Ads, embeds, and iframes without dimensions
- Dynamically injected content
- Web Fonts causing FOIT/FOUT
- Actions waiting for a network response before updating DOM

[Learn how to avoid sudden layout shifts to improve user-experience](https://web.dev/optimize-cls/?utm_source=lighthouse&utm_medium=devtools#images-without-dimensions)

7. Minify CSS and Remove unused CSS (using tailwindcss and purecss)

8. Minify JavaScript and Remove unused JavaScript


**For best practices**
1. Page has the HTML doctype. And `<html>` element has a `[lang]` attribute, use a [valid language code](https://www.w3.org/International/questions/qa-choosing-language-tags#question).

```html
<!doctype html>
<html lang="en">
…
```

2. Heading elements appear in a sequentially-descending order.

```html
<h1>Page title</h1>
<section>
  <h2>Section Heading</h2>
  …
    <h3>Sub-section Heading</h3>
</section>
```

3. Form elements have associated labels.

```html
<!-- Option 01 -->
<label>
  Receive promotional offers?
  <input type="checkbox">
</label>

<!-- Option 02 -->
<label for="promo">Receive promotional offers?</label>
<input id="promo" type="checkbox">


<!-- Useful tips for those only display form elements-->
<label>
  <span class="sr-only">Receive promotional offers?</span>
  <input type="checkbox">
</label>

<label for="promo" class="sr-only">Receive promotional offers?</label>
<input id="promo" type="checkbox">
```


**For SEO**

1. Document has a `<title>` element

```html
<title>20-week training schedule for your first marathon</title>
```
**Tips for creating great titles**
- Use a unique title for each page.
- Make titles descriptive and concise. Avoid vague titles like "Home".
- Avoid [keyword stuffing](https://support.google.com/webmasters/answer/66358). It doesn't help users, and search engines may mark the page as spam.
- It's OK to brand your titles, but do so concisely.

2. Has a `<meta name="viewport">` tag with `width` or `initial-scale`

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

3. Document has a `meta` description

```html
<meta name="description" content="Put your description here.">
```
**Meta description best practices**
- Use a unique description for each page.
- Make descriptions clear and concise. Avoid vague descriptions like "Home"
- Avoid [keyword stuffing](https://support.google.com/webmasters/answer/66358). It doesn't help users, and search engines may mark the page as spam.
- Descriptions don't have to be complete sentences; they can contain structured data.

4. Links have descriptive text

```html
<p>To see all of our basketball videos, <a href="videos.html">click here</a>.</p>
```
**Link text best practices**
- Stay on topic. Don't use link text that has no relation to the page's content.
- Don't use the page's URL as the link description unless you have a good reason to do so, such as referencing a site's new address.
- Keep descriptions concise. Aim for a few words or a short phrase.
- Pay attention to your internal links too. Improving the quality of internal links can help both users and search engines navigate your site more easily.

**Note**
For `image` or `icon` only of link or button,  using `class="sr-only"` to achieve

```html
<a href="#">
  <span class="sr-only">Workflow</span>
  <img src="..." alt="xx">
</a>
```
or

```html
<button type="button">
  <span class="sr-only">Open menu</span>
  @@include('<path>/icon.shtml', {'name': 'search'})
</button>
```
and so on...

5. Image elements have [alt] attributes

```html
<!-- Most images should have short, descriptive text -->
<img src="..." alt="Audits set-up in Chrome DevTools">

<!-- For image acts as decoration and does not provide any useful content -->
<img src="background.png" alt="">
```
**Tips for writing effective alt text**
- `alt` text should give the intent, purpose, and meaning of the image.
- Blind users should get as much information from alt text as a sighted user gets from the image.
- Avoid non-specific words like "chart", "image", or "diagram".

6. Links are crawlable

Please make sure `<a>` element always have the `href` attributes.

```html
<!-- For link element -->
<a href="https://www.example.com">www.example.com</a>

<!-- For anchor element -->
<a href="#anchor-id">Section</a>

<!-- For <a> tag button element -->
<a href="javascript:;" role="button">Login</a>
```

7. Document avoids plugins

```html
<!-- Avoid use <embed>, <object>, <applet > -->
<embed src="helloworld.swf" />

<object classid="clsid:F08DF954-8592-11D1-B16A-00C0F0283628" id="Slider1" width="100" height="50">
  <param name="BorderStyle" value="1" />
  <param name="MousePointer" value="0" />
  <param name="Enabled" value="1" />
  <param name="Min" value="0" />
  <param name="Max" value="10" />
</object>

<applet code="Bubbles.class" width="350" height="350">
  Java applet that draws animated bubbles.
</applet>
```
**Note**
- A URL with a file format that is known to represent plugin content: `swf`, `flv`, `class`, `xap`.

8. Page isn’t blocked from indexing

- Remove the `X-Robots-Tag` HTTP response header if you set up a HTTP response header:
```json
X-Robots-Tag: noindex
```
- Remove the following meta tag if it's present in the head of the page:
```html
<meta name="robots" content="noindex">
```
- Remove meta tags that block specific crawlers if these tags are present in the head of the page. For example:
```html
<meta name="Googlebot" content="noindex">
<meta name="AdsBot-Google" content="noindex"/>
```
