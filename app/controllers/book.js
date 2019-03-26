var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('were connected');
});

Book = require('../models/book');

exports.list = function(req, res, next){
	Book.find().exec(function(err, books) {
		if(err) next(err);
		res.json(books);
	});
};

exports.search = function(req, res, next){
	Book.find({$text: {$search: req.body.string}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}}).exec(function(err, books) {
		if(err) next(err);
		res.json(books);
	});
};

exports.create = function(req, res, next) {
	var book = new Book({title: req.body.title, publisher: req.body.publisher, author: req.body.author, synopsis: req.body.synopsis, genre: req.body.genre, isbn: req.body.isbn});
	book.save(function(err) {
		if(err){ return next(err); }
		Book.find().exec(function(err, books) {
			if(err) next(err);
			res.json(books);
		});
	});
};

