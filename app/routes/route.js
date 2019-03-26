var express = require('express'),
    book = require('../controllers/book');
    intent = require('../controllers/intent');
    
    
module.exports = function(app){
    var api = express.Router();
    
	api.get('/book', book.list);
	api.post('/book/create', book.create);
    api.post('/book/search', book.search);
    
    api.get('/intent', intent.list);
	api.post('/intent/create', intent.create);
	api.post('/intent/check', intent.check);
    
    app.use('/api', api);

    return api;
};
