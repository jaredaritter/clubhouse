# Virtual Clubhouse

Details: Authentication and security mini-project from TOP. This project utilizes PassportJS and sessions to implement a local strategy authentication system. This allows filtering of who can see and post content in the virtual clubhouse.

Use: Register a user name and password. After registering you will be able to sign in and post messages.

## Core To Do

- [x] Implemented basic error handling in case username already present in the database.
- [x] Implement bcryptjs functionality to handle passwords securely.
- [x] Give user error message if attempting to register with username that is already in use.
- [x] Add express-validator for validation and sanitization
- [x] Add `confirmPassword` field to sign-up
- [x] Get join page working
- [x] Get message page working
- [x] Decide the best way to hold message data. Currently leaning towards storing User object in Message instead of the other way around
- [x] Display all member messages on the home page, but only show the author and date of the messages to other club-members
- [ ] Add an optional field to the user model called Admin and then add the ability to delete messages, but only allow users who have admin == true to see the delete-button and delete messages. You’ll need to add a way to actually mark a user as an ‘admin’ so either add another secret pass-code page, or just put an “is admin” checkbox on the sign-up form.
- [ ] By this point, anyone who comes to the site should be able to see a list of all messages, with the author’s name hidden. Users should be able to sign-up and create messages, but ONLY users that are members should be able to see the author of each message. Finally, you should have an Admin user that is able to see everything and also has the ability to delete messages. Obviously this is a simple and silly little app, but the things you are practicing (creating and authenticating users and giving users different abilities and permissions) are things that will be very useful to you!

### Non-essential To Do

- [ ] Return submitted values when error on posting form data
- [ ] Separate authenticated and non-authenticated routes. Check early on whether request is authenticated so that the check is not required in each private controller.
- [ ] Notify user if they are already a member when reaching join page.
- [ ] Pretty up index page messages and the author/date formatting
- [ ] Project is not specific on who can create messages. It says when user is logged in show button but feels more appropriate for members to comment. Currently all users can create messages.
