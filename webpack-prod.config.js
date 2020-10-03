const purgecss = require("@fullhuman/postcss-purgecss");
const Dotenv = require("dotenv-webpack");

module.exports = {
  plugins: [
    new Dotenv({
      systemvars: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: "postcss-loader",
        options: {
          ident: "postcss",
          syntax: "postcss-scss",
          plugins: () => {
            const p = [
              require("postcss-import"),
              require("tailwindcss")("./tailwind.config.js"),
              require("autoprefixer"),
            ];
            if (process.env.PURGECSS) {
              p.push(
                purgecss({
                  content: ["./**/*.html", "./**/*.ts", "./**/*.scss"],
                  defaultExtractor: (content) =>
                    content.match(/[\w-/:]+(?<!:)/g) || [],
                })
              );
            }
            return p;
          },
        },
      },
    ],
  },
 
};
