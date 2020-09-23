# Leaderboard Example

## Authenticate your Service Account
```javascript
const FlameDB = require("flame.db");
const db = new FlameDB();

db.on("connected", () => {
  console.log("Database Connected");
});

db.authenticate("path/to/serviceAccount");
```

## Getting All Documents from a Collection
```javascript
const FlameDB = require("flame.db");
const db = new FlameDB();

db.on("connected", () => {
  console.log("Database Connected");
});

db.authenticate("path/to/serviceAccount");

// [{id: "collection id", data: {balance: "user's balance"}}]
const documents = await db.getCollection("users") // Get all documents from the collection "users"
```

## Sorting the Array
```javascript
const FlameDB = require("flame.db");
const db = new FlameDB();

db.on("connected", () => {
  console.log("Database Connected");
});

db.authenticate("path/to/serviceAccount");

// [{id: "collection id", data: {balance: "user's balance"}}]
const documents = await db.getCollection("users") // Get all documents from the collection "users"

// Sort from the highest value in the array
const leaderbaord = documents.sort((a, b) => b.data.balance - a.data.balance);
```
