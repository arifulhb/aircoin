const Block = require('./block');
const cryptoHash = require('../helper/crypto-hash');

/**
 * Blockchain
 */
class Blockchain {
  
  /**
   *
   */
  constructor () {
    this.chain = [Block.genesisBlock()];
  }
  
  /**
   *
   * @param data
   */
  addBlock({data}) {
    const newBlock =Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data
    })
    
    this.chain.push(newBlock);
  }
  
  /**
   *
   * @param chain
   */
  static isValidChain(chain) {
  
    // if genesis is correct
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesisBlock())) {
      return false;
    }
    
    for (let i = 1; i < chain.length; i++) {
      const {timestamp, lastHash, data, hash} = chain[i];
      const actualLastHash = chain[i-1].hash;
     
      if (lastHash !== actualLastHash) return false;
      
      const validatedHash = cryptoHash(timestamp, lastHash, data);
      
      if (hash !== validatedHash)  return false;
    }
    
    return true;
  }
}

module.exports = Blockchain;
