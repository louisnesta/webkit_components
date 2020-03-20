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

## Configuring Components

All components are configured in @/data/config.json with the following properties:

```
{
  "type": "", // [string, required]
  "title": "", // [string, optional]
  "id": "", // [string, optional], enables scroll to and includes link in the nav component with the "title" as the link text
}
```

### Hero

Displays a hero banner at the top of the site.

```
{
  "type": "hero" // [string, required]
  "background": {
    "color": "" // [string, required], ex: '#00000' or 'blue'
  },
  "text": {
    "content": "", // [string, optional], hero text
    "align": "", // [string, optional], aligns text "left" or "right" of main image
    "buttons": // [array, optional], displays action buttons included below main text
    [
      {
      "text": "", // [string, required], button text
      "url": "", //  [string, optional], button url
      "background": "" // [string, optional], ex: '#00000' or 'blue'
      }
    ]
  },
  "image": {
    "url": "", // [string, require], url of image src
    "width": 450 // [integer, optional], sets max_width of image
  }
}
```

### Custom

Displays text alongside an optional image or video

```
{
  "type": "custom" // [string, required]
  "image": {
    "url": "", // [string, required], url of image src
    "width": 420 // [integer, optional], sets max_width of image
  },
  "video": {
    "src": "", // [string, required], url of the video
    "poster": "", // [string, optional], url of image for video poster
  },
  "text": {
    "content": "", // [string, optional], main text content 
    "position": "left", // [string, optional], positions text "left" or "right" in relation to image or video
    "buttons": [{
      "text": "", // [string, required], button text 
      "url": "", // [string, required], button url 
      "background": "" [string, optional], background color of button in CSS, ex: '#00000' or 'blue'
    }]
  }
}
```

### Topics

Displays topics either as a slideshow or scrollable row of cards

```
{
  "type": "topics", // [string, required]
  "view": "", // [string, required], "featured" displays topics as slideshow, "cards" displays topics in row of cards
  "tag": "", // [string, required], the tag of topics to display from the platform
  "sort_by": {
    "property": "", // [string, required], the property ["title", "created_at"] to sort topics by
    "order": "ascending" // [string, required], the order ["ascending", "descending"] to sort topics by
  },
  "display": ["title", "author", "date"] // [array, optional], determines whether to display author, date and title of topic
  "image": {
    "url": "" // [string, optional]
  },
  "video": {
    "src": "", // [string, optional], src url of video
    "poster": "" // [string, optional], url of image for video poster
  },
  "text": {
    "content": "", // [string, optional]
    "position": ""// [string, optional], position content "left" or "right" of video or image
  }
}
```

### Events

Displays topics in a calendar view. Topics from discourse must include an ```event``` property.

```
{
  "tag": "", //  [string, required] tag of topics on platform to be included as events
  "types": {
    "event_type": "", [string, optional], color of event_type ex: '#00000' or 'blue'
  }
}
```

### Users

Displays Discourse users from a specific category

```
{
  "type": "users", // required
  "category": "campfire", // [string, required] category slug from which to display users from the platform
  "only_bios": true // [boolean, optional] display only users with a bio on the platform
}
```

### People

Displays topics in the format of the 'Users' component for people with no Discourse account

```
{
  "tag": "" // [string, required] tag of topics on platform to be included as a bio
}
```

### Partners

Displays a slider of partners with logos and dates

```
{
  "type": "partners",
  "display": {
    "slides": 3 // [integer, required] number of slides to display in rotation
  },
  "content": [
    {
    "title": "", // [string] name of publication/partner
    "date": "", // [string] date of quote
    "url": "", // [string] url of partner/publication
    "logo": "", // [string] image to be displayed in the slide
    "excerpt": "" // [string] text to be displayed in the slide
    }
  ]
}
```

### Edgeryders

Displays the Edgeryders about section

```
{
  "type": "edgeryders", // [string, required]
  "title": "" // [string, optional]
}
```

### Form

Displays a form for signing up and/or posting to the platform

```
{
  "type": "form", // [string, required]
  "content": "", // [string, optional]
  "settings": {
    "createTopic": false // [boolean, required] determines if a topic is posted to platform on signup
  },
  "slideDefaults": {
    "title": "Q{{index}}", // [string, required]
    "backText": "", // [string, required] back button text
    "nextText": "", // [string, required] next button text
    "backTitle": "", // [string, required] title to go back
    "nextTitle": "", // [string, required] title to continue
    "fields": [
      {
        "name": "message", // [string, required] input field to enter text
        "type": "textarea", // [string, required] input type
        "placeholder": "write here...", // [string, optional] input placeholder text
        "required": true, // [boolean, required] determines if input text is required to continue
        "autofocus": true, // [boolean, required] determines if input is focused on by default
        "error": "Please write a response!"  // [string, required] determines error text
      }
    ],
    "diagram": {},
    "settings": { "omitFields": true }
  },
  "slides": [
    {
      "index": 1, // [integer, required] slide index number determines order
      "title": "", // [string, required] 
      "nextTitle": "SIGN UP", // [string, required] title of next slide
      "body": "", // [string, optional] body text of slide
      "fields": [{
      "name": "", // [string, required] field name
      "type": "text", // [string, required] field type
      "placeholder": "", // [string, optional] input placeholder text
      "half": true, // [boolean, optional]
      "required": true, // [boolean, required]
      "autofocus": false, // [boolean, required]
      "error": "" // [string, optional]
    },
    {
      "nextText": "SEND", // [string, optional] final submit button
      "submit": true, // [boolean, required] submits the form
      "settings": { 
      "omitBody": true 
    }
  ],
  "errorMessages": {
    "networkError": "", [string, optional] // error message if network is down
    "username": "", // [string, optional] error message if username is already taken
    "email": "", // [string, optional] error message if email is already taken
    "default": "" // [string, optional] defauolt error message
  }
}
```

### Terms

Displays Edgeryders terms and conditions.

```
{
  "type": "terms" // [string, required]
}
```

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
