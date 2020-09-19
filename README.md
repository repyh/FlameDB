# FlameDB
**FlameDB** is a simple wrapper for Firebase SDK. **FlameDB** only help you connect and write data on your firestore, all data are directly stored into your firestore.

## Installing
1. Install [node.js](https://nodejs.org/en/)
2. run ``npm install flame.db``
3. You can get started working on your project!

## Examples
```javascript
const FlameDB = require("flame.db");
const db = new FlameDB()
// Authenticate Service Account
db.authenticate(path-to-service-account)

// User is the collection, Hyp3r is your document. 
// This will create a new collection.
db.new("user/hyp3r", {discord: "Hyp3r#0001"})

// User is the collection, Hyp3r is your document, and Projects is your array. 
// This will push "FireDB" in "projects" array.
db.push("user/hyp3r/projects", "FireDB")

// This will return documents data as an object.
const data = await db.get("user/hyp3r")

// {discord: "Hyp3r#0001", alive: true}
db.set("user/hyp3r", {discord: "Hyp3r#0001", alive: true})

// {discord: "Hyp3r#1000", alive: true, deserveStar: true}
db.update("user/hyp3r", {discord: "Hyp3r#1000", deserveStar: true})
```

## Connecting to Firebase
1. Visit [firebase](https://firebase.google.com) and make a new account if you haven't.
2. Create a new firebase project then go to **Cloud Firestore** then create a database.
3. Go to **Project Settings** and then click "Service Account" and make a new service account. You will then download a json file.
4. Copy all content from the json file and store it in your project.
5. Initialize your database.
6. You're all done!

## Initialize Database
```javascript
const FlameDB = require("flame.db")
const db = new FlameDB();

db.authenticate("path-to-service-account")

// Code Here
```
