# Schema Design

## Workload

### Entities

| Entity  | Description                                   | Child Entities                               |
|---------|-----------------------------------------------|----------------------------------------------|
| Book    | A representation of a book                    |                                              |
| User    | Describes a user of the system                | member, staff member, library manager, admin |
| Request | Describes a request for a book made by a user | reservation, renewal                         |
| Fine    | Describes a fine that a user has for a book   |                                              |

### Reads and Writes

| Entity        | Type  | Operation                | Use Cases/Reason for Operation                                          | Frequency |
|---------------|-------|--------------------------|-------------------------------------------------------------------------|-----------|
| Book          | Read  | Fetch book details       | user view books they have, book search                                  | Very High |
| Book          | Write | Update book details      | staff updating book                                                     | Low       |
| Book          | Write | Create new book          | staff creating book                                                     | Low       |
| User          | Read  | Fetch user details       | user landing page                                                       | High      |
| User          | Write | Edit user information    | user updating profile                                                   | Low       |
| User          | Write | Create user              | registration                                                            | Low       |
| Request       | Write | Create request           | reservation request, renewal request                                    | Very High |
| Request, User | Read  | Fetch a user's requests  | user viewing their requests                                             | High      |
| Request, Book | Read  | Fetch a book's requests  | reservation request, renewal request, staff issued a recall             | High      |
| Request       | Write | Delete a request         | request complete, request passed, user ends request, staff ends request | Very Low  |
| Request       | Write | Fetch request's duration | in order to prevent over-booking                                        | High      |
| Fine          | Write | Create fine              | overdue book                                                            | High      |
| Fine          | Write | Delete fine              | fine was payed                                                          | Low       |
| Fine, User    | Read  | Fetch a user's fines     | user looking at their fines                                             | High      |

## Relationships

| Entities         | Relationship | Model                             | Reasoning                                                                                                                          |
|------------------|--------------|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| User and Book    | 1:N          | User has array of Book references | A user can have many books. A book cannot have many users as each book will be treated as a scarce object (even if it is an EBook) |
| User and Request | 1:N          | Request has a reference to User   | A user can have many requests, but every request has only one user.                                                                |
| User and Fines   | 1:N          | User has embedded Fines           | A user can have many fines, but a fine has only one user.                                                                          |
| Book and Request | 1:N          | Request has a reference to Book   | A book can have many requests. A request will only be able to be for one book                                                      |
| Book and Fine    | 1:N          | Fine has a partial embed of Book  | When a user looks at their fines they don't need to see all information about a book                                               |

## Design Patterns

- Limit of 20 books per user
- Limit of 5 of each request type per user?
- As a user can only have 20 books per user a user can never have more than 20 fines

I think outlier pattern for reservations? I think there will be a few books with lots of reservations

## Resources Used

tables generated using <https://www.tablesgenerator.com/markdown_tables>
