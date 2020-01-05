<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [GatsbyJS: Getting Started](#gatsbyjs-getting-started)
  - [Setup](#setup)
  - [Starter Templates](#starter-templates)
  - [Creating Static Pages](#creating-static-pages)
    - [Understanding Gatsby Pages](#understanding-gatsby-pages)
    - [Create Static Pages](#create-static-pages)
    - [Linking between Pages](#linking-between-pages)
  - [Styling in Gatsby](#styling-in-gatsby)
    - [Understandng CSS in Gatsby](#understandng-css-in-gatsby)
    - [Creating Global Styles](#creating-global-styles)
    - [CSS Modules and SASS](#css-modules-and-sass)
  - [Creating Components](#creating-components)
    - [Understading Components in Gatsby](#understading-components-in-gatsby)
    - [Creating Layout Components](#creating-layout-components)
    - [Creating Sub-components: Header](#creating-sub-components-header)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# GatsbyJS: Getting Started

> My notes from this Pluralsight [course](https://app.pluralsight.com/library/courses/gatsbyjs-getting-started/table-of-contents)

## Setup

*VS Code: Disable Beautify plugin for this workspace*

- Install latest [Node.js LTS](https://nodejs.org/en/)
- Install [Gatsby CLI](https://www.gatsbyjs.org/docs/gatsby-cli/) globally:

  ```shell
  $ npm install -g gatsby-cli
  $ gatsby --version
  Gatsby CLI version: 2.8.22 # instructor using 2.4.5
  $ gatsby --help
  Usage: gatsby <command> [options]

  Commands:
    gatsby develop                   Start development server. Watches files, rebuilds, and hot reloads if something changes
    gatsby build                     Build a Gatsby project.
    gatsby serve                     Serve previously built Gatsby site.
    gatsby info                      Get environment information for debugging and issue reporting
    gatsby clean                     Wipe the local gatsby environment including built assets and cache
    gatsby repl                      Get a node repl with context of Gatsby environment, see (https://www.gatsbyjs.org/docs/gatsby-repl/)
    gatsby new [rootPath] [starter]  Create new Gatsby project.
    gatsby plugin                    Useful commands relating to Gatsby plugins
    gatsby telemetry                 Enable or disable Gatsby anonymous analytics collection.

  Options:
    --verbose                Turn on verbose output                                                              [boolean] [default: false]
    --no-color, --no-colors  Turn off the color in output                                                        [boolean] [default: false]
    --json                   Turn on the JSON logger                                                             [boolean] [default: false]
    -h, --help               Show help                                                                                            [boolean]
    -v, --version            Show the version of the Gatsby CLI and the Gatsby package in the current project                     [boolean]
  ```

## Starter Templates

Boilerplate Gatsby sites created by community, come with styles, js, images, etc.

[See all starter templates](https://www.gatsbyjs.org/starters/?v=2).

Search by `gatsby` to see official starters maintained by Gatsby team, eg: `gatsby-starter-default`, `gatsby-starter-blog`.

Each has link to github repo, need this to create a new gatsby project based off this template, eg:

```shell
$ gatsby new myfirstsite git@github.com:gatsbyjs/gatsby-starter-default.git
$ cd myfirstsite
$ gatsby develop
```

Starts dev server at [http://localhost:8000/](http://localhost:8000/)

Starter folder structure:

![starter folder structure](doc-images/starter-folder-structure.png "starter folder structure")

- `src` folder contains all code related to what's visible in browser
- `src/components` React components that make up site (eg: header.js, image.js, layout.js)
- `src/images` contains site images
- `src/pages` contains pages for the site - also react components, eg: index.js, 404.js, page-2.js
- `gatsby-browser.js` config file, settings affecting the browser
- `gatsby-config.js` main config file - specify metadata about site like title, description. What plugins should be included
- `gatsby-node.js` site build process config

**Gatsby Hello World**

Bare bones to get started, comes with less out of the box compared to gatsby starter

```shell
$ gatsby new blog git@github.com:gatsbyjs/gatsby-starter-hello-world.git
$ cd blog
$ gatsby develop
```

Hot reload used to inject code changes into browser without requiring refresh, try it:

- Notice browser displays `Hello world!`
- Modify `blog/src/pages/index.js`
- Change `world` to `Gatsby` - notice change immediately applied in browser, no refresh needed

## Creating Static Pages

### Understanding Gatsby Pages

Hello world starter comes with just one page: `src/pages/index.js`:

```jsx
import React from "react"

export default () => <div> Hello Gatsby! </div>
```

- All pages import React.
- above example is a functional component, returns JSX
- this is root of site, gets rendered when navigate to `http://localhost:8080`
- if change name of this to `hello.js` then refresh browser, will get dev error:
  ![dev error](doc-images/dev-error.png "dev error")
- however, `http://localhost:8000/hello` does render `Hello Gatsby!`

File names imply routing:

| File Name  | Route   |
|---|---|
| index.js  | /  |
| about.js  | /about  |
| contact.js  | /contact  |
| hello.js  | /hello  |

### Create Static Pages

Remove `src/pages/hello.js`

Create `src/pages/index.js`, notice all elements are wrapped in a single `<div>...</div>` element:

```jsx
import React from "react"

export default () => (
  <div>
    <h1>This is the index page</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
      voluptates earum et autem facilis aliquam? Architecto, quibusdam
      dignissimos repellendus harum ipsum eius facilis, necessitatibus
      aspernatur, recusandae non labore magnam tempora?
    </p>
  </div>
)
```

Create `src/pages/about.js` same as index but change title, and `src/pages/404.js`

Gatsby will serve `404.js` for any unmatched route, eg: `http://localhost:8000/missing`

### Linking between Pages

Modify `index.js` to link to Home and About pages:

```jsx
// blog/src/pages/index.js
import React from "react"

export default () => (
  <div>
    <h1>This is the index page</h1>
    <nav>
      <a href="/">Home</a> | <a href="/about">About Me</a>
    </nav>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
      voluptates earum et autem facilis aliquam? Architecto, quibusdam
      dignissimos repellendus harum ipsum eius facilis, necessitatibus
      aspernatur, recusandae non labore magnam tempora?
    </p>
  </div>
)
```

Then add same nav code to `about.js`:

```jsx
import React from "react"

export default () => (
  <div>
    <h1>This is the about page</h1>
    <nav>
      <a href="/">Home</a> | <a href="/about">About Me</a>
    </nav>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
      voluptates earum et autem facilis aliquam? Architecto, quibusdam
      dignissimos repellendus harum ipsum eius facilis, necessitatibus
      aspernatur, recusandae non labore magnam tempora?
    </p>
  </div>
)
```

**Gatsby's Link Component**

Better than html `<a>` tag:
- main component will prefetch route assets as soon as the link appears in browser's viewport
- avoids full page reload using Gatsby's router - faster, better UX
- Use with internal pages only
- Use html `<a>` to link to external pages

Modified index and about pages:

```jsx
// blog/src/pages/about.js
import React from "react"
import { Link } from "gatsby"

export default () => (
  <div>
    <h1>This is the about page</h1>
    <nav>
      <Link to="/">Home</Link> | <Link to="/about">About Me</Link>
    </nav>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
      voluptates earum et autem facilis aliquam? Architecto, quibusdam
      dignissimos repellendus harum ipsum eius facilis, necessitatibus
      aspernatur, recusandae non labore magnam tempora?
    </p>
  </div>
)

// blog/src/pages/index.js
import React from "react"
import { Link } from "gatsby"

export default () => (
  <div>
    <h1>This is the index page</h1>
    <nav>
      <Link to="/">Home</Link> | <Link to="/about">About Me</Link>
    </nav>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
      voluptates earum et autem facilis aliquam? Architecto, quibusdam
      dignissimos repellendus harum ipsum eius facilis, necessitatibus
      aspernatur, recusandae non labore magnam tempora?
    </p>
  </div>
)
```

## Styling in Gatsby

### Understandng CSS in Gatsby

- regular css
- pre-processors (eg: sass, less)
- css-in-js
- css modules (css file in which all class names are scoped locally by default, i.e. namespaced class names to avoid collisions), *supported by Gatsby by default*

**Naming Convention**

- create one css module per component
- componentName.module.css, eg:
  - `index.js` : `index.module.css`
  - `about.js` : `about.module.css`
  - `404.js` : `404.module.css`

Note *kebab-case* used for class names:

```css
/* blog/src/pages/404.module.css */
.header {
  color: red;
}

.error-message {
  font-size: 20px;
  color: green;
}
```

css in module files gets converted to a `styles` object that can be used by the component when imported, eg: `styles.header`, `styles.errorMessage`. Note *camelCase* css class names, and enclosed in curly braces which indicates a javascript expression is to be evaluated in jsx:

```jsx
import React from "react"
import styles from "./404.modules.css"

import React from "react"
import styles from "./404.module.css"

export default () => (
  <div>
    <h1 className={styles.header}>Page not found</h1>
    <p className={styles.errorMessage}>
      The page you are looking for does not exist.
    </p>
  </div>
)
```

### Creating Global Styles

Create new file `src/styles/global.css`:

```css
body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 17px;
  line-height: 22px;
  margin: 0px;
}
```

Configure Gatsby to tell it about the global styles file in `gatsby-browser.js`:

```javascript
import "./src/styles/global.css"
```

### CSS Modules and SASS

Install Gatsby plugin:

```shell
$ npm install --save node-sass gatsby-plugin-sass
```

Register in `gatsby-config.js`:

```javascript
module.exports = {
  plugins: ["gatsby-plugin-sass"],
}
```

Rename `404.module.css` to `404.module.scss`

Modify to make use of sass feature - nested classes:

```scss
.content {
  background-color: #fafafa;
  padding: 20px;

  .header {
    color: red;
  }

  .error-message {
    font-size: 20px;
    color: gray;
  }
}
```

Modify 404 page to import scss rather than css and make use of parent style:

```jsx
import React from "react"
import styles from "./404.module.scss"

export default () => (
  <div className={styles.content}>
    <h1 className={styles.header}>Page not found</h1>
    <p className={styles.errorMessage}>
      The page you are looking for does not exist.
    </p>
  </div>
)
```

## Creating Components

### Understading Components in Gatsby

3 types of components (all React):

1. Page components
  - `/src/pages/*.js`
  - Represents complete page, with UI and logic.
  - At build time, Gatsby processes jsx in page component into html for browser.
2. Layout components
  - Represents the look of the page
  - Re-used throughout the site
  - Wrapper that contains UI elements that are common to all pages (eg: header, footer)
3. Regular components
  - Building blocks of everything done in Gatsby
  - If have any presentation/logic that needs to be re-used, build it as a regular component.
  - Bundle components together to create larger components

`props` === object with properties that is passed to a React component, supply these to a component to make it dynamic.


### Creating Layout Components

All re-usable components will go in `src/components`.

`props.children` - special property in all props, `children` object can contain arbitrary elements, component can reference `{children}` in jsx to render its children, when it doesn't know ahead of time what those will be:

```css
/* blog/src/components/layout.module.scss */
.container {
  margin: 0 auto;
  max-width: 960px;
  padding: 10px;
}
```

```jsx
// blog/src/components/layout.js
import React from "react"
import styles from "./layout.module.scss"

export default ({ children }) => (
  <div className={styles.container}>{children}</div>
)
```

Use the new layout component in the index page. `children` property in `Layout` component will evaluate to whatever jsx is passed in between the `<Layout>...</Layout>`:

```jsx
// blog/src/pages/index.js
import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

export default () => (
  <Layout>
    <h1>This is the index page</h1>
    <nav>
      <Link to="/">Home</Link> | <Link to="/about">About Me</Link>
    </nav>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
      voluptates earum et autem facilis aliquam? Architecto, quibusdam
      dignissimos repellendus harum ipsum eius facilis, necessitatibus
      aspernatur, recusandae non labore magnam tempora?
    </p>
  </Layout>
)
```

Incorporate `Layout` component in the same way in other pages - about and 404. Also add link back to home page in 404:

```jsx
// blog/src/pages/about.js
import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

export default () => (
  <Layout>
    <h1>This is the about page</h1>
    <nav>
      <Link to="/">Home</Link> | <Link to="/about">About Me</Link>
    </nav>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
      voluptates earum et autem facilis aliquam? Architecto, quibusdam
      dignissimos repellendus harum ipsum eius facilis, necessitatibus
      aspernatur, recusandae non labore magnam tempora?
    </p>
  </Layout>
)

// blog/src/pages/404.js
import React from "react"
import styles from "./404.module.scss"
import Layout from "../components/layout"
import { Link } from "gatsby"

export default () => (
  <Layout>
    <div className={styles.content}>
      <h1 className={styles.header}>Page not found</h1>
      <p className={styles.errorMessage}>
        The page you are looking for does not exist.
      </p>
      <Link to="/">Home</Link>
    </div>
  </Layout>
)
```

### Creating Sub-components: Header

