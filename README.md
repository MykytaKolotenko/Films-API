# Title

Little test project in one famouse company.

## Description

This project use modern technolgy to show my junior power. Also you can use this API to create you own site.

- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

## Installation

1. Clone project
2. Run `npm install`
3. After that you need to create `.env` file in the root. With this poles:
   - `PORT` - port where the server opens
   - `URI_MONGO` - connect to your `MongoDB` with login and password
   - `SALT_PAS` - hash ratio
   - `JWT_SECRET` - secret for user jwt token
     **if you don't want do this you can copy my test environment, but it can be deleted**
     `PORT = 3000`
     `URI_MONGO = mongodb+srv://Nikita:Nikita@cluster0.twzwgel.mongodb.net/films`
     `SALT_PAS = 10`
     `JWT_SECRET = really`

## Usage

You can add some code to make it better or it can be a part of microservice architecture in app.

### Endpoints

#### Films endpoints

- ###### `GET:/api/films` - returns all films from bd.

  **Query params** 1.`page` - number of page, default `1` 2. `per-page` - limit if items, default `5`

  **Response array of:**

        "director": "name",
        "title": "title",
        "date": "String",
        "owner": "id",
        "id": "id"

- ###### `GET:films/:id` - returns film

  **Response:**

        "director": "name",
        "title": "title",
        "date": "String",
        "owner": "id",
        "id": "id"


- ###### `GET/api/films/user/:userId` - returns user's films

  **Query params** 1.`page` - number of page, default `1` 2. `per-page` - limit if items, default `5`

  **Response array of:**

        "director": "name",
        "title": "title",
        "date": "String",
        "owner": "id",
        "id": "id"

- ###### `POST:/api/films` - create new film. **User must be authorized**

  **Request:**

        "director": "name",
        "title": "title",
        "date": "DD.MM.YYYY "


  **Response:**

        "director": "name",
        "title": "title",
        "date": "String",
        "owner": "id",
        "id": "id"


- ###### `PATCH:/api/films` - update current film. **User must be authorized**

  **Request:**
  _You can send separate field_

        "director": "name",
        "title": "title",
        "date": "DD.MM.YYYY "

  **Response:**

        "director": "name",
        "title": "title",
        "date": "String",
        "owner": "id",
        "id": "id"

- ###### `DELETE:/api/films` - delete film. **User must be authorized**

  **Response:**

        "director": "name",
        "title": "title",
        "date": "String",
        "owner": "id",
        "id": "id"


#### User endpoints

- ###### `POST:/user/register` - Create user.

  **Request:**

        "username": string,
        "email": string,
        "password": "string "


  **Response:**

        "message": string


- ###### `GET:/user/login` - Login user.

  **Request:**

        "email": string,
        "password": "string "


  **Response:**

        "username": string,
        "email": string,
        "id": string,
        "token": JWT token


- ###### `GET:/user/current` - Get the user info by token. **User must be authorized**

  **Request:**

        JWT token


  **Response:**

        "username": string,
        "email": string,
        "id": string,


- ###### `GET:/user/logout` - Logout user. Delete JWT token
  **Request:**
        JWT token

## Technologies Used

Node, Express, Mongoose, Morgan, Joi and etc.
