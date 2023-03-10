'use strict';
const sqlite = require('sqlite3');
const db = new sqlite.Database('database.db', (err) => {
    if (err) throw err;
  });
function getTestResults(rfid) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM TestResults WHERE idSKUItem=?";
        db.all(sql, [rfid], (err, rows) => {
            if (err) {
                reject({ error: "no test results associated to sku item" });

            }
            const testResults = rows.map((t) => ({ id: t.idResults, idTestDescriptor: t.idTestDescriptor, date: t.date, result: (t.result == 1 ? true : false) }));
            resolve(testResults);
        });
    });
}

function getByIdTestResults(id,rfid) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM TestResults WHERE idResults=? AND idSKUItem=?";
        db.all(sql, [rfid,id], (err, rows) => {
            if (err) {
                reject({ error: "no test result associated to id or no sku item associated to rfid rfid" });

            }
            const testResults = rows.map((t) => ({ id: t.idResults, idTestDescriptor: t.idTestDescriptor, date: t.date, result: t.result }));
            resolve(testResults);
        });
    });
}

function checkId(id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM TestResults WHERE idResults=?";
        db.all(sql, [id], (err, rows) => {
            if (err) {
                reject({ error: "no test result associated to id" });

            }
            const testResults = rows.map((t) => ({ id: t.idResult }));
            resolve(testResults);
        });
    });
}

function checkRfid(rfid) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM TestResults WHERE idSKUItem=?";
        db.all(sql, [rfid], (err, rows) => {
            if (err) {
                reject({ error: "no sku item associated to rfid" });

            }
            const testResults = rows.map((t) => ({ id: t.idResult }));
            resolve(testResults);
        });
    });
}

function insertTestResult(rfid, idTestDescriptor, Date, Result) {

    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO TestResults (idTestDescriptor, date, result, idSKUItem) values (?,?,?,?)";
        db.run(sql, [idTestDescriptor, Date, Result, rfid], function(err) {
            if (err) {
                reject({ error: "no insert" });

            }
            resolve(true);
        });
    });
}

function updateTestResults(id, rfid, newIdTestDescriptor, newDate, newResult) {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE TestResults SET idTestDescriptor=?, date=?, result=? WHERE idResults=? AND idSKUItem=?";
        db.run(sql, [newIdTestDescriptor, newDate, newResult, id, rfid],function (err) {
            if (err) {
                reject({ error: "no update" });

            }
            resolve(true);
        });
    });
}

function deleteTestResult(id,rfid) {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM TestResults WHERE idResults=? AND idSKUItem=?";
        db.run(sql, [rfid,id ],function (err){
            if (err) {
                reject({ error: "no delete" });

            }
            resolve(true);
        });
    });
}

function deleteALLTestResult() {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM TestResults ";
        db.run(sql, [],function (err)  {
            if (err) {
                reject({ error: "no delete" });

            }
            resolve(true);
        });
    });
}

function getALLTestResults() {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM TestResults ";
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject({ error: "no test results associated to sku item" });

            }
            const testResults = rows.map((t) => ({ id: t.idResults, idTestDescriptor: t.idTestDescriptor, date: t.date, result: (t.result == 1 ? true : false) }));
            resolve(testResults);
        });
    });
}

function updateIDResult (idResult,idSKUItem){
    return new Promise((resolve, reject) => {
        const sql = "UPDATE TestResults SET idResults = ? WHERE idSKUItem=?";
        db.run(sql, [idResult,idSKUItem],function(err) {
            if (err) {
                reject({ error: "no update" });
                
            }
                resolve(true);
        });
    });
}


module.exports = { getTestResults, getByIdTestResults, checkId, checkRfid, insertTestResult, updateTestResults, deleteTestResult, deleteALLTestResult, getALLTestResults,updateIDResult};