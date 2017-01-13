/**
Slang translator and aid skill for the Amazon Echo device   -   Conor  Hennessy 2016

So far this skill responds to a not so well known lyric in Skepta's "Man" track
I hope to add further functions in the future

Lyric's:
Whys man calling me family all of a sudden?
Like hmm, my mum don’t know your mum
Stop telling man you’re my cousin

 * Example:
 *  User: "Alexa, open London slang guide"
 *  User: "Whys man calling me family all of a sudden?"
 *  Alexa: "hmm, my mum don’t know your mum
				Stop telling man you’re my cousin"
 */

/** App ID for the skill */
var APP_ID = undefined; /**  TODO: Fix this thing, I have my APP_ID but when I define it here it dosent like it*/

/**
 * The SlangSkill prototype and functions
 */
var AlexaSkill = require('./AlexaSkill'),
	definitions = require('./definitions');

var SlangSkill = function () {
    AlexaSkill.call(this, APP_ID);
};

// AlexaSkill initiate
SlangSkill.prototype = Object.create(AlexaSkill.prototype);
SlangSkill.prototype.constructor = SlangSkill;

SlangSkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("SlangSkill onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
};

//Responce on start
SlangSkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("SlangSkill onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome fam, ask me a slang or grime related question";
    var repromptText = "Come on fam, you can ask me a question";
    response.ask(speechOutput, repromptText);
};

//Responce on ending
SlangSkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("SlangSkill onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
	var speechOutput = "Goodbye";
    response.ask(speechOutput);
};

//All intent handlers and apporopriate response
SlangSkill.prototype.intentHandlers = {
	"WordIntent": function (intent, session, response) {
		var wordSlot = intent.slots.Item,
            wordName;
        if (wordSlot && wordSlot.value){
            wordName = wordSlot.value.toLowerCase();
        }

        var cardTitle = "Definition for " + wordName,
            word = words[wordName],
            speechOutput,
            repromptOutput;
        if (word) {
            speechOutput = {
                speech: word,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.tellWithCard(speechOutput, cardTitle, word);
        } else {
            var speech;
            if (wordName) {
                speech = "I'm sorry, I currently do not know the definition for " + wordName + ". What else can I help with?";
            } else {
                speech = "I'm sorry, I currently do not know that word at all. What else can I help with?";
            }
            speechOutput = {
                speech: speech,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            repromptOutput = {
                speech: "Oi fam, What can I help with?",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.ask(speechOutput, repromptOutput);
        }
    },

	"FamWordIntent": function (intent, session, response) {
	    response.tellWithCard("derived from the word family. Referring to people that are extremely close; as if  they are a family member. ");
    },
	"GetNewFactIntent": function (intent, session, response) {
	    response.tellWithCard("Sorry mate I don't have a slang fact thing for you just yet, coming soon!"); /**  TODO: Create some facts to add. */
    },
	// custom intent handlers for man lyrics
	"ManIntent": function (intent, session, response) {
        response.tellWithCard("like hmm, my mum don't know your mum"+"Stop telling man you’re my cousin", "Whys man calling me family all of a sudden?"+"Stop telling man you’re my cousin", "Whys man calling me family all of a sudden?"+"Stop telling man you’re my cousin");
    },
	"AMAZON.StopIntent": function (intent, session, response) {
	    response.tellWithCard("Later fam");
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask me a question fam!", "You can ask me a question fam!");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SlangSkill skill.
    var slangSkill = new SlangSkill();
    slangSkill.execute(event, context);
};