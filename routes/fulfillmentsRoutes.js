const { WebhookClient } = require("dialogflow-fulfillment");

const mongoose = require("mongoose");
const Summaries = mongoose.model("summary");

module.exports = (app) => {
  app.post("/", async (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });

    async function lessonSummary(agent) {
      let summary = await Summaries.findOne({
        lesson: agent.parameters.lesson,
      });

      if (summary !== null) {
        responseText = `You want to learn about ${agent.parameters.lesson}. 
            Here is a quick summary: "${summary.text}"`;
      } else {
        responseText = `Sorry, I can't find any information on ${agent.parameters.lesson}. Try enter in something like "learn EGB120 Lec 1".`;
      }

      agent.add(responseText);
    }

    function fallback(agent) {
      agent.add(`I didn't understand`);
      agent.add(`I'm sorry, can you try again?`);
    }

    function sentimentAnalysis(agent) {
      let sentiRes = "";

      if (
        req.body.queryResult.sentimentAnalysisResult.queryTextSentiment.score >
          -1.0 &&
        req.body.queryResult.sentimentAnalysisResult.queryTextSentiment.score <
          -0.4
      ) {
        sentiRes =
          "It seems like you're not happy with me, I will try my very best and improve in my future releases.";
      } else if (
        req.body.queryResult.sentimentAnalysisResult.queryTextSentiment.score >=
          -0.4 &&
        req.body.queryResult.sentimentAnalysisResult.queryTextSentiment.score <
          0.4
      ) {
        sentiRes =
          "It seems like you're okay with me, I will do better next time.";
      } else if (
        req.body.queryResult.sentimentAnalysisResult.queryTextSentiment.score >=
          0.4 &&
        req.body.queryResult.sentimentAnalysisResult.queryTextSentiment.score <
          1.0
      ) {
        sentiRes =
          "It seems like you are happy with my performance. Glad I could help!";
      } else {
        sentiRes = "Sorry, It seems like it isn't working at the moment.";
      }

      agent.add(
        `My Sentiment Analysis Module gave a score of: ${req.body.queryResult.sentimentAnalysisResult.queryTextSentiment.score}. ${sentiRes}
        Thank you for your valuable time and feedback!
        `
      );
    }

    let intentMap = new Map();

    intentMap.set("Lesson Summary", lessonSummary);

    intentMap.set("Save Feedback", sentimentAnalysis);

    intentMap.set("Default Fallback Intent", fallback);

    agent.handleRequest(intentMap);
  });
};
