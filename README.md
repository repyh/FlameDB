# FireDB
**FireDB** is a simple wrapper for Firebase SDK. **FireDB** only help you connect and write data on your firestore, all data are directly stored into your firestore.

## Examples
```javascript
const FireDB = require("FireDB");
const db = new FireDB()
db.authenticate(path-to-service-account) // Authenticate Service Account

db.new("user/hyp3r", {discord: "Hyp3r#0001"}) // User is the collection, Hyp3r is your document. This will create a new collection.

db.push("user/hyp3r/projects", "FireDB") // User is the collection, Hyp3r is your document, and Projects is your array. This will push "FireDB" in "projects" array.

db.get("user/hyp3r") // This will return documents data as an object.

db.set("user/hyp3r", {discord: "Hyp3r#0001", alive: true}) // {discord: "Hyp3r#0001", alive: true}

db.update("user/hyp3r", {discord: "Hyp3r#1000"}) // {discord: "Hyp3r#0001", alive: true}
```

## Connecting to Firebase
1. Visit [firebase](https://firebase.google.com) and make a new account if you haven't.
2. Create a new firebase project then go to **Cloud Firestore** then create a database.
3. Go to **Project Settings** and then click "Service Account" and make a new service account. You will then download a json file.
4. Copy all content from the json file and store it in your project.
5. Initialize your database by typing 
```javascript
const FireDB = require("FireDB");
const db = new FireDB()

db.authenticate(path-to-service-account)
```
6. You're all done!
