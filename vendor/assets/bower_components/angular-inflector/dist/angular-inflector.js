/**
 * Angular inflection library
 * @version v0.2.0 - 2014-08-22
 * @link https://github.com/platanus/angular-inflector
 * @author Ignacio Baixas <ignacio@platan.us>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(angular, undefined) {
'use strict';
angular.module('platanus.inflector', [])
  /**
   * @class inflectorProvider
   *
   * @description
   *
   * The inflectorProvider exposes inflector configuration options, mainly related to locales.
   */
  .provider('inflector', [function () {

    var activeLocale = 'en', localeMap = {
      /**
       * English transformation rules.
       *
       * Taken from https://code.google.com/p/inflection-js/source/browse/trunk/inflection.js
       */
      en: {
        uncountable: [
          'music', 'art', 'love', 'happiness', 'advice', 'furniture', 'luggage',
          'sugar', 'butter', 'water', 'electricity', 'gas', 'power', 'currency',
          'equipment', 'information', 'rice', 'money', 'species', 'series',
          'fish', 'sheep', 'moose', 'deer', 'news'
        ],

        plural: [
          [new RegExp('(m)an$', 'gi'),                 '$1en'],
          [new RegExp('(pe)rson$', 'gi'),              '$1ople'],
          [new RegExp('(child)$', 'gi'),               '$1ren'],
          [new RegExp('^(ox)$', 'gi'),                 '$1en'],
          [new RegExp('(ax|test)is$', 'gi'),           '$1es'],
          [new RegExp('(octop|vir)us$', 'gi'),         '$1i'],
          [new RegExp('(alias|status)$', 'gi'),        '$1es'],
          [new RegExp('(bu)s$', 'gi'),                 '$1ses'],
          [new RegExp('(buffal|tomat|potat)o$', 'gi'), '$1oes'],
          [new RegExp('([ti])um$', 'gi'),              '$1a'],
          [new RegExp('sis$', 'gi'),                   'ses'],
          [new RegExp('(?:([^f])fe|([lr])f)$', 'gi'),  '$1$2ves'],
          [new RegExp('(hive)$', 'gi'),                '$1s'],
          [new RegExp('([^aeiouy]|qu)y$', 'gi'),       '$1ies'],
          [new RegExp('(x|ch|ss|sh)$', 'gi'),          '$1es'],
          [new RegExp('(matr|vert|ind)ix|ex$', 'gi'),  '$1ices'],
          [new RegExp('([m|l])ouse$', 'gi'),           '$1ice'],
          [new RegExp('(quiz)$', 'gi'),                '$1zes'],
          [new RegExp('s$', 'gi'),                     's'],
          [new RegExp('$', 'gi'),                      's']
        ],

        singular: [
          [new RegExp('(m)en$', 'gi'),                                                       '$1an'],
          [new RegExp('(pe)ople$', 'gi'),                                                    '$1rson'],
          [new RegExp('(child)ren$', 'gi'),                                                  '$1'],
          [new RegExp('([ti])a$', 'gi'),                                                     '$1um'],
          [new RegExp('((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$','gi'), '$1$2sis'],
          [new RegExp('(hive)s$', 'gi'),                                                     '$1'],
          [new RegExp('(tive)s$', 'gi'),                                                     '$1'],
          [new RegExp('(curve)s$', 'gi'),                                                    '$1'],
          [new RegExp('([lr])ves$', 'gi'),                                                   '$1f'],
          [new RegExp('([^fo])ves$', 'gi'),                                                  '$1fe'],
          [new RegExp('([^aeiouy]|qu)ies$', 'gi'),                                           '$1y'],
          [new RegExp('(s)eries$', 'gi'),                                                    '$1eries'],
          [new RegExp('(m)ovies$', 'gi'),                                                    '$1ovie'],
          [new RegExp('(x|ch|ss|sh)es$', 'gi'),                                              '$1'],
          [new RegExp('([m|l])ice$', 'gi'),                                                  '$1ouse'],
          [new RegExp('(bus)es$', 'gi'),                                                     '$1'],
          [new RegExp('(o)es$', 'gi'),                                                       '$1'],
          [new RegExp('(shoe)s$', 'gi'),                                                     '$1'],
          [new RegExp('(cris|ax|test)es$', 'gi'),                                            '$1is'],
          [new RegExp('(octop|vir)i$', 'gi'),                                                '$1us'],
          [new RegExp('(alias|status)es$', 'gi'),                                            '$1'],
          [new RegExp('^(ox)en', 'gi'),                                                      '$1'],
          [new RegExp('(vert|ind)ices$', 'gi'),                                              '$1ex'],
          [new RegExp('(matr)ices$', 'gi'),                                                  '$1ix'],
          [new RegExp('(quiz)zes$', 'gi'),                                                   '$1'],
          [new RegExp('s$', 'gi'),                                                           '']
        ]
      }
    };

    // helper function used by singularize and pluralize
    function applyRules(_string, _ruleSet, _skip) {

      if(_skip.indexOf(_string.toLowerCase()) === -1) {
        var i = 0, rule;
        while(rule = _ruleSet[i++]) {
          if(_string.match(rule[0])) {
            return _string.replace(rule[0], rule[1]);
          }
        }
      }

      return _string;
    }

    return {

      /**
       * @memberof inflectorProvider#
       *
       * @description
       *
       * Registers a new locale, see the default english locale implementation for information about the required structure.
       *
       * @param {string} _locale Locale name
       * @param {object} _def Locale definition
       */
      registerLocale: function(_locale, _def) {
        localeMap[_locale] = _def;
      },

      /**
       * @memberof inflectorProvider#
       *
       * @description
       *
       * Sets the default locale, defaults to 'en'
       *
       * @param {string} _locale Locale name
       */
      setLocale: function(_locale) {
        activeLocale = _locale;
      },

      /**
       * @class inflector
       *
       * @description
       *
       * The inflector service provides a set of string transformation methods.
       */
      $get: ['$log', function($log) {

        function loadRulesFor(_locale) {
          _locale = _locale || activeLocale;
          var rules = localeMap[_locale];
          if(!rules) $log.warn('Invalid inflector locale ' + _locale);
          return rules;
        }

        return {

          /**
           * @memberof inflector#
           *
           * @description
           *
           * Transform a string to camelcase, removing every space, dash and underscore
           *
           * @param {string} _string String to transform
           * @param {boolean} _constant If set to false, first letter is not uppercased, defaults to false.
           * @return {string} The transformed string
           */
          camelize: function(_string, _constant) {
            if (typeof _string !== 'string') return _string;
            return _string.replace(/(?:^[-_\s]*|[-_\s]+)([A-Z\d])/gi, function (match, _first, _index) {
              return (!_constant && _index === 0) ? _first : _first.toUpperCase();
            });
          },

          /**
           * @memberof inflector#
           *
           * @description
           *
           * Transforms a camelcase string to a snakecase string
           *
           * @param {string} _string String to transform
           * @param {string} _sep Separator, defaults to '-'
           * @return {string} The transformed string
           */
          parameterize: function(_string, _sep) {
            if (typeof _string !== 'string') return _string;
            return _string.replace(/(?:[A-Z]+|[0-9]+)/g, function (_match, _index) {
              return _index === 0 ? _match : (_sep || '-') + _match;
            }).toLowerCase();
          },

          /**
           * @memberof inflector#
           *
           * @description
           *
           * Transforms a string to snakecase, replaces every space, dash and undercore by the provided separator.
           *
           * @param {string} _string String to transform
           * @param {string} _sep Separator, defaults to '-'
           * @return {string} The transformed string
           */
          dasherize: function(_string, _sep) {
            return _string.replace(/[-_\s]+/g, _sep || '-');
          },

          /**
           * @memberof inflector#
           *
           * @description
           *
           * Transforms a string to its singular form.
           *
           * @param {string} _string String to transform
           * @param {string} _locale) Locale to use, defaults to the default locale
           * @return {string} The transformed string
           */
          singularize: function(_string, _locale) {
            var rules = loadRulesFor(_locale);
            return rules ? applyRules(_string, rules.singular, rules.uncountable) : _string;
          },

          /**
           * @memberof inflector#
           *
           * @description
           *
           * Transforms a string to its plural form.
           *
           * @param {string} _string String to transform
           * @param {string} _locale) Locale to use, defaults to the default locale
           * @return {string} The transformed string
           */
          pluralize: function(_string, _locale) {
            var rules = loadRulesFor(_locale);
            return rules ? applyRules(_string, rules.plural, rules.uncountable) : _string;
          }
        };

      }]
    };
  }]);

})(angular);
