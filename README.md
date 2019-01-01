## G Suite Firebase Authentication Demo

A demo of using React and Firebase Authentication to auth only specific G Suite domain. (also mobile-friendly)

### Demo

> The demo is for Kasetsart University (@ku.th) domain

https://ku-authen-demo.firebaseapp.com

### Security Notes

- Keep in mind that this is a client-side action. User can bypass host domain checking (definitely not a normal user) and get sign-up with any Google account, but cannot access your Firebase database if you configure rules properly.
- If you use Firebase Realtime Database or Cloud Firestore to store data that only access by your G Suite domain, you must write a rule to prevent other signed-up user that's not in your G Suite domain access your database.

#### Example rules for Realtime Database

```json
{
  "rules": {
    ".read": "auth != null && auth.token.email.matches(/.*@ku.th$/)",
    ".write": false
  }
}
```

where `ku.th` is your G Suite domain
