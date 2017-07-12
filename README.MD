# NPM Module Webpack Template

A template for modules that can be installed through npm, with webpack, babel (es6) and basic loaders.

## Create

1. Clone this repository
1. run `$ npm install`
1. Edit package.json
    * name, description and version
    * urls for repositories etc.
1. Update `webpack.config.js`
    * Set output.library to a fitting name (no spaces or dashes, etc.)
1. Edit `src/application.js` to your hearts content
    * Wrapping everything in an object like the example is recommended (see below)
1. Build the module with `$ npm run build`
1. Push to github

## Use

Install with npm (with SSH key for private repos):

`$ npm install git+ssh://git@github.com:USER/REPO.git`

Import and use:

```
import MyModule from 'my-module';

MyModule.doStuff();
```

## Notes

The package is set up for Universal Module Definition (`umd`) exports, which means it should work with all the common module import methods, such as CommonJS and AMD. This has not really been tested, though.
