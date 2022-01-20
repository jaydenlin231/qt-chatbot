"use strict";
const dialogflow = require("dialogflow");
const { struct } = require("pb-util");
// const uuid = require("uuid");
const mongoose = require("mongoose");
const config = require("../config/keys");
const projectID = config.googleProjectID;
const sessionID = config.dialogFlowSessionID;
const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey,
};

const sessionClient = new dialogflow.SessionsClient({
  projectID: projectID,
  credentials: credentials,
});

const Registration = mongoose.model("registration");
const Feedback = mongoose.model("feedback");

// const sessionPath = sessionClient.sessionPath(
//   config.googleProjectID,
//   config.dialogFlowSessionID
// );

module.exports = {
  textQuery: async function (text, userID, parameters = {}) {
    let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID);
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text,
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
      queryParams: {
        payload: {
          data: parameters,
        },
      },
    };

    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleActions(responses);
    return responses;
  },

  handleActions: function (responses) {
    let self = module.exports;
    let queryResult = responses[0].queryResult;

    switch (queryResult.action) {
      case "CollectUserInfo.CollectUserInfo-yes":
        if (queryResult.allRequiredParamsPresent) {
          self.saveRegistration(
            queryResult.outputContexts[1].parameters.fields
          );
        }
        break;
      case "saveFeedback":
        if (queryResult.allRequiredParamsPresent) {
          console.log(queryResult.parameters.fields);
        }
        self.saveFeedback(queryResult.parameters.fields);
        break;
    }
    return responses;
  },
  saveRegistration: async function (fields) {
    const registration = new Registration({
      user: fields.user.structValue.fields.name.stringValue,
      userIdentification: fields["userIdentification.original"].stringValue,
    });
    try {
      let reg = await registration.save();
      console.log(reg);
    } catch (err) {
      console.log(err);
    }
  },
  saveFeedback: async function (fields) {
    const feedback = new Feedback({
      feedback: fields.feedback.stringValue,
    });
    try {
      let fdbk = await feedback.save();
      console.log(fdbk);
    } catch (err) {
      console.log(err);
    }
  },
  eventQuery: async function (event, userID, parameters = {}) {
    let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID);
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameters: struct.encode(parameters),
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
    };

    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleActions(responses);
    return responses;
  },
};
