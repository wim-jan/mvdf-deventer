# Maand van de Filosofie Deventer

This repository contains the source files for the [Maand van de Filosofie Deventer](https://filosoferenindeventer.nl). The website is a static website written in [Hugo](http://gohugo.io/), hosted on [Netlify](https://netlify.com) and generated with Hugo and maintained with [DatoCMS](https://www.datocms.com).

## Usage

First, install the dependencies of this project:

```
yarn install
```

Then, to run this website in development mode (with live-reload):

```
yarn start
```

To build the final, production ready static website:

```
yarn build
```

The final result will be saved in the `public` directory.

## About

This websites uses:

* [Yarn](https://yarnpkg.com/) as package manager;
* [Webpack](https://webpack.github.io/) to compile and bundle assets (Sass/ES2015 JS);
* [datocms-client](https://github.com/datocms/js-datocms-client) to integrate the website with DatoCMS.