# Breadcrumb

so the question is is this a write heavy or read heavy workload. bc if it is read heavy it may make more sense to have both books and users have embedded requests as well as a seperate request collection. Especially since users are limited on the number of requests they can have. However, a book can have unlimited requests. So maybe a book just has a next time available date. How will i handle someone cancelling their reservation

so yes to embedding in users? if a user makes a reservation request will they check it at least once. If they check it more than once there will be more reads than writes for every request. but if any person cancels their reseration requests i have to go to all users that are in the line and update their request lists

my brain is starting to melt thinking abt this database stuff, i can feel myself getting less sharp. i think i need to take a break and work on soomething that is less brainpower. I'm thinking working on the setting up login and user verification tasks. as well as choosing a react library to use.
