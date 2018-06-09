'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = "<insert app id>";
var SKILL_NAME = 'Inquisitor';

/**
 * Array containing space facts.
 */
var PERSONS = [
    "person one",
    "person two",
    "person three",
    "person four",
    "person five"
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetPerson');
    },
    'GetPersonNameIntent': function () {
        this.emit('GetPerson');
    },
    'GetPerson': function () {
        // Get a random person from the list of people
        var personIndex = Math.floor(Math.random() * PERSONS.length);
        var randomPerson = PERSONS[personIndex];

        // Create speech output
        var speechOutput = "The person you are looking for is: " + randomPerson;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomPerson)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say who did it, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};
