var multer = require('multer');

var path = require('path');
var mkdirp = require('mkdirp');
var uuid = require('uuid/v4');

var Listings = require('./listings.js');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        Listings.getListing(req.params.listing_id).then((listings) => {
            if (listings.length == 0) {
                throw Error;
            } 
            let productImg = './product_imgs/' + req.params.listing_id;
            cb(null, productImg);
        }).catch((err) => {
            cb(err, null);
        });
     },
    filename: function (req, file, cb) {
        cb(null , uuid() + path.extname(file.originalname));
    }
});
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.jpg') {
            return callback(new Error('Only JPEG images are allowed'));
        }
        callback(null, true);
    },
    limits:{
        fileSize: 1024 * 1024
    }
});
module.exports = upload;