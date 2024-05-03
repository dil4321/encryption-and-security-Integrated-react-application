//To run the server use "node server.js" command in terminal.

const express = require('express');
const bodyParser = require('body-parser');
const CryptoJS = require('crypto-js');
const cors = require('cors');

const app = express();
const port = 3001;

// Parse JSON bodies
app.use(bodyParser.json());
// Enable CORS
app.use(cors());

app.post('/create', (req, res) => {

    const { message } = req.body;
    const encryptedKey = req.headers['x-timestamp'];

    // Decrypt the encrypted key using the static key
    const STATIC_KEY = "LECsMhEy";
    const decryptedEncryptiondKey = CryptoJS.AES.decrypt(encryptedKey, STATIC_KEY).toString(CryptoJS.enc.Utf8);
    const decodedKey = CryptoJS.enc.Base64.parse(decryptedEncryptiondKey).toString(CryptoJS.enc.Utf8);


    decryptedMessage = CryptoJS.AES.decrypt(atob(message), decodedKey).toString(CryptoJS.enc.Utf8);//decode the base64
    console.log('Message:', decryptedMessage);
    console.log('Decrypted Key:', decryptedEncryptiondKey);
    // console.log('Decrypted Timestamp:', decodedEncryptedTimestamp);

    res.send('echo: ',decryptedMessage);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
