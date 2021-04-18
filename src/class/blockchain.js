const Block = require('./block');

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
}

module.exports = Blockchain;
