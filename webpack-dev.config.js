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
          ]
        }
      }
    ],
    
  },
  plugins: [
    new Dotenv()

  ],
};
