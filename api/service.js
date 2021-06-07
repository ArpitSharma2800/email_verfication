const pool = require("../config/db");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO userdetails (
            userid,
            name,
            emailAdd,
            pass,
            lastLogin,
            verfiedEmail,
            jwttoken) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                data.id,
                data.name,
                data.email,
                data.pass,
                data.lastLogin,
                data.verfiedEmail,
                data.jwttoken
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    checkuser: (data, callBack) => {
        pool.query(
            `SELECT * FROM userdetails  WHERE emailAdd='${data.email}'`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};