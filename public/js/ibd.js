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
    // check if app is online before reading from database
    if (navigator.onLine) {
      checkDatabase();
    }
  };

  request.onerror = function(event) {
    console.log("Holy Cow there is an issue! " + event.target.errorCode);
  };
  function saveRecord(record) {
    const transaction = db.transaction(["pending"], "readwrite");
    const store = transaction.objectStore("pending");
    store.add(record);
  }
  function checkDatabase() {
    const transaction = db.transaction(["pending"], "readwrite");
    //adds CRUD functionality
    const store = transaction.objectStore("pending");
    const getAll = store.getAll();
    getAll.onsuccess = function() {
      if (getAll.result.length > 0) {
        fetch("/api/transaction/bulk", {
          method: "POST",
          body: JSON.stringify(getAll.result),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          return response.json();
        })
        .then(() => {
          // delete records if successful
          const transaction = db.transaction(["pending"], "readwrite");
          const store = transaction.objectStore("pending");
          store.clear();
        });
      }
    };
  }
  window.addEventListener("online", checkDatabase);