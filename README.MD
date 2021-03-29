# Static Html Starter

A static html starter using gulp and tailwindcss.

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
  @@include('../views/icon.shtml', {'name': 'search'})
</i>
```
- Set icon color: `text-red-500`
- Set icon size: `h-4 w-4`
- Set icon name: `{'name': 'search'}`
