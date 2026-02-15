# Breadcrumb

## backlog

## current commit

- [ ] work on fines tests
  - i think the finesService is done (except for get all fines from a user) so i just need to finish up working on the fineRouter.test.ts bc they are not totally done yet

## future commit tasks

- [ ] work on the other todos and fixmes
- [ ] setup scid for books (tho i think scid may not be needed)
- [ ] endpoints shouldn't error when resource is not found, they instead should return empty or undefined
- [ ] make _ids optional for all endponts
- [ ] update all controllers to have specific request types (like the create handlers do eg specifiy the parameter dictionary)
- [ ] removed user schema so update db.test.ts

## maybe create an issue for

- embed the requests in the books
  - mongodb doesn't have a CosmosDB partition key equivalent so what I'm doing with scid is not actually useful
