const express = require('express');
const cron = require("node-cron");
const bodyParser = require('body-parser');

const fs = require("fs");

const app = express();


app.use(express.static(__dirname  + '/public'));
app.use(bodyParser.urlencoded({
	extended: false 
}));

app.use(bodyParser.json({
	limit: '50mb'
}));
require('./app/routes/route')(app);

app.get('*', function(req, res) {
	res.sendFile(__dirname + '/public/app/views/index.html');
});

// cron.schedule("* * * * *", function() {
//     console.log("running a task every minute");
//   });

app.listen(8000, () => {
    console.log('Server started!')
})