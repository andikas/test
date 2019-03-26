var mongoose = require('mongoose');
const { NlpManager } = require('node-nlp');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('were connected');
});

Intent = require('../models/intent');

const manager = new NlpManager({ languages: ['en'] });

exports.list = function(req, res, next){
	Intent.find().exec(function(err, intents) {
		if(err) next(err);
		res.json(intents);
	});
};

exports.create = function(req, res, next) {
    console.log('req', req.body);
	var intent = new Intent({intent: req.body.intent, expression: req.body.expression});
	intent.save(function(err) {
        if(err){ return next(err); }
        for(var i=0; i<req.body.expression.length; i++){
            manager.addDocument('en', req.body.expression[i], req.body.intent);
        }
        
        manager.addAnswer('en', req.body.intent, req.body.intent+'-1');
        manager.addAnswer('en', req.body.intent, req.body.intent+'-1');

        (async() => {
            await manager.train();
            manager.save('voughNLP');
            const response = await manager.process('en', 'I have to go');
            console.log(response);
        })();

		Intent.find().exec(function(err, intents) {
			if(err) next(err);
			res.json(intents);
		});
	});
};

exports.check = function (req, res, next){
    manager.load('voughNLP');
    (async() => {
        
        const response = await manager.process('en', req.body.text);
        console.log(response);
        res.json(response)
    })();
}

