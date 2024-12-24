// returns the summary based on the previous prompts
async function getSummary() {}

// get SRS phrase text from srs document
async function getSRSText() {}

// pass the current prompt along with the previous prompt summary and srs document text
async function getOutput(currentPrompt, srsText, summary) {
  let prompt = "";
  if (summary !== undefined) {
    prompt = `
      make sure follow the guidelines ${summary} and the context was ${srsText} and the question was ${currentPrompt}
      `;
  } else {
    prompt = `the context was ${srsText} and the question was ${currentPrompt}`;
  }

  // calling the ai model by passing the prompt and return the out-put
}

module.exports = { getOutput, getSRSText, getSummary };
