const GENESIS_DATA = require('../config/genesis-data');
const cryptoHash = require('../helper/crypto-hash');

class Block {
  /**
   *
   * @param timestamp
   * @param lastHash
   * @param hash
   * @param data
   */
  constructor ({
    timestamp,
    lastHash,
    hash,
    data
  }) {
    this.data = data;
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
  }
  
  /**
   *
   * @returns {Block}
   */
  static genesisBlock() {
    return new this(GENESIS_DATA);
  }
  
  /**
   *
   * @param lastBlock
   * @param data
   */
  static mineBlock({lastBlock, data}) {
  
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    
    return new Block({
      timestamp,
      lastHash,
      data,
      hash: cryptoHash(timestamp, lastHash, data)
    });
  
  }
  
}

module.exports = Block;
