const cryptoHash = require ('../../src/helper/crypto-hash');

describe('cryptoHash()', () => {
  
  it('generates a SHA-256 hashed output', function () {
    const helloCryptoSHA256 = '266aed2b87832c66ccdc37797780defed588f6b53985064dd0470aad34cf7b8c';
    expect(cryptoHash('hello-crypto')).toEqual(helloCryptoSHA256);
  })
  
  it('product the same hash with the same input arguments in any order', () => {
    expect(cryptoHash('one', 'two', 'three'))
      .toEqual(cryptoHash('one', 'two', 'three'));
  })
});
