const { spawn } = require("child_process");

const runPythonScript = (scriptPath, args = []) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn(
      "/home/phani/final year project/Automating-Software-Design-Process-using-LLM-s/venv/bin/python3.12",
      [scriptPath, ...args],
    );

    let output = "";
    let error = "";
    console.log("waiting for output where stdout.on() was executing");

    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
      console.log(`The output was ${output}`);
    });

    pythonProcess.stderr.on("data", (data) => {
      error += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        try {
          console.log(
            "==============================================================================================",
          );
          console.log("THe Output was ========== ", output);
          // Attempt to parse the output as JSON
          const result = JSON.parse(output.trim());
          resolve(result); // Resolve with the parsed result
        } catch (err) {
          reject(new Error("Failed to parse Python output"));
        }
      } else {
        reject(new Error(`Python script failed with error: ${error}`));
      }
    });
  });
};

module.exports = {
  runPythonScript,
};
