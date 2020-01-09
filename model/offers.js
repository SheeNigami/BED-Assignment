var db = require('./databaseConfig.js');
var uuid = require('uuid/v4');

const Offers = {
    getListingOffers: function(listingID) {
        return new Promise((resolve, reject) => {
            let getListingOffersQuery = 
            `
            SELECT * FROM Offers
            WHERE
            fk_listing_id = ?;
            `;
            db.query(getListingOffersQuery, [listingID], (err, allListingOffers) => {
                if (err) {
                    return reject(err);
                }
                resolve(allListingOffers);
            });
        });
    },
    insertOffer: function(listingID, offer, offererUserID) {
        return new Promise((resolve, reject) => {
            let insertOfferQuery = 
            `
            INSERT INTO Offers
            (uuid, offer, fk_listing_id, fk_offerer_userid)
            VALUES
            (?, ?, ?, ?);
            `;
            const offerID = uuid();
            db.query(insertOfferQuery, [offerID, offer, listingID, offererUserID], (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(offerID); 
            });
        });
    }
};

module.exports = Offers;