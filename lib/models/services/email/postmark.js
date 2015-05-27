var Postmark, postmark;
var postmark = require("postmark");
var helper = require("../helpers")

Postmark = function(keys) {
  this.name = "postmark";
  this.keys = keys;
  this.validate = function(callback) {
    this.keyErrors = this.validatePostmarkCall(this.keys);
    if(this.keyErrors.length!=0){
      console.log(this.keyErrors);
      return callback(this.keyErrors, null);
    }
    return this.client().getEmailClientUsage({}, function(err, result) {
      return callback(err, result);
    });
  };
  this.validatePostmarkCall = function(keys){
  	var schema = require('validate');
  	var user = schema({
  		serverKey: {
  			type: 'string',
  			required: true,
  			message: 'SERVER KEY IS REQUIRED'
  		},
  	});
  	return user.validate(keys)
  }
  this.client = function() {
    return postmark(this.keys.serverKey);
  };
  return this;
};
module.exports = Postmark;