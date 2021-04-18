const Blockchain = require('../../src/class/blockchain');
const Block = require('../../src/class/block');

describe('Blockchain()', () => {

  let blockchain, newChain;
  
  beforeEach(() => {
    blockchain = new Blockchain();
    newChain = new Blockchain();
  })
  
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
  
  describe('isValidChain()', () => {
    describe('when the chain does not start with a genesis block', () => {
      it('returns false',  () => {
        blockchain.chain[0] = {
          data: 'fake-genesis'
        }
        
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      })
    });
    
    describe('when the chain starts with genesis block and has multiple blocks', () => {
      beforeEach(() => {
        blockchain.addBlock({data: 'Star Wars'});
        blockchain.addBlock({data: 'Star Track'});
        blockchain.addBlock({data: 'Dune'});
        blockchain.addBlock({data: 'Guardians of the Galaxy'});
      });
      
      describe('and a `lastHash` reference has changed.', () =>{
        it('returns false', () => {
          blockchain.chain[2].lastHash = 'Burn the all' . toLowerCase();
  
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      })
      
      describe(' and the chain contain a block with an invalid field', () => {
        it('returns false',  () => {
            blockchain.chain[1].data = 'The Joker' . toLowerCase();
        });
      });
      
      describe(' and the chain does not contain any invalid blocks.', () => {
        it('returns true', () => {
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
        });
      });
    })
  })
});
