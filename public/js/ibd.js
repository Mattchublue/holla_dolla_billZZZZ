const indexedDB= window.indexedDB|| window.mozIndexedDB || window.msIndexedDB

let db;

const request = indexedDB.open('billZZZ', 1);

request.onupgradeneeded = ({ target }) => {//allows us to add "stores" (collections, tables)
    let db = target.result;
    db.createObjectStore("pending", { autoIncrement: true });
  };
  //grabs reference to db and targets input
  request.onsuccess = ({ target }) => {
    db = target.result;
  };