const crypto = require('crypto')
const bcrypt = require('bcrypt')

const hashPassword = (password) => bcrypt.hash(password, 10)

const comparePassword = (data_one, data_two) => new Promise((resolve, reject) =>
        bcrypt.compare(data_one, data_two, (err, match) => err ? reject(err) : resolve(match)))

const generateHash = (text) => {
    let cipher = crypto.createCipher('aes-256-cbc', Buffer.from(process.env.HASH_KEY));
    let encrypted = cipher.update(text, 'utf8', 'hex');

    encrypted += cipher.final('hex')
    return encrypted
}

const decryptHash = (text) => {
    let decipher = crypto.createDecipher('aes-256-cbc', Buffer.from(process.env.HASH_KEY));
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8')
    return decrypted;
}

module.exports = {
    hashPassword,
    comparePassword,
    generateHash,
    decryptHash
}

