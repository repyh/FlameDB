const firebase = require('firebase/app');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const admin = require('firebase-admin');

function emitter() {
  if(this.Events[this.Event]) for (let e of this.Events[this.Event]) {
    e();
  }
}

class FlameDB { // bntr
  on(event, listener) {
    if (typeof listener !== "function") throw new Error("Listener can only be a function");
    if (typeof event    !== "string"  ) throw new Error("Event isn't a type of string");  //kalo manggil: baca line 30 ama 31
    
    if (!this.Events) this.Events = {};
    
    if (!this.Events[event]) this.Events[event] = [];
    
    this.Events[event].push(listener);
  }
  authenticate(serviceAccount) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      if (!this.Events) this.Events = {};
      emitter.bind({ Events: this.Events, Event: "connected" })();
    } catch(e) {
      throw new Error(e);
    }
  }
  async getCollection(collection) {
    let db = admin.firestore();
    if(!collection) throw new Error("Missing Collection");
    const query = await db.collection(collection).get();
    let documents = [];
    if(!query.size) return undefined;
    query.forEach(q => {
      documents.push({id: q.id, data: q.data});
    })
    return documents
  }
  async update(path, data) {
    if(!path) throw new Error("Found no path")
    let db = admin.firestore();
    let fullPath = path.split(/\//g);
    let collection = fullPath[0];
    let document = fullPath[1];
    if(!data) throw new Error("Value required")
    if(typeof data !== 'object') throw new Error("Data isn't an object")
    const query = await db.collection(collection).doc(document).get();
    if(!query.exists) {
      throw new Error("Collection doesn't exists")
    }else{
      db.collection(collection).doc(document).update(data)
    }
  }
  async set(path, data) {
    if(!path) throw new Error("Found no path")
    let db = admin.firestore();
    let fullPath = path.split(/\//g);
    let collection = fullPath[0];
    let document = fullPath[1];
    if(!data) throw new Error("Value required")
    if(typeof data !== 'object') throw new Error("Data isn't an object")
    const query = await db.collection(collection).doc(document).get();
    if(!query.exists) {
      throw new Error("Collection doesn't exists")
    }else{
      db.collection(collection).doc(document).set(data)
    }
  }
  async create(path, data) {
    if(!path) throw new Error("Found no path")
    let db = admin.firestore();
    let fullPath = path.split(/\//g);
    let collection = fullPath[0];
    let document = fullPath[1];
    if(!data) throw new Error("Value required")
    if(typeof data !== 'object') throw new Error("Data isn't an object")
    const query = await db.collection(collection).doc(document).get();
    db.collection(collection).doc(document).set(data)
  }
  async push(path, data) {
    if(!path) throw new Error("Found no path")
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
    if(!path) throw new Error("Found no path")
    let db = admin.firestore();
    let fullPath = path.split(/\//g);
    let collection = fullPath[0];
    let document = fullPath[1];
    const query = await db.collection(collection).doc(document).get();
    if(!query.exists) {
      throw new Error("Collection doesn't exists")
      return;
    }else{
      return query.data();
    }
  }
}

module.exports = FlameDB