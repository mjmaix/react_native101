React Native and Redux demo with firebase complete with employee management
  
   - does not include USER creation
  
## Setup
  1. Create firebase app named 'manager'
  1. Create user on firebase (ex.: `test@test.com/password`)
  1. Firebase must enable email authentication
  1. Create .env on project root directory with the following properties taken from firebase
```
      API_KEY=
      AUTH_DOMAIN=
      DB_URL=
      PROJECT_ID=
      STORAGE_BUCKET=
      MESSAGING_SENDER_ID=
```
## How to run
  1. `npm install`
  1. `react-native run-ios` or `react-native run-android`
