# An eCommerce system built on Angular & NestJS & TailwindCSS (the Customer UI part)

Ngx-storefront is an example of a modern eCommerce system built on TypeScript stack. The project consists of 3 parts:

*   the Customer UI [artemv01/ngx-storefront][ngx-storefront]
*   the REST API [artemv01/ngx-storefront-api][ngx-storefront-api]
*   and the Admin UI (coming soon)

This is a repository for the customer UI. 

## Technology stack

The techonoly stack used for the customer UI consists of:
* [Angular][angular]
* [TailwindCSS][tailwind]
* [SCSS][scss]

Deployed on [Netlify](https://www.netlify.com/).

## Live demo

The demo can be seen here -> [https://ngx-storefront.artemev.dev/](https://ngx-storefront.artemev.dev/)

![An ecommerce system built on Angular & NestJS & TailwindCSS][demo]

## What’s currently missing

The project is on its initial stage and there are still some important features that are yet to be implemented. Such as:

*   Stripe integration
*   Customer dashboard
*   Product variations
*   Custom product attributes
*   Coupon system
*   Some others

Integration/unit tests were omitted so far and might be implemented in the future.


## Setting up development environment


### Launch the REST API

```
git clone https://github.com/artemv01/ngx-storefront-api.git
cd ngx-storefront-api
cp .env.example .env
# Open the .env file with your favorite  text editor (in this example vim)
# Set the required params as per the documentation in .env file
vim .env
npm install
npm run start:dev
```


### Start the Customer UI
```
git clone https://github.com/artemv01/ngx-storefront.git
cd ngx-storefront
cp .env.example .env
# Open the .env file with your favorite  text editor (in this example vim)
# Set the required params as per the documentation in .env file
vim .env
npm install
npm run start
```


## Get in touch

If you’d like to chat, please find me on Twitter [https://twitter.com/artemv01](https://twitter.com/artemv01) or send me an email arteitip [at] gmail [dot] com


## Contributing

If you are interested and have any ideas for features, please open an [issue](https://github.com/artemv01/ngx-storefront/issues/new).


## Credits

The Customer UI was inspired by [woocommerce/storefront](https://github.com/woocommerce/storefront).


## License

Feel free to use my code on your project. It would be great if you put a reference to this repository.

[MIT](https://opensource.org/licenses/MIT)


[tailwind]: https://tailwindcss.com/
[angular]: https://angular.io/
[scss]: https://sass-lang.com/
[demo]: src/assets/img/pc_demo.gif
[ngx-storefront]: https://github.com/artemv01/ngx-storefront
[ngx-storefront-api]: https://github.com/artemv01/ngx-storefront-api