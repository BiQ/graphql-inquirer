# NPM Module Webpack Template

A template for modules that can be installed through npm, with webpack, babel (es6) and basic loaders.

## Create

1. Clone or fork this repository (Fork for business, clone for play)
   * If cloning, remember to unlink git from this repo: `git remote rm origin`
1. Run `$ npm install`
1. Edit package.json
    * Name, description and version
    * Urls for repositories etc.
1. Update `webpack.config.js`
    * Set output.library to a fitting name (no spaces or dashes, etc.)
1. Edit `src/application.js` to your hearts content
    * Wrapping everything in an object like the example is recommended (see below)
1. Build the module with `$ npm run build` or watch the files with `$ npm run watch`
1. Push to github

## Use

Install with npm (with SSH key for private repos):

`$ npm install git+ssh://git@github.com:USER/REPO.git`

Import and use:

```
import MyModule from 'my-module';

// if your module exports a class
var myObject = new MyModule();

// else if it exports an object
MyModule.doStuff();
```

### Script Tag

When using via `<script>` you have to call `.default` on the object, so

```
// class
var myObject = new MyModule.default();

// object
MyModule.default.getSchwifty();
```

This seems to be a quirk of Webpacks UMD implementation.

## Notes

The package is set up for Universal Module Definition (`umd`) exports, which means it should work with all the common module import methods, such as CommonJS and AMD. This has not really been tested, though.
