# nerium-static

Prototype static report generator based on Python [Nerium](https://github.com/oaodev/nerium) library, [Vue.js](https://vuejs.org), and [Chartist.js](https://gionkunz.github.io/chartist-js/).

Live example running at <http://pedantic-hugle-486026.netlify.com/>

The included `nerium_static.py` script uses the Nerium library without the web app, and can work for any arbitrary database query you can configure access to.

The Vue app is currently quite specific to the Alpha EU revenue summary, but it would already be easy enough to create new reports under `src/components`. Eventually, I hope to refactor this to something more general, so that adding new reports can be metadata-driven.

## Installation

``` sh
git clone git@github.com:tym-oao/nerium-static.git
pipenv install
npm install
```

## Usage

- Add query script to `query_files` directory
- Edit `nerium-static-config.yaml` with options:
  - query_name(required)
  - query_params(dictionary, optional, as needed for query script)
  - format(optional)
  - output_name(optional, defaults to query_name)
- `pipenv run python nerium_static.py` will write Nerium JSON output to `public`

## Deployment to Netlify

Assumes `netlifyctl` is installed locally

``` sh
npm run build
netlifyctl deploy
```
