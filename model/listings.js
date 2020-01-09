var db = require('./databaseConfig.js');
var uuid = require('uuid/v4');

const Listings = {
    getUserListings: function(sellerID) {
        return new Promise((resolve, reject) => {
            let getUserListingsQuery = 
            `
            SELECT * FROM Listings
            WHERE
            fk_seller_id = ?;
            `;

            db.query(getUserListingsQuery, [sellerID], (err, sellerListings) => {
                if (err) {
                    return reject(err);
                }
                resolve(sellerListings);
            });
        });
    },
    getAllListings: function() {
        return new Promise((resolve, reject) => {
            let getAllListingsQuery = 
            `
            SELECT * FROM Listings;
            `;

            db.query(getAllListingsQuery, (err, allListings) => {
                if (err) {
                    return reject(err);
                }
                resolve(allListings);
            });
        });
    },
    getListing: function(listingID) {
        return new Promise((resolve, reject) => {
            let getListingQuery = 
            `
            SELECT * FROM Listings
            WHERE
            uuid = ?;
            `;

            db.query(getListingQuery, [listingID], (err, listing) => {
                if (err) {
                    return reject(err);
                }
                resolve(listing);
            });
        });
    },
    insertListing: function(title, desc, price, sellerID) {
        return new Promise((resolve, reject) => {
            let insertListingQuery = 
            `
            INSERT INTO Listings
            (uuid, title, description, price, fk_seller_id)
            VALUES
            (?, ?, ?, ?, ?);
            `;
            const listingID = uuid();
            db.query(insertListingQuery, [listingID, title, desc, price, sellerID], (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(listingID);
            });
        });
    },
    deleteListing: function(listingID) {
        return new Promise((resolve, reject) => {
            let deleteListingQuery = 
            `
            DELTE FROM Listings
            WHERE
            uuid = ?;
            `;
            db.query(deleteListingQuery, [listingID], (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    },
    updateListing: function(listingID, title, desc, price, sellerID) {
        return new Promise((resolve, reject) => {
            let updateListingQuery = 
            `
            UPDATE Listings
            SET 
            title = ?, description = ?, price = ?, fk_seller_id = ?
            WHERE
            uuid = ?;
            `;
            db.query(updateListingQuery, [title, desc, price, sellerID, listingID], (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    }
};

module.exports = Listings;