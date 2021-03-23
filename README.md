# Virtual Clubhouse

Details: Authentication and security mini-project from TOP. This project utilizes PassportJS and sessions to implement a local strategy authentication system. This allows filtering of who can see and post content in the virtual clubhouse.

Use: Register a user name and password. After registering you will be able to sign in and post messages.

## To Do

- [x] Implemented basic error handling in case username already present in the database.
- [x] Implement bcryptjs functionality to handle passwords securely.
- [ ] Give user error message if attempting to register with username that is already in use.
- [x] Add express-validator for validation and sanitization
- [ ] Add `confirmPassword` field to sign-up
