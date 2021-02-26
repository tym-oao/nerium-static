# nerium-static

Prototype static report generator based on PostgreSQL, [Vue.js](https://vuejs.org), and [Chartist.js](https://gionkunz.github.io/chartist-js/).

~~Live example running at <https://nerium-static.ty-m.pw/>~~

The included `cannery-result.js` script uses [`pg-db`](https://github.com/sehrope/node-pg-db), and can work for any arbitrary query against a Postgres database you have access to. Configure your Postgres connection by setting `DATABASE_URL` in your environment or a local `.env` file.

The Vue app is currently quite specific to the Alpha EU revenue summary, but it would already be easy enough to create new reports under `src/components`. Eventually, I hope to refactor this to something more general, so that adding new reports can be metadata-driven.

## Installation

``` sh
git clone git@github.com:tym-oao/nerium-static.git
npm install
```

## Quick Start

```bash
npm run dev
```

This will configure your environment with a basic .env file, build the data and app, then serve the app using the stubs at `./src/scripts/queries`.

## Develop

- Add query script to `/src/scripts/queries` directory
- Edit `/src/scripts/cannery-config.yaml` with options:
  - queryName(required)
  - queryParams(dictionary, optional, as needed for query script)
  - outputName(optional, defaults to query_name)
- `npm run build` fires `npm run prebuild`, which writes JSON output to `public`

## Deploy

Scripts currently assume [Netlify CLI](https://www.netlify.com/docs/cli/) is installed locally:

``` sh
npm run build
npm run deploy
```
