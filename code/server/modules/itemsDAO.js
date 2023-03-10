'use strict'
const sqlite = require('sqlite3');
const db = new sqlite.Database('database.db', (err) => {
    if (err) throw err;
  });

function listItems() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM Items";
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject({ error: "no items in database" });
                return;
            }
            const items = rows.map((t) => ({ id: t.idItems, description: t.description, price: t.price, SKUId: t.idSKU, suppliersId: t.idSupplier }));
            resolve(items);
        });
    });
}

function findItem(id, supplierId) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM Items WHERE idItems=? AND idSupplier=?";
        db.all(sql, [id, supplierId], (err, rows) => {
            if (err) {
                reject({ error: "no item in database" });
                return;
            }
            const item = rows.map((t) => ({ id: t.idItems, description: t.description, price: t.price, SKUId: t.idSKU, supplierId: t.idSupplier }));
            resolve(item);
        });
    });
}

/* function findItemWithSupplier(id, supplierId) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM Items WHERE idItems=? AND idSupplier=?";
        db.all(sql, [id, supplierId], (err, rows) => {
            if (err) {
                reject({ error: "no item in database" });
                return;
            }
            const item = rows.map((t) => ({ id: t.idItems, description: t.description, price: t.price, SKUId: t.idSKU, supplierId: t.idSupplier }));
            resolve(item);
        });
    });
}
 */
function createItem(description, id, SKUId, supplierId, price) {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO Items (idItems, idSKU, description, price, idSupplier) values (?,?,?,?,?)";
        db.all(sql, [id, SKUId, description, price, supplierId], (err, rows) => {
            if (err) {
                reject(err);

            }
            resolve(true);
        });
    });
}

function updateItem(id, newDescription, newPrice, supplierId) {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE Items SET description=?, price=? WHERE idItems=? AND idSupplier=? ";
        db.all(sql, [newDescription, newPrice, id, supplierId], (err, rows) => {
            if (err) {
                reject({ error: "no update" });

            }
            resolve(true);
        });
    });
}

function deleteItem(id, supplierId) {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM Items WHERE idItems=? AND idSupplier=?";
        db.all(sql, [id, supplierId], (err, rows) => {
            if (err) {
                reject({ error: "no delete" });

            }
            resolve(true);
        });
    });
}

function deleteALLItems() {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM Items";
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject({ error: "no delete" });

            }
            resolve(true);
        });
    });
}

module.exports = { listItems, findItem, createItem, updateItem, deleteItem, deleteALLItems }