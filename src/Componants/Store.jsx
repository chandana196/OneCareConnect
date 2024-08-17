import CryptoJS from 'crypto-js';

const getUserId = () => {
    const encryptionKey = process.env.REACT_APP_Encryption_key;
    const encryptedUserId = sessionStorage.getItem('userId');
    if (encryptedUserId) {
        const bytes = CryptoJS.AES.decrypt(encryptedUserId, encryptionKey);
        const decryptedUserId = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedUserId;
    }
    return null;
};

export default getUserId;