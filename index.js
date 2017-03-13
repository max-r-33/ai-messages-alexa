'use strict';
var Alexa = require('alexa-sdk');
var rp = require('request-promise');
var postData = {
    "userid":1,
    "textRequest":""
};
var options = {
    url: 'https://hoops-qa.herokuapp.com/api/handlerequest',
    method:'POST',
    body: postData,
    json: true,
};

var handlers = {
    'GetMessage': function(){
        var message = this.event.request.intent.slots.speech.value;
        console.log(message)
        postData.textRequest = message;
        console.log(postData);
        rp(options, (error, response, body) => {
            console.log(response);
            console.log(body);
            this.emit(':tell', body.text);
        })
    }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
