# library-management-system

    This is a library managenent API backend for the management of user and the books

# Routes and the Endpoints

## /users
GET : GET all the list of user in the user
POST : Register the new user to particular system

## /users(id)
GST:get users by their id
PUT:Updating a user by their id
DELETE:deleting a user by their id(if the user still has an any issued book)&&(is there any penalty to be collected)

## /users/subscription-details/(id)
GET:get user subscription by their id
>>Date of subscription
>>Valid till?
>>Fine if any?

## /books
GET:get all the books in the system
POST:inorder to add a new book to system

## /books(id)
GET:get a book by its id
PUT:TO update a book by auther name or some changes by its id
DELETE:Delete a book by its id

## books/issued
GET:get all issued books 

## books/issued/fine
GET:get all issued books with their fine amount

## Subscription plans
>> basic subcription(3 months)
>> standard subcription(6 months)
>> premium subcription(12 months)

>> if a user misses the renewal date then user should be collected with $100
>> if a user misses the subscription then user should pay with $100
>> if a user misses the both renewal and subscription user should be collected with $200

## commands:
npm init
npm i express
npm i nodemon --save-dev

npm run dev (to run)

To restore the node module and package lock json -> npm i/npm install