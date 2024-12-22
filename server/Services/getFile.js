const { MongoClient, GridFSBucket } = require("mongodb");
const fs = require("fs");
const path = require("path");

// we need to update the code

async function getFileFromReference(client, email, chat_no) {
  const db = client.db("final_year_application");
  const collection = db.collection("myCollection");

  // Find the document that contains the file reference
  const doc = await collection.findOne({ email: email });

  if (doc) {
    const fileId = doc.fileReference;
    const bucket = new GridFSBucket(db, { bucketName: "fs" });

    const downloadStream = bucket.openDownloadStream(fileId);

    downloadStream.pipe(fs.createWriteStream("downloadedFile.txt"));

    downloadStream.on("finish", function () {
      console.log("File downloaded successfully");
    });
  } else {
    console.log("Document not found");
  }
}
