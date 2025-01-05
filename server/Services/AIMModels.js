const fs = require("fs");
const pdfParse = require("pdf-parse");
const { runPythonScript } = require("./PythonScripts");
async function processSrsDocument(fileObject) {
  try {
    // Use the buffer property from the file object
    const fileBuffer = fileObject.buffer;

    // Extract text from the PDF using pdf-parse
    const data = await pdfParse(fileBuffer);

    // Return the extracted text
    return data.text;
  } catch (error) {
    console.error("Error processing the PDF:", error);
    return null;
  }
}

// returns the summary based on the previous prompts
const getSummary = async function (Chat) {};

// get SRS phrase text from srs document
const getSRSText = async function (file) {
  console.log(file);
  const srsText = await processSrsDocument(file);

  return `SRS TEXT :
    ${srsText}
  `;
};

// pass the current prompt along with the previous prompt summary and srs document text
const getOutput = async function (currentPrompt, srsText, summary, uml) {
  let prompt = "";
  if (summary !== undefined) {
    prompt = `
      previous prompts summary was here : ${summary} and the context was ${srsText} and the current prompt was ${currentPrompt}
      `;
  } else {
    prompt = `the context was ${srsText} and the prompt was ${currentPrompt}`;
  }

  //console.log(`The Prompt was ${prompt}`);
  // Example data to write
  const largeData = JSON.stringify({
    prompt: prompt,
    modelUsed: "BERT",
    uml: uml, // 0 -> use case , 1 -> activity , 2 -> class diagram
  });
  console.log(`The UMl CHoosen was ${uml}`);
  // Define the temporary file path
  const tempFilePath =
    "/home/phani/final year project/Application/server/temp_data.json";
  console.log(`THe file path was ${tempFilePath}`); //
  // Write the data to a file
  fs.writeFileSync(tempFilePath, largeData);
  console.log(`Going to run the python Scripts`);
  const scriptPath =
    "/home/phani/final year project/Automating-Software-Design-Process-using-LLM-s/src/main.py"; // Path to your Python script
  const result = await runPythonScript(scriptPath, [tempFilePath]);

  if (Array.isArray(result)) {
    // Example: Process the array elements
    const [umlCode] = result;
    console.log(`The UML Code was ${umlCode}`);
    //console.log(`The UML Diagram Path was ${umlDiagramPath}`);
    return [umlCode];
  } else {
    const umlCode = result;
    console.log(`The UML-1 code was ${umlCode["uml_code"]}`);
    return umlCode["uml_code"];
  }
  // calling the ai model by passing the prompt and return the out-put
  // we are going to get the both the image and the plant uml code from the back-end
  console.log("Some thing went wrong");
};

module.exports = { getSummary, getOutput, getSRSText };
