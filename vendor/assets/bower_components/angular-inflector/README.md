Platanus Angular Inflector Utilities [![Build Status](https://travis-ci.org/iobaixas/angular-inflector.svg)](https://travis-ci.org/iobaixas/angular-inflector)
===============

Small suite of inflector functions, hopefully this lib will no longer be needed when angular makes the inflector functions they use part of the public api.

## Installation:

**Optional** Use bower to retrieve package

```
bower install angular-inflector --save
```

Include angular module

```javascript
angular.module('platanus.inflector')
```

## Usage

This library registers the `inflector` service, the following methods are provided by the service.

```html
inflector.capitalize('the-snake'); // should output TheSnake
inflector.parameterize('TheCamel'); // should output the-camel
inflector.parameterize('TheCamel', '_'); // should output the_camel
inflector.dasherize('the_snake'); // should output the-snake
inflector.dasherize('the_snake', '&'); // should output the&snake
inflector.pluralize('index'); // should output indexes
inflector.singularize('mice'); // should output mouse
```

Credit for the general singularize and pluralize implementation and the english locale rules goes to Ryan Schuft
with his [ActiveSupport's Inflector port](https://code.google.com/p/inflection-js/source/browse/trunk/inflection.js).

For now only the english transformation rules are included for the `singularize` and `pluralize` functions.

**Contributions for new locale rules are very welcomed!**
