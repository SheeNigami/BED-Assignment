// Express.js
var express = require('express');
var app = express();

// Packages
var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.json());
app.use(urlencodedParser);


// Models 
var Users = require('../model/users.js');
var Listings = require('../model/listings.js');
var Offers = require('../model/offers.js');
var Likes = require('../model/likes.js');
var upload = require('../model/imageUploads.js');

// 1) Get all Users
app.get('/users/', (req, res, next) => {
    Users.getAllUsers().then((allUsers) => {
        res.status(200).send(allUsers);
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });
});

// 2) Add new User
app.post('/users/', (req, res, next) => {
    Users.insertUser(req.body.username, req.body.password, req.body.profile_pic_url).then((insertedID) => {
        res.status(201).send({"UserID": insertedID});
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });
});

// 3) Get single SPECIFIC User
app.get('/users/:id/',  (req, res, next) => {
    Users.getUser(req.params.id).then((user) => {
        res.status(200).send(user);
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });
});

// 4) Update single User
app.put('/users/:id/', (req, res, next) => {
    Users.updateUser(req.params.id, req.body.username, req.body.profile_pic_url).then(() => {
        res.status(204).send();
    }).catch((err) => {
        if (err.code == 'ER_DUP_ENTRY') {
            res.status(422).send();
            return;
        }
        console.log(err);
        res.status(500).send();
    });
});

// 5) Get all Listings of a specific user(seller)
app.get('/users/:user_id/listings/', (req, res, next) => {
    Listings.getUserListings(req.params.user_id).then((userLisings) => {
        res.status(200).send(userLisings);
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });
});

// 6) Get all Listings
app.get('/listings/', (req, res, next) => {
    Listings.getAllListings().then((allListings) => {
        res.status(200).send(allListings);
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });
});

// 7) Get single Listing by ID
app.get('/listings/:listing_id', (req, res, next) => {
    Listings.getListing(req.params.listing_id).then((listing) => {
        res.status(200).send(listing[0]);
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });
});

// 8) Add a new Listing
app.post('/listings/', (req, res, next) => {
    Listings.insertListing(req.body.title, req.body.description, parseFloat(req.body.price), req.body.fk_poster_id).then((insertedListingID) => {
        res.status(201).send({'listingID': insertedListingID});
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });
});

// 9) Delete a particular Listing
app.delete('listings/:id/', (req, res, next) => {
    Listings.deleteListing(req.params.id).then(() => {
        res.status(204).send();
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });
});

// 10) Update a Listing
app.put('/listings/:id/', (req, res, next) => {
    Listings.updateListing(req.params.id, req.body.title, req.body.description, parseFloat(req.body.price), req.body.fk_poster_id).then(() => {
        res.status(204).send();
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });
});

// 11) Get all offer of a particular Listing
app.get('/listings/:id/offers/', (req, res, next) => {
    Offers.getListingOffers(req.params.id).then((allListingOffers) => {
        res.status(200).send(allListingOffers);
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });
});

// 12) Inserts an offer for a particular Listing
app.post('/listings/:id/offers/', (req, res, next) => {
    Offers.insertOffer(req.params.id, parseFloat(req.body.offer), req.body.fk_offeror_id).then((offerID) => {
        res.status(201).send({"offerID": offerID});
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });
});


// CA2

// Login
app.post('/login/', (req, res, next) => {
    Users.verify(req.body.username, req.body.password).then(
        function (user) {
            return new Promise((resolve, reject) => {
                if (user === null) {
                    return reject();
                }
                
                const payload = {user_id: user.id};
                jwt.sign(payload, JWT_SECRET, { algorithm: "HS256" }, (error, token) => {
                    if (err) {
                        return reject(err);
                    }
                   resolve({
                       token: token,
                       user_id: user.id
                   });
                });
            })
        }.bind(this)
    ).then((token) => {
        res.status(200).send(token);
    }).catch((err) => {
        console.log(err);
        res.status(401).send();
    });
});

// Bonus (Image upload/storage)

// Upload single img
app.post('/listings/:listing_id/single/', upload.single('product_img'), (req, res, next) => {
    try {
        res.send(req.file);
    } catch(err) {
        res.status(500).send(err);
    }
});

// Upload multiple imgs
app.post('/listings/:listing_id/multi/', upload.array('product_imgs', 4), (req, res, next) => {
    try {
        res.send(req.files);
    } catch(err) {
        res.status(500).send(err);
    }
});

// Get specific image
app.get('/listings/:listing_id/images/:image_id/', (req, res, next) => {
    try {
        res.status(200).sendFile(req.params.listing_id + '/' + req.params.image_id + '.jpg', {root: './product_imgs'});
    } catch(err) {
        console.log(err);
        res.status(500).send();
    }
});

// Bonus (Likes)

// Gets all Likes
app.get('/likes/', (req, res, next) => {
    Likes.getAllLikes().then((allLikes) => {
        res.status(200).send(allLikes);
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });
});

// Gets a specific Like
app.get('/likes/:likeID', (req, res, next) => {
    Likes.getLike(req.params.likeID).then((like) => {
        res.status(200).send(like);
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });
});

// Gets all Likes of a particular user
app.get('/users/:userID/likes/', (req, res, next) => {
    Likes.getUserLikes(req.params.userID).then((userLikes) => {
        res.status(200).send(userLikes);
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });
});

// Gets all Likes of a particular Listing
app.get('/listings/:listingID/likes/', (req, res, next) => {
    Likes.getListingLikes(req.params.listingID).then((listingLikes) => {
        res.status(200).send(listingLikes);
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });
});

// User Likes a Listing (Inserts a like)
app.post('/likes/', (req, res, next) => {
    Likes.like(req.body.userID, req.body.fk_liked_listing).then((likeID) => {
        res.status(201).send({"like_id": likeID});
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });
});

// Deletes a Like (User unlikes a Listing)
app.delete('/likes/:like_id/', (req, res, next) => {
    Likes.unlike(req.params.like_id).then(() => {
        res.status(204).send();
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });
});

module.exports = app;