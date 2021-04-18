const Blockchain = require('../../src/class/blockchain');
const Block = require('../../src/class/block');

describe('Blockchain()', () => {

    const blockchain = new Blockchain();
  
  it('should have a `chain` array instance', () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  })
  
  it('starts with genesis block',  () => {
    expect(blockchain.chain[0]).toEqual(Block.genesisBlock());
  })
  
  it('add new block to the chain',  () => {
    const newData = 'new block data';
    
    blockchain.addBlock({ data: newData });
    
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
  })
  
});
