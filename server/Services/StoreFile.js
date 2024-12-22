const { MongoClient, GridFSBucket } = require("mongodb");
const fs = require("fs");
const path = require("path");

async function uploadFile(client, filePath) {
  const db = client.db("final_year_application");
  const bucket = new GridFSBucket(db, { bucketName: "fs" });

  // Extract the file name from the file path dynamically
  const fileName = path.basename(filePath); // e.g., 'myFile.txt
  const uploadStream = bucket.openUploadStream(fileName);
  fs.createReadStream(filePath).pipe(uploadStream);

  uploadStream.on("finish", function () {
    console.log("File uploaded successfully");
    // Here you get the file's ObjectId, which can be stored in your collection
    return uploadStream.id; // This is the ObjectId of the file
  });
}

// uploadFile('mongodb://localhost:27017', './path/to/your/file.pdf');
// this is how we upload the file

/*

// Usage
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect()
  .then(() => {
    uploadFile(client, '/path/to/your/file.pdf');
  })
  .catch(err => console.error('Error uploading file:', err))
  .finally(() => client.close());


  we need to use this for calling any service function


*/
