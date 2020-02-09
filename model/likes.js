// Name: Yeo Sheen Hern 
// Admin no. : 1902257
// Class: DIT/FT/1B/11

var db = require('./databaseConfig.js');
var uuid = require('uuid/v4');

const Likes = {
    getAllLikes: function() {
        return new Promise((resolve, reject) => {
            let getAllLikesQuery = 
            `
            SELECT 
            Likes.uuid, fk_liker_id, username, fk_liked_listing, title  
            FROM Likes 
            INNER JOIN Users ON Users.uuid = Likes.fk_liker_id 
            INNER JOIN Listings ON Listings.uuid = Likes.fk_liked_listing; 
            `;
            db.query(getAllLikesQuery, (err, allLikes) => {
                if (err) {
                    return reject(err);
                }
                resolve(allLikes);
            });
        });
    },
    getLike: function(likeID) {
        return new Promise((resolve, reject) => {
            let getLikeQuery = 
            `
            SELECT 
            Likes.uuid, fk_liker_id, username, fk_liked_listing, title  
            FROM Likes 
            INNER JOIN Users ON Users.uuid = Likes.fk_liker_id 
            INNER JOIN Listings ON Listings.uuid = Likes.fk_liked_listing
            WHERE
            Likes.uuid = ?;
            `;
            db.query(getLikeQuery, [likeID], (err, like) => {
                if (err) {
                    return reject(err);
                }
                resolve(like);
            });
        });
    },
    getUserLikes: function(userID) {
        return new Promise((resolve, reject) => {
            let getAllLikesQuery = 
            `
            SELECT 
            Likes.uuid, fk_liker_id, username, fk_liked_listing, title  
            FROM Likes 
            INNER JOIN Users ON Users.uuid = Likes.fk_liker_id 
            INNER JOIN Listings ON Listings.uuid = Likes.fk_liked_listing 
            WHERE 
            Users.uuid = ?;
            `;
            db.query(getAllLikesQuery, [userID], (err, userLikes) => {
                if (err)  {
                    return reject(err);
                }
                resolve(userLikes);
            });
        });
    },
    getListingLikes: function(listingID) {
        return new Promise((resolve, reject) => {
            let getAllLikesQuery = 
            `
            SELECT 
            Likes.uuid, fk_liker_id, username, fk_liked_listing, title  
            FROM Likes 
            INNER JOIN Users ON Users.uuid = Likes.fk_liker_id 
            INNER JOIN Listings ON Listings.uuid = Likes.fk_liked_listing 
            WHERE 
            Listings.uuid = ?;
            `;
            db.query(getAllLikesQuery, [listingID], (err, listingLikes) => {
                if (err)  {
                    return reject(err);
                }
                resolve(listingLikes);
            });
        });
    },
    like: function(likerUserID, listingID) {
        return new Promise((resolve, reject) => {
            let likeQuery = 
            `
            INSERT INTO Likes
            (uuid, fk_liker_id, fk_liked_listing)
            VALUES
            (?, ?, ?);
            `;
            let likeID = uuid();
            db.query(likeQuery, [likeID, likerUserID, listingID], (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(likeID);
            });
        });
    },
    unlike: function(likeID) {
        return new Promise((resolve, reject) => {
            let unlikeQuery = 
            `
            DELETE FROM Likes
            WHERE
            uuid = ?;
            `;
            db.query(unlikeQuery, [likeID], (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    }
};

module.exports = Likes;