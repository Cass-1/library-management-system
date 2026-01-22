# Functional Requirements
## 1. User Registration and Verification
### 1.1 Allow New Users to Register
### 1.2 Allow Registered Users to Login
## 2. User Authorization (RBAC)
### 2.1 Members
Can access reservations and renewals
### 2.2 Workers
Can access recalls, returns, and manage inter-library loans
### 2.3 Managers
Can access statistics
### 2.4 Admin
Not sure about yet
## 3. Charge and Discharge Books
Figure out how to use DRM or another method to manage the distribued eBooks
- i will use public domain works
    - double check that it is legal to host and distribute public domain works
    - double check that it is legal to use DRM with public domain works
### 3.1 Mark Books Charged
### 3.2 Mark Books Discharged
## 4. Control Methods for Circulation
### 4.1 Reminders
Send reminders to members who's books are nearing the due date
### 4.2 Reservations
Allow members to reserve books (limit number of reservations a person can make)
### 4.3 Recalls
Libraries can request books or other media can be returned early
### 4.4 Renewals
Allow for members to renew (a limited number of times) and have an approval prosses that is automated based on if there are reservations, inter-library loans, or an active recall
### 4.5 Inter-Library Loans
Havent decided if this can be done by Members or have some request system for new books that we can then get through inter-library loans
### 4.6 Fines
#### 4.6.1 Track Fines
Charge fines if book is past due and have different fines for age (lower for kids and elders)
#### 4.6.2 Limit Members with Outstanding Fines
Don't allow members with fines to reserve new books or issue renewals for the book they are being fined for
### 4.7 Book Requests
Allow members to request for new books and track which books are requested the most
Don't allow members to spam requests
## 5. Track Circulation Statistics
### 5.1 Track Membership Trends
#### 5.1.1 Track Age of Members
#### 5.1.2 Track Age of Enrollment
### 5.2 Track Borrowing Trends
#### 5.2.1 Track Popular Authors
#### 5.2.2 Track Popular Genres
#### 5.2.3 Track Popular Subjects
## 6. Remove Members 
Remove members after years of inactivity
## 7. Search and Filter Inventory
### 7.1 Propper Tagging of Inventory
Each item must have corrent tags to enable searchability
## 8. EBook Reading
- have a user specific page that allows them to 
    1. view all checked out eBooks
    2. be able to read checked out eBooks
## 9. Add/Remove Books
Be able to add or remove books to the catalouge
## Resources
https://lis.academy/management-of-library-and-information-centre/library-circulation-manage-borrowing-returns/
# Nonfunctional Requirements
## 1. Security and Data Protection
- protect env variables with infisical
- keep information about users on a need to know basis
    - eg a users address or email may not need to be displayed to workers
- do some research on data security and mongoDB
## 2. Concurrency
Prevent concurrent bookings
- use mongoDB transactions so ACID is followed
## 3. Error Handling and Failover Support
- have robust test cases in order to test both
## 4. Scalability
- NoSQL
- design the database with scalability in mind
    - avoid common antipatterns (eg unbounded array)
- need to determine if i can store eBooks in MongoDB or if I need an alternate solution