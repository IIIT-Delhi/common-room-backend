<p align="center">
  <a href="https://common-room.netlify.app/" target="blank"><img src="https://common-room.netlify.app/images/logo.svg" height="200" alt="Common Room Logo" /></a>
</p>

<h1><p align="center">Common Room Backend</p></h1>

## Description

[Common Room](https://common-room.netlify.app/) the backend repository for common-room. The current stack involves the following technologies:
- NestJS 
- MySQL
- Prisma 
- Sequelize
- TypeGraphQL

## Additional Information

[Prisma](https://www.prisma.io/) has been used as the primary database migration tool and for using as the query client for the resolvers. All CRUD based resolvers and mutations have been genrated automatically using the [TypeGraphQL+Prisma](https://github.com/MichalLytek/typegraphql-prisma#readme). Sequilize is used has been used as the secondary ORM for the [admin panel](https://adminjs.co/).

## Configs (Contact current development team to get access)
- .env present in the root directory
- admin.json in src/config
- firebase.json in src/config

## Installation

```bash
$ npm install
```

## Post Installation

```bash
$ yarn prisma generate
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Updating database and Schema

- Follow offical prisma docs to understand the steps required to migrate. ***Never migrate dev in production.***
  - Update schema
  - Run migrate dev or prod based on environment
  - Run prisma generate
- Run the following commands once the database is updated for sequilize to generate the required files.
```bash
$ npm run sequilize
```

## Development Team

- [Sidhant S Sarkar](mailto:sidhant18102@iiitd.ac.in)
- [Ayaan Kakkar](mailto:ayaan18028@iiitd.ac.in)
- [Shashwat Aggarwal](mailto:shashwat18097@iiitd.ac.in)
- [Abhimanyu Jha](mailto:abhimanyu17126@iiitd.ac.in)
