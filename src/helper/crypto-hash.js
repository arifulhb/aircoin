const crypto = require('crypto');

/**
 *
 * @param inputs
 * @returns {string}
 */
const cryptoHash = (...inputs) => {
  const hash = crypto.createHash('sha256');
  
  hash.update(inputs.sort().join(' '));
  
  return hash.digest('hex');
}

module.exports = cryptoHash;
