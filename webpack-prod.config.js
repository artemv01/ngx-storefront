const purgecss = require('@fullhuman/postcss-purgecss');
const Dotenv = require('dotenv-webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          syntax: 'postcss-scss',
          plugins: () => [
            require('postcss-import'),
            require('tailwindcss')('./tailwind.config.js'),
            require('autoprefixer'),
            purgecss({
              content:  ['./**/*.html', './**/*.ts', './**/*.scss'], 
              defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
              whitelist: ['host'],
              whitelistPatterns: [/^:host/],
            })
         
          ]
        }
      }
    ]
  },
  /* plugins: [
    new Dotenv()

  ], */
};
 