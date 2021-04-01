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

### Non-essential To Do

- [] Return submitted values when error on posting form data
- [] Separate authenticated and non-authenticated routes. Check early on whether request is authenticated so that the check is not required in each private controller.
