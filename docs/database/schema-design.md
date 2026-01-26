# Schema Design

## Workload

### Entities

#### Book

| Attribute            | Type                               | Reasoning (if needed)              |
|----------------------|------------------------------------|------------------------------------|
| isbn                 | string                             |                                    |
| author               | string                             |                                    |
| genre                | string                             |                                    |
| type                 | enum (print or eBook)              |                                    |
| publisher            | string                             |                                    |
| condition            | enum (good, medium, bad, very bad) |                                    |
| active_reservation   | reservation                        | The active reservation             |
| pending_reservations | reservation[]                      | A list of the pending reservations |

#### User

| Attribute       | Type                                         | Reasoning/Description (if needed)                                                                                                                                                                                 |
|-----------------|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| role            | enum (member, staff, library_manager, admin) |                                                                                                                                                                                                                   |
| name            | string                                       |                                                                                                                                                                                                                   |
| email           | string                                       |                                                                                                                                                                                                                   |
| age             | int                                          |                                                                                                                                                                                                                   |
| enrollment date | date                                         |                                                                                                                                                                                                                   |
| fines           | fine[]                                       | Embedding fines simplifies lookup and database design. Fines do not need to be accessed outside of a user                                                                                                         |
| books           | array of objects                             | An object containing the book _id, name, and the due date. Makes calculating fines simpler                                                                                                                        |
| reservations    | array of objects                             | Contains information about the reservations that will be displayed. This will be created whenever a user asks for a request and will be deleted whenever the user gets the book. Book name, reservation time span |

#### Fine

| Attribute  | Type     | Reasoning/Description (if needed)                                           |
|------------|----------|-----------------------------------------------------------------------------|
| total_cost | double   |                                                                             |
| daily_rate | double   | The cost per day. This is so that fines can be at different rates if needed |
| book       | book _id |                                                                             |

#### Reservation

| Attribute            | Type | Reasoning/Description (if needed) |
|----------------------|------|-----------------------------------|
| book_id              | _id  |                                   |
| user_id              | _id  |                                   |
| request_date         | date |                                   |
| reservation_end_date | date |                                   |

### Reads and Writes

| Entity            | Type  | Operation                    | Use Cases/Reason for Operation                                                      | Frequency |
|-------------------|-------|------------------------------|-------------------------------------------------------------------------------------|-----------|
| Book              | Read  | Fetch book details           | user view books they have, book search                                              | Very High |
| Reservation       | Read  | Fetch reservation's duration | in order to prevent over-booking                                                    | Very High |
| Reservation, Book | Read  | Fetch a book's reservation   | reservation request, renewal request, staff issued a recall                         | Very High |
| User              | Read  | Fetch user details           | user landing page                                                                   | High      |
| Reservation       | Write | Create reservation           | reservation request                                                                 | High      |
| User, Book        | Read  | Fetch a user's books         | user looking at their books                                                         | High      |
| Reservation, User | Read  | Fetch a user's reservation   | user viewing their reservation                                                      | High      |
| Fine              | Write | Create fine                  | overdue book                                                                        | Medium    |
| Fine, User        | Read  | Fetch a user's fines         | user looking at their fines                                                         | Medium    |
| Book              | Write | Update book details          | staff updating book                                                                 | Low       |
| Book              | Write | Create new book              | staff creating book                                                                 | Low       |
| User              | Write | Edit user information        | user updating profile                                                               | Low       |
| User              | Write | Create user                  | registration                                                                        | Low       |
| Reservation       | Write | Delete a reservation         | reservation complete, reservation passed, user ends reservation, staff ends request | Low       |
| Fine              | Write | Delete fine                  | fine was payed                                                                      | Low       |

### Common Operations

## Relationships

| Entities             | Relationship | Model                               | Reasoning                                                                                                                          |
|----------------------|--------------|-------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| User and Book        | 1:N          | User has array of Book references   | A user can have many books. A book cannot have many users as each book will be treated as a scarce object (even if it is an EBook) |
| User and Reservation | 1:N          | Reservation has a reference to User | A user can have many reservations, but every reservation has only one user.                                                        |
| User and Fines       | 1:N          | User has embedded Fines             | A user can have many fines, but a fine has only one user.                                                                          |
| Book and Reservation | 1:N          | Reservation has a reference to Book | A book can have many reservations. A reservation will only be able to be for one book                                              |
| Book and Fine        | 1:N          | Fine has a partial embed of Book    | When a user looks at their fines they don't need to see all information about a book                                               |

## Design Patterns

### Preventing Unbounded Arrays

- Limit of 20 books per user
- Limit of 5 of each reservation type per user?
- As a user can only have 20 books per user a user can never have more than 20 fines

### Patterns Table

| Entity(s) | Pattern     | Reasoning                                                                                                         |
|-----------|-------------|-------------------------------------------------------------------------------------------------------------------|
| User      | Inheritance | There will be different types of users so I will have a role field to differentiate between them                  |
| Book      | Inheritance | There will be two types of books (print and eBook). I will use a type field to differentiate between the two      |

## Notes

User - To store all the user information

reservation - I need a separate reservation collection because I need to go through all active reservations.

Book - To store all the book information

nightly

- look up all books with active reservations
- check if reservation has expired
  - if so, set the active reservation to the next pending reservation
    - notify the user
  - if not, do nothing

## Resources Used

tables generated using <https://www.tablesgenerator.com/markdown_tables>
