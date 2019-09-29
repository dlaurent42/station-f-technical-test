# STATION F - BOOK A MEETING ROOM

Booking a meeting room has never been easier.

## TABLE OF CONTENTS
- [Getting Started](##GETTING&#32;STARTED)
  * [API Installation](###API&#32;INSTALLATION)
  * [Client Installation](###CLIENT&#32;INSTALLATION)
- [API](##API)
  * [Database](###DATABASE)
  * [Securing](###SECURING)
  * [Returned Data](###RETURNED&#32;DATA)
  * [Folder Organization](###API&#32;FOLDER&#32;ORGANIZATION)
- [Client](##CLIENT)
  * [Libraries](###LIBRARIES)
  * [Authentication](###AUTHENTICATION)
  * [Routes](###ROUTES)
  * [Folder Organization](##CLIENT&#32;FOLDER&#32;ORGANIZATION)

---
## GETTING STARTED

### API INSTALLATION

#### Install packages

To install packages, please run the following command.

```
npm install
```

#### Install and feed database

The database installation is performed using `api/scripts/start.sh` script which is called automatically.

To ensure the database will be installed by the starting script, please check the `DATABASE_INIT` variable from the `api/.env` file is correctly set to `false`.

The database is fed using data files foundable in `api/data` folder.

#### Run development server

Please note in development mode, all API [security guards](#SECURING) are disabled.
```
npm run dev
```

#### Run production server

Please note in production mode, all API [security guards](#SECURING) are enabled.
```
npm run prod
```

#### Run linter

ESLint configuration extends airbnb-base. However, some rules have been modified.
```
npm run lint
```

#### Run unit tests

Due to short time, only very few tests have been written. Those tests can be run using following command.
```
npm test
```

To get an HTML coverage report, following command can be used.
```
npm run test:coverage
```
---
### CLIENT INSTALLATION

#### Install packages

To install packages, please run the following command.

```
npm install
```

#### Run development server

To run development server, please run the following command.
```
npm run serve
```

#### Run production server

To run development server, you will need `serve` package. To install it, globally please run the following command.
```
npm i -g serve
```

Once `serve` installed, you are able to run the production server using the following command.
```
npm run build && serve -s dist
```

#### Run linter

ESLint configuration extends airbnb-base. However, some rules have been modified.
```
npm run lint
```

---
## API

REST API has been developped using NodeJS and Express. It communicates with a Mongo database.

Postman documentation of the API can be found [here](https://documenter.getpostman.com/view/5992585/SVtN2qxb?version=latest) (includes examples).

---
### DATABASE


A Mongo database has been used. This database includes 4 models which can be found in `api/src/models`. Each model contains static methods to verify data. Those methods are called by routes following needs.

Database calls are performed using helpers (`api/src/helpers/mongo`). Those helpers are not dependant of the model so it adds a level of abstraction.

#### User model [firstname, lastname, username, email, password, salt, role]

It is used in authentication system by client server.

Users model is refered in *reservations* model.

On database initialization, model is fed based on `api/data/users.json` (**password is: awesome**).

#### Equipments model [name]

It lists all equipments.

Equipments model is refered in *rooms* model.

On database initialization, model is fed based on `api/data/rooms.json`.

#### Rooms model [name, description, capacity, *equipments*]

It lists rooms.

Rooms model is refered in *reservations* model.

On database initialization, model is fed based on `api/data/rooms.json`. 

#### Reservations model [from, to, duration, *room*, *user*]

It lists all reservations and is the most trickiest model since it manipulates dates. Consequently, API routes referring to this model contain more logic than others.

---
### SECURING

The current API has 2 safety guards: cors and auth0.

#### Cors

The first level of securing corresponds to cors configuration which can be found in `api/src/config/constants/cors.js`.

In `production` mode, a white list is set. Only authorized URLs can hit the API.

In `development` mode, this whitelist is by-passed.

#### Auth0

The second level of securing corresponds to **auth0** and **scope**.

When a user logs in, the API returns two JSON Web Token with expiration date, one is used to access the database (access-token) while the other one is consummed to refresh those tokens (refresh-token). Both token verification and creation are performed using helpers which can be found in `api/src/helpers/jsonwebtoken`.

Moreover, all routes do not have the same authentication level. For example, to log in, no access token is required but to fetch rooms an access token is required (and verified by API). A third scope level is `ADMIN`. If a route has `ADMIN` level, it cannot be accessed in `production`.

Both access-token and scope are verified using a **middleware**.

Resources:
-  scope definition: `api/src/config/constants/scope.js`
-  jwt configuration: `api/src/config/constants/jwt.js`
-  jwt helpers: `api/src/helpers/jsonwebtoken`
-  middleware: `api/src/middlware/auth.js`

---
### RETURNED DATA

Whatever the request, the response format is the same.

#### HTTP Status Codes 

The API returns different HTTP status code depending on the following cases.

##### 200 OK

Everything went well.

##### 401 Unauthorized

User has tried to reach endpoint with an expired token.

##### 403 Forbidden

User has tried to reach endpoint without correct level of authentication.

##### 404 Not Found

Route cannot be found.

##### 422 Unprocessable Entity

Input data is missing or not well formatted.

##### 500 Internal Server Error

Something went wrong on back-end side.

#### Response Data

In case of HTML status code 200, the API always return data formatted as follow.

```
{
  success: true | false,
  payload: {
    ...
  },
}
```

---
### API FOLDER ORGANIZATION

```
API
  |- DATA            : database feed
  |- DATABASE        : database itself (automatically generated)
  |- SCRIPTS         : scripts used on npm start
  |- SRC
    |- CONFIG        : API configuration (including router)
    |- HELPERS       : mongo and jwt helpers
    |- MIDDLEWARE    : authentication middleware
    |- MODELS        : mongo models
    |- ROUTES        : API routes
      |- AUTH        : /auth [getRefresh]
      |- EQUIPMENTS  : /equipments [delete, get, post, put]
      |- RESERVATIONS: /reservations [delete, get, post, put]
      |- ROOMS       : /rooms [delete, get, getSlots, post, put]
      |- USERS       : /users [get, getId, getLogin, post]
    |- UTILS         : some helpers

```

---
## CLIENT

Client has been developped using VueJS.

---
### LIBRARIES

In order to ease development, some libraries have been installed.

#### Date manipulation

To ease date manipulation, `momentjs` library has been used. Its documentation is [here](https://momentjs.com/).
* moment
* moment-range
* moment-timezone

#### Requests

`axios` library has been used to send request to API. It has been configured to refresh automatically request. Its document is [here](https://github.com/axios/axios).

#### UI

`font-awesome` has been used for icons since it provides a wide range of easy-to-use icons.

`vuematerial` UI library has been considered in first place. However, its still in construction and a lot of features was missing (documentation [here](https://vuematerial.io/)). Consequently, I changed my mind and decided to use a - quite awesome - chinese library: `muse-ui` (documentation in english [here](https://muse-ui.org/#/en-US/)).

---
### AUTHENTICATION

The application securing is based on 2 principles:
- navigation safeguard
- axios configuration

#### Navigation Safeguard

The application's router has a `beforeEach` rule (can be found in `client/src/components/routes/index.js`).

Before entering a page, user will go through the navigation guard which will check if the page requires an authentication and if user is authenticated.

Consequently, a user cannot enter `login` page if he is already authenticated as he cannot enter `dashboard` page if he is not authenticated.

#### Axios Configuration

`axios` has been configured (`client/src/services/axios`) with an interceptor on request and another one on response.

##### Request interceptor (for info)

`axios` will edit each outgoing request and set headers with a `bearer token` based on the one stored in `local storage`.

##### Response interceptor (for safety)

`axios` will intercept each response incoming looking for errors. For each response error, it will look at http status code to assess if it is due to `access-token`. If it is the case, it will ask the API to refresh the `access-token` using the `refresh-token`. If it is failed, user is redirected to `login` page and his storage is cleared.

---
### ROUTES

The application contains 4 routes (404 are redirected to `/`).

#### Login
##### Authentication: false

Before accessing the booking system, each user has to be authenticated. Once authenticated, he will receive [tokens](####Axios&#32;Configuration) used to fetch, modify, post data to the API.

User authentication is persistent (`client/src/stores/modules/user/actions.js [ACTION_AUTOLOGIN]`).

User data is managed using global state (`Vuex`).

If API is correctly [setup](###API&#32;INSTALLATION), you can log in using `dlaurent` or `admin` as `username` and `awesome` as password.

![login](https://github.com/dlaurent42/station-f-technical-test/blob/dev/documentation/login.jpg)

#### Dashboard
##### Authentication: true

`Dashboard` page displays different statistics based on user passed reservations. Once logged in, user is redirected here.

![dashboard](https://github.com/dlaurent42/station-f-technical-test/blob/dev/documentation/dashboard.jpg)

#### Booking
##### Authentication: true

`Booking` page is the reservation module. User has to filter rooms by selecting at least a datetime and a duration. He can check dynamically available rooms.

![booking](https://github.com/dlaurent42/station-f-technical-test/blob/dev/documentation/booking.jpg)

#### Reservations
##### Authentication: true

`Reservations` page permits the user to consult and delete his reservations.

![reservations](https://github.com/dlaurent42/station-f-technical-test/blob/dev/documentation/reservations.jpg)

---
### CLIENT FOLDER ORGANIZATION

Initially, project structure was based on `components` vs `views` model. However, I prefer a project structure based on features / routes so I changed project structure during the development.

```
CLIENT
  |- PUBLIC           : HTML and static assets such as favicon
  |- SRC
    |- ASSETS         : images
    |- COMPONENTS     : all .vue files
      |- NAVIGATION   : header, footer
      |- ROUTES       : router + a folder by route
      |- UI           : components for design
    |- EVENT_BUSES    : communication between components that are not directly connected
    |- MIXINS         : just a mixin to modify page title, registered globally
    |- SERVICES       : contains axios configuration
    |- STORE          : user global state
    |- UTILS
```
