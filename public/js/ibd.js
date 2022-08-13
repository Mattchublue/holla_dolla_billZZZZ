const indexedDB= window.indexedDB|| window.mozIndexedDB || window.msIndexedDB

let db;

const request = indexedDB.open('billZZZ', 1);

