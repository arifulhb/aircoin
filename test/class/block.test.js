const Block = require('../../src/class/block');
const cryptoHash = require('../../src/helper/crypto-hash');
const GENESIS_DATA = require('../../src/config/genesis-data');

describe('Block()', () => {
  
  const timestamp = 'a-date';
  const lastHash = '------';
  const hash= 'initial-hash';
  const data = 'Hello Crypto';
  const block= new Block({timestamp, lastHash, hash, data});
  
  it('has a timestamp, lastHash, hash and a data property.', () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(data).toEqual(data);
  })
  
  describe('genesis()',  () => {
    const genesisBlock = Block.genesisBlock();
  
    it('return a block instance',() => {
      expect(genesisBlock instanceof Block).toBe(true);
    })
  
    it('return genesis data',() => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    })
  });
  
  describe('mindBlock()', () => {
    const lastBlock = Block.genesisBlock();
    const data = 'mine data';
    const minedBlock = Block.mineBlock({lastBlock, data});
  
    it('return a block instance', () => {
      expect(minedBlock instanceof Block).toBe(true);
    })
  
    it('sets the `lastHash`  to be the `hash` of the lastBlock', () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    })
  
    it('sets `data` to the `data` of the lastBlock', () => {
      expect(minedBlock.data).toEqual(data);
    })
    it('sets a `timestamp`', () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    })
    it('create a sha256 `hash` bashed on given proper input',  () => {
      expect(minedBlock.hash)
        .toEqual(cryptoHash(minedBlock.timestamp, lastBlock.hash, data));
    })
  });
  
});
