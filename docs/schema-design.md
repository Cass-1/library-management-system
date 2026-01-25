# Schema Design

## Workload

### Entities

- #### Book

- #### Author

- #### User

  - member
  - staff member
  - library manager
  - admin

- #### Member Requests?

- borrow request
- renewal request
- reservation request

- #### Staff/Management Requests?

  - inter-library loan request
    - this may not be able to be in book requests
  - return request
    - this may just happen on demand and not be a request that would need to be stored

- #### Fines

### Reads and Writes

## Relationships

### User and Book

(1:N)

- A user can have many books. A book cannot have many users as each book will be treated as a scarce object (even if it is an EBook)

Model

- book reference array in user to book

### User and Request

(1:N)

- A user can have many requests, but every request has only one user.

Model

- reference in request to user
  - this may only make sense if a user can have unlimited requests bc otherwise i would have to scan the requests collection to see how many requests a user has made. It may be better to have request IDs stored in the user
  - **there is also the issue of once a request is processed it would be deleted so maybe request shouldn't be an entity it should be an interface in the code**.

### User and Fines

(1:N)

- A user can have many fines, but a fine has only one user.

Model

- embed fines in user?

### Book and Request

(1:N)

- A book can have many requests. A request will only be able to be for one book

Model

- reference in request to book

### Book and Fine

(1:1)

- A fine is for a specific book

Model

- reference in book to fine

## Design Patterns

- Limit of 20 books per user
- Limit of 5 of each request type per user?
- As a user can only have 20 books per user a user can never have more than 20 fines
