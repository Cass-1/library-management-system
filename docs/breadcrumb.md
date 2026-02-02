# Breadcrumb

next steps

- [x] decide if i want a service layer
  - i do
- [ ] write tests
  - I think that i should have controllers and services, and when testing the controllers I can just mock the services. This way I don't have to pass in a database and then switch it out when I'm testing (<https://medium.com/@vihangamallawaarachchi.dev/unit-testing-your-node-js-express-typescript-backend-c25761bbedc9>)
  - I think this also lends itself to testing the services where I can test these with a mock database?
    - i think this makes sense I want to test the services and then have separate integration tests where I test the endpoints working properly
- [ ] change api routes to not have verbs in them
