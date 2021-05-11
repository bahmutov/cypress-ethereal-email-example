# cypress-ethereal-email-example
[![ci status][ci image]][ci url] [![badges status][badges image]][badges url] [![renovate-app badge][renovate-badge]][renovate-app] ![cypress version](https://img.shields.io/badge/cypress-7.2.0-brightgreen) [![cypress-ethereal-email-example](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/v1m866/main&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/v1m866/runs)

> Using an external Ethereal email inbox and Sendgrid to test emails

**Note:** if you are using an SMTP server directly to send emails, take a look at [cypress-email-example](https://github.com/bahmutov/cypress-email-example) repository where we spawn our own SMTP server right from the Cypress during tests.

## Install and run

This application uses Sendgrid to send emails, thus you need to configure an account and expose it via environment variables

```
SENDGRID_HOST=smtp.sendgrid.net
SENDGRID_PORT=465
SENDGRID_USER=
SENDGRID_PASSWORD=
# the same as verified sender
SENDGRID_FROM=
```

The above variables are only needed for the `npm start` process, as Cypress creates its own temporary email [Ethereal email inbox](https://ethereal.email/).

```shell
$ npm install
$ npm start
# from another terminal
$ npx cypress open
# click the spec.js
```

[ci image]: https://github.com/bahmutov/cypress-ethereal-email-example/workflows/ci/badge.svg?branch=main
[ci url]: https://github.com/bahmutov/cypress-ethereal-email-example/actions
[badges image]: https://github.com/bahmutov/cypress-ethereal-email-example/workflows/badges/badge.svg?branch=main
[badges url]: https://github.com/bahmutov/cypress-ethereal-email-example/actions
[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
