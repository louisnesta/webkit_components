# Edgeryders Webkit

A library of Vue components for displaying content from Discourse.

Sections are configured in `/src/data/config.json`

The default category id is set to `237`, the [Campfire](https://edgeryders.eu/c/campfire) category on Edgeryders.

Global classes are set in `/src/assets/main.css`

Styling uses Tailwind utilities, [read more here](https://tailwindcss.com/docs/adding-new-utilities/#app) on how utilities work.

---

⚠️ For local development you must allow Cross Origin Resource Sharing in your browser.

## Core Components

-   Hero
-   Navigation
-   People
-   Topics
-   Events
-   Custom
-   Form

## Custom Components

-   Edgeryders
-   Terms

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

#### Form configuration

The form component is ported directly from the [edgeryders form builder](https://github.com/edgeryders/edgeryders-form), and most configuration noted on that repository will work within the `data/config.json` here.

(NB that you'll need a `.env.<environment>` file with the values noted under [Installation](https://github.com/edgeryders/edgeryders-form#2-installation) in order for the form to submit successfully.)

## Dependencies

-   https://github.com/axios/axios
-   https://github.com/moment/moment
-   https://github.com/tailwindcss
-   https://github.com/eddiemf/vue-scrollactive
-   https://github.com/surmon-china/vue-awesome-swiper
