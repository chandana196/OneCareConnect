import CryptoJS from 'crypto-js';

const getUserId = () => {
    const encryptionKey = 'your-encryption-key'; // Use a strong key
    const encryptedUserId = sessionStorage.getItem('userId');
    if (encryptedUserId) {
        const bytes = CryptoJS.AES.decrypt(encryptedUserId, encryptionKey);
        const decryptedUserId = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedUserId;
    }
    return null;
};

export default getUserId;