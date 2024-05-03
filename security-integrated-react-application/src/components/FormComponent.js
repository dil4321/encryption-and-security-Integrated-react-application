import React, { useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

const FormComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const STATIC_KEY = "LECsMhEy";

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputValue);
    const encryptionKey = generateEncryptionKey();
    console.log("Generated Encryption Key=> ",encryptionKey);

    // Example usage encrypt
    const encryptedData = encryptData(inputValue, encryptionKey);
    console.log("Encrypted Data=> ",encryptedData);

    // Example usage encrypted data encoding with Base64
    const encodedData = encode(encryptedData);
    console.log("Encoded Data=> ",encodedData);

    // Example usage decrypt
    const decryptedData = decryptData(encodedData, encryptionKey);
    console.log("Decrypted Data on client side=> ",decryptedData);

    const encodedKey = encode(encryptionKey);
    console.log("encKey",encodedKey);
    const encryptedEncryptionKey = encryptData(encodedKey,STATIC_KEY);
    console.log("Encrypted encryption key on client side=> ",encryptedEncryptionKey);


    try {
        const response = await axios.post('http://localhost:3001/create', {
            message: encodedData,
        }, {
            headers: {
                'X-Timestamp': encryptedEncryptionKey,
            },
        });
        console.log(response.data);
        // Handle success, show message, etc.
    } catch (error) {
        console.error(error);
        // Handle error, show error message, etc.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter data"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;

const generateEncryptionKey = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";
  for (let i = 0; i < 8; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
};

const encryptData = (data, key) => {
  const encrypted = CryptoJS.AES.encrypt(data, key).toString();
  return encrypted;
};

const decryptData = (encryptedData, key) => {
    const decrypted = CryptoJS.AES.decrypt(atob(encryptedData), key).toString(CryptoJS.enc.Utf8);
    return decrypted;
};

const encode = (encrypted) => {
    const encoded = btoa(encrypted); // Convert data to Base64
    return encoded;
}