# Breadcrumb

## backlog

-

## current commit task

-

## future commit tasks

### priority

- [ ] write unit tests for infisical and backend server to ensure that when environment variables are missing the program responds as intended
- [ ] work on the other todos and fixmes
- [ ] endpoints shouldn't error when resource is not found, they instead should return empty or undefined
- [ ] make _ids optional for all endponts
- [ ] fix db and unit tests
  - [ ] removed user schema so update db.test.ts

### other

- [ ] decouple the database class from mongodb
- [ ] setup scid for books (tho i think scid may not be needed)
- [ ] update all controllers to have specific request types (like the create handlers do eg specifiy the parameter dictionary)
  
## maybe create an issue for

- embed the requests in the books
  - mongodb doesn't have a CosmosDB partition key equivalent so what I'm doing with scid is not actually useful
