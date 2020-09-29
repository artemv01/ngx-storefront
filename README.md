# An ecommerce system built on Angular & NestJS & TailwindCSS (the Customer Interface part)

Ngx-storefront is an example of an ecommerce system comprising 3 parts: 

*   the Customer Interface (Angular & TailwindCSS & SCSS) [artemv01/ngx-storefront](ngx-storefront)
*   the REST API (NestJS & MongoDB & Mongoose) [artemv01/ngx-storefront-api](ngx-storefront-api)
*   and the Admin Interface (Angular & TailwindCSS & SCSS) coming soon

This is a repository for the customer interface part. It can be used as an example of a modern ecommerce SPA built on Angular. It’s mobile & tablet ready and tested on all modern browsers.

[ngx-storefront]: https://github.com/artemv01/ngx-storefront
[ngx-storefront-api]: https://github.com/artemv01/ngx-storefront-api

## Live demo

The demo can be seen here -> [https://ngx-storefront.artemev.dev/](https://ngx-storefront.artemev.dev/)


## What’s currently missing

The project on its initial stage and there are still some important features that are yet to be implemented. Such as:

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
git clone https://github.com/artemv01/ngx-storefront-backend.git
cd ngx-storefront-backend
cp .env.example .env
# Open .env with your favorite  text editor (in this example vim)
# Set the required params as per the documentation in .env file
vim .env
npm install
npm run start:dev
```


### Start angular dev server
```
git clone https://github.com/artemv01/ngx-storefront.git
cd ngx-storefront
# Open angular config file with your favorite  text editor (in this example vim)
# Make sure _apiUrl is set to the REST API URL
# For example: http://localhost:4200
vim environments/environment.ts
npm install
npm run start
```


## Get in touch

If you’d like to chat, please find me on Twitter [https://twitter.com/artemv01](https://twitter.com/artemv01) or send me an email arteitip [at] gmail [dot] com


## Contributing

If you are interested and have any ideas for features, please open an [issue](https://github.com/artemv01/ngx-storefront/issues/new).


## Credits

The application was inspired by [woocommerce/storefront](https://github.com/woocommerce/storefront).


## License

Feel free to use my code on your project. It would be great if you put a reference to this repository.

[MIT](https://opensource.org/licenses/MIT)
