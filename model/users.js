var db = require('./databaseConfig.js');
var uuid = require('uuid/v4');

var bcrypt = require('bcrypt');
const saltRounds = 10;

const Users = {
    getAllUsers: function() {
        return new Promise((resolve, reject) => {
            let getAllUsersQuery = 
            `
            SELECT * FROM Users;
            `;

            db.query(getAllUsersQuery, (err, allUsers) => {
                if (err) {
                    return reject(err);
                }
                resolve(allUsers);
            });
        });
    },
    insertUser: function(username, password, profilePicURL) {
        return new Promise((resolve, reject) => {
            let insertUserQuery = 
            `
            INSERT INTO Users
            (uuid, username, password, profile_pic_url)
            VALUES
            (?, ?, ?, ?);
            `;
            const userID = uuid();
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(password, salt, (err, hashed) => {
                    db.query(insertUserQuery, [userID, username, password, profilePicURL], (err, insertedInfo) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(userID);
                    });
                });
            });
        });
    },
    getUser: function(userID) {
        return new Promise((resolve, reject) => {
            let getUserQuery = 
            `
            SELECT * FROM Users
            WHERE
            uuid = ?;
            `;

            db.query(getUserQuery, [userID], (err, userInfo) => {
                if (err) {
                    return reject(err);
                }
                resolve(userInfo);
            });
        });
    },
    updateUser: function(userID, username, profilePicURL) {
        return new Promise((resolve, reject) => {
            let updateUserQuery = 
            `
            UPDATE Users
            SET 
            username = ?, profile_pic_url = ?
            WHERE
            uuid = ?;
            `;

            db.query(updateUserQuery, [username, profilePicURL, userID], (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    },
    verify: function(username, password) {
        return new Promise((resolve, reject) => {
            let verifyQuery = 
            `
            SELECT * FROM Users
            WHERE
            username = ? 
            LIMIT 1;
            `;

            db.query(verifyQuery, (err, results) => {
                if (err) {
                   return reject(err);
                } 
                if (results.length == 0) {
                   return reject();
                }
                resolve(results);
            });
        }).then(
            function (results) {
                return new Promise((resolve, reject) =>  {
                    const user = results[0];
                    bcrypt.compare(password, user.password, (err, compareResults) =>  {
                        if (err) {
                            return reject(err);
                        }
                        if (!compareResults) {
                            return reject();
                        }
                        resolve(user);
                    });
                });
            }.bind(this)
        );
    }
};

module.exports = Users;