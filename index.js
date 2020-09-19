const firebase = require('firebase/app')
const FieldValue = require('firebase-admin').firestore.FieldValue
const admin = require('firebase-admin')

class FireDB {
  authenticate(serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    })
  }
  async update(path, data = {}) {
    if(!path) throw new Error("Found no path");
    if (typeof path !== 'string') 
      throw new Error('Invalid path type');
    let db = admin.firestore();
    let fullPath = path.split(/\//g);
    let collection = fullPath[0];
    let document = fullPath[1];
    if(!data) throw new Error("Value required")
    const query = await db.collection(collection).doc(document).get();
    if(!query.exists) {
      throw new Error("Collection doesn't exists")
    }else{
      db.collection(collection).doc(document).update(data)
    }
  }
  async set(path, data = {}) {
    if(!path) throw new Error("Found no path");
    if (typeof path !== 'string') 
      throw new Error('Invalid path type');
    let db = admin.firestore();
    let fullPath = path.split(/\//g);
    let collection = fullPath[0];
    let document = fullPath[1];
    if(!data) throw new Error("Value required")
    const query = await db.collection(collection).doc(document).get();
    if(!query.exists) {
      throw new Error("Collection doesn't exists")
    }else{
      db.collection(collection).doc(document).set(data)
    }
  }
  async new(path, data = {}) {
    if(!path) throw new Error("Found no path");
    if (typeof path !== 'string') 
      throw new Error('Invalid path type');
    let db = admin.firestore();
    let fullPath = path.split(/\//g);
    let collection = fullPath[0];
    let document = fullPath[1];
    if(!data) throw new Error("Value required")
    const query = await db.collection(collection).doc(document).get();
    if(query.exists) {
      throw new Error("Collection already exists")
    }else{
      db.collection(collection).doc(document).set(data)
    }
  }
  async push(path, data) {
    if(!path) throw new Error("Found no path");
    if (typeof path !== 'string') 
      throw new Error('Invalid path type');
    let db = admin.firestore();
    let fullPath = path.split(/\//g);
    let collection = fullPath[0];
    let document = fullPath[1];
    let array = fullPath[2];
    if(!data) throw new Error("Value required")
    if(!array) throw new Error("Array field required")
    const query = await db.collection(collection).doc(document).get();
    if(!query.exists) {
      throw new Error("Collection doesn't exists")
    }else{
      let arr = query.data()[array]
      if(!arr) arr = [];
      arr.push(data)
      db.collection(collection).doc(document).set({
        [array]: arr
      })
    }
  }
  async get(path) {
    if(!path) throw new Error("Found no path");
    if (typeof path !== 'string') 
      throw new Error('Invalid path type');
    let db = admin.firestore();
    let fullPath = path.split(/\//g);
    let collection = fullPath[0];
    let document = fullPath[1];
    const query = await db.collection(collection).doc(document).get();
    if(!query.exists) {
      return undefined;
    }else{
      return query.data();
    }
  }
}

module.exports = FireDB
