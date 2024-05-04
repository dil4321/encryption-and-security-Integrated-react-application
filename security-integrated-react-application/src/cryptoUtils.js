const CryptoJS = require('crypto-js');

const cryptoModule = {
    generateEncryptionKey: () => {
        const chars =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let key = "";
        for (let i = 0; i < 8; i++) {
          key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return key;
      },
      encryptData: (data, key) => {
        const encryptedData = CryptoJS.AES.encrypt(data, key).toString();
        return encryptedData;
      },
      decryptData: (encryptedData, key) => {
        const decryptedData = CryptoJS.AES.decrypt(atob(encryptedData), key).toString(
          CryptoJS.enc.Utf8
        );
        return decryptedData;
      },
      encryptKey: (encriptionKey,staticKey) => {
        const encoded = btoa(encriptionKey); // Convert data to Base64
        const encryptedKey = CryptoJS.AES.encrypt(encoded, staticKey).toString();
        return encryptedKey;
      },
      decryptKey: (encryptedKey,staticKey) => {
        const decryptedEncryptiondKey = CryptoJS.AES.decrypt(encryptedKey, staticKey).toString(CryptoJS.enc.Utf8);
        const decodedKey = CryptoJS.enc.Base64.parse(decryptedEncryptiondKey).toString(CryptoJS.enc.Utf8);
        return decodedKey;
      },
      decryptGetAPIData: (encryptedData, key) => {
        const decryptedData = CryptoJS.AES.decrypt(encryptedData, key).toString(
          CryptoJS.enc.Utf8
        );
        return decryptedData;
      },
      encode: (encrypted) => {
        const encoded = btoa(encrypted); // Convert data to Base64
        return encoded;
      }
};

module.exports = cryptoModule;