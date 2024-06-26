//To run the server use "node server.js" command in terminal.

const express = require("express");
const bodyParser = require("body-parser");
const CryptoJS = require("crypto-js");
const cors = require("cors");
const cryptoModule = require('../security-integrated-react-application/src/cryptoUtils');

const app = express();
const port = 3001;
const STATIC_KEY = "LECsMhEy";
let messageData = [];

app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors()); //enable CORS

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.post("/create", (req, res) => {
  const { message } = req.body;
  const encryptedKey = req.headers["x-timestamp"];

  // Decrypt the encrypted key using the static key
  const decryptedEncryptiondKey = CryptoJS.AES.decrypt(
    encryptedKey,
    STATIC_KEY
  ).toString(CryptoJS.enc.Utf8);
  const decodedKey = CryptoJS.enc.Base64.parse(
    decryptedEncryptiondKey
  ).toString(CryptoJS.enc.Utf8);


  decryptedMessage = CryptoJS.AES.decrypt(atob(message), decodedKey).toString(
    CryptoJS.enc.Utf8
  );

  messageData.push(decryptedMessage);
  console.log("Message:", messageData.at(-1));
  
  console.log("DATA ",messageData);

  res.send(decryptedMessage);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


app.get("/get/:id", (req, res, next) => {
  const id = req.params.id;
  const encryptedKey = req.headers["x-timestamp"];
  console.log("get API called ID:", id);
  let message;
  if(messageData.at(id)==undefined){
    message = "No data exist for the id";
  } else {
    message = messageData.at(id);
  }

  console.log("DATA ",messageData);
  console.log(message);
  const key = cryptoModule.decryptKey(encryptedKey, STATIC_KEY);
  const encryptedMessage = cryptoModule.encryptData(message,key);
  const msg = cryptoModule.decryptData(encryptedMessage,key);

  res.json({ encryptedMessage });
});
