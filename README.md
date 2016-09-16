# TSI Cloud Portal App

[Angular 2](https://angular.io) app for the Cloud Portal developed by the Technology and Science Integration 
[team](https://github.com/EMBL-EBI-TSI) at [EMBL-EBI](http://www.ebi.ac.uk/).

## Quick Start

**Make sure you have Node version >= 5.0 and NPM >= 3**

```bash
# clone our repo
# --depth 1 removes all but one .git commit history
git clone --depth 1 https://github.com/EMBL-EBI-TSI/tsi-cloud-portal-app.git

# change directory to our repo
cd tsi-cloud-portal-app

# WINDOWS ONLY
# add required global libraries `typings webpack-dev-server rimraf webpack`
npm install -g typings webpack-dev-server rimraf webpack

# install the repo with npm
npm install

# WINDOWS ONLY
# install typings
npm run typings-install

# start the server
npm start
```

The current development setup has hot code reload and all that jazz for development of the app. It also assumes you'll be 
running the [API](https://github.com/EMBL-EBI-TSI/cloud-portal-api) locally. .. 

If you just want to run the app locally, better run in production mode! Instead of `npm start` above, run:
```bash
npm run build:prod
npm run server:prod
```
This doesn't have hot code reload etc...

## Getting started