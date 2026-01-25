# Breadcrumb

continue the schema design

im not sure if requests are an entity. bc they may just be transient, but they will be processed using a queue. So maybe it is instead just data that will be sent and will be processed into a get or post request (eg get a book). but im not sure tbh

maybe use a computed pattern for a user's total fines?

- i think this is a bad idea bc fines change daily? but i guess you could compute at midnight

Also it is ok for my schema design to not be the best of the bat since it is the first time i am designing one in a while

I want to think over the schema for a while before searching the internet to see if i can find some example of a NoSQL library management system

you know maybe new-book-requests would be their own entity bc those would stick around. then every night you could count up the recommendations? not sure
