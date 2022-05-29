# Learn About Monorepos and Auth(z) With NX and Auth0

This is a small demo project to play around different technologies. I have a lot
of different things I wish to paly with, so this repository serves the purpose
of giving me a playground for this. Primary focus of this project is to learn more
about:

- Building APIs using Express
- Authentication and Authorization using OAuth 2.0 + OIDC
- Monorepos using either NX or Turborepo

Additionally, I get a playground to toy with node build technologies and frontend frameworks
i.e. Next JS, Angular etc.

## The Project

There are two different services:

- `fe/`: an express SSR generated site. This uses EJS for html templating
- `items-api/`: an express RESTful API for serving items

This example uses Auth0 for authentication and authorization between these two services. I'm following a YouTube video
made by the Auth0 team here: <https://www.youtube.com/watch?v=jFitx8gf7rA>.

## Up and Running

This will change after NX has been added. For now, check the READMEs in the two
sub projects:

- [Frontend](services/fe/README.md)
- [Items API](services/items-api/README.md)
