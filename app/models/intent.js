var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var IntentSchema = new Schema({
intent: {type: String},
expression: []
}, {
timestamps: true,
usePushEach: true,
});

IntentSchema.index({'$**': 'text'});

Intent = mongoose.model('Intent', IntentSchema);


/**
* @param {String} ip_address of the request
* @param {mongoose.Types.ObjectId | String} user_id
* @param {mongoose.model} record
* @param {String} message
*/
module.exports = Intent;