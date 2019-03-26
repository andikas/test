var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var BookSchema = new Schema({
title: {type: String},
publisher: {type: String},
author: {type: String},
isbn: {type: String},
genre: {type: String},
synopsis: {type: String}
}, {
timestamps: true,
usePushEach: true,
});

BookSchema.index({'$**': 'text'});

Book = mongoose.model('Book', BookSchema);


/**
* @param {String} ip_address of the request
* @param {mongoose.Types.ObjectId | String} user_id
* @param {mongoose.model} record
* @param {String} message
*/
Book.addBook = function(title, publisher, isbn, genre, synopsis) {
    Book.create({
        title: title,
        publisher: publisher,
        isbn: isbn,
        genre: genre,
        synopsis: synopsis
    });
}

module.exports = Book;