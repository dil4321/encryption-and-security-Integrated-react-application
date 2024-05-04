//uncomment console logs if you want to verify the encoding/decoding process.
import React, { useState } from "react";
import axios from "axios";
const cryptoModule = require('../cryptoUtils');

const FormComponent = () => {
  const [inputNote, setInputNote] = useState("");
  const [inputId, setInputId] = useState("");
  const STATIC_KEY = "LECsMhEy";

  const handleNoteChange = (e) => {
    setInputNote(e.target.value);
  };
  const handleIdChange = (e) => {
    setInputId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputNote);
    const encryptionKey = cryptoModule.generateEncryptionKey();
    console.log("Generated Encryption Key=> ", encryptionKey);

    // Example usage encrypt
    const encryptedData = cryptoModule.encryptData(inputNote, encryptionKey);
    // console.log("Encrypted Data=> ", encryptedData);

    // Example usage encrypted data encoding with Base64
    const encodedData = cryptoModule.encode(encryptedData);
    // console.log("Encoded Data=> ", encodedData);

    // Example usage decrypt
    const decryptedData = cryptoModule.decryptData(encodedData, encryptionKey);
    // console.log("Decrypted Data on client side=> ", decryptedData);

    const encryptedKey = cryptoModule.encryptKey(encryptionKey, STATIC_KEY);
    // console.log(
    //   "Encrypted encryption key on client side=> ",
    //   encryptedKey
    // );

    try {
      const response = await axios.post(
        "http://localhost:3001/create",
        {
          message: encodedData,
        },
        {
          headers: {
            "X-Timestamp": encryptedKey,
          },
        }
      );
      console.log(response.data);
      // Handle success, show message, etc.
    } catch (error) {
      console.error(error);
      // Handle error, show error message, etc.
    }
  };

  const handleGet = async (e) => {
    e.preventDefault();
    const encryptionKey = cryptoModule.generateEncryptionKey();//generate new key to send. This key is use by the server to encrypt the data that send to the client side.
    const encryptedKey = cryptoModule.encryptKey(encryptionKey,STATIC_KEY);
    //formating the url.
    const url = `http://localhost:3001/get/${inputId}#${inputId}`;

    //get the note from the server using note id, decrypt it and show on alert box.
    axios
      .get(url,{
        headers: {
          'X-Timestamp': encryptedKey
      }
      })
      .then((response) => {
        const encryptedMessage = response.data.encryptedMessage;

        const decryptedNote = cryptoModule.decryptGetAPIData(encryptedMessage,encryptionKey);
        console.log("Note:", decryptedNote);
        window.alert(`Note received: ${decryptedNote}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputNote}
          onChange={handleNoteChange}
          placeholder="Enter data"
        />
        <button type="submit">Submit Note</button>
      </form>
      <form onSubmit={handleGet}>
        <input
          type="number"
          value={inputId}
          onChange={handleIdChange}
          placeholder="Enter id"
        />
        <button type="submit">Get Note</button>
      </form>
    </>
  );
};

export default FormComponent;
