const Block = require('./block');

let data, lastBlock, block;

beforeEach(()=>{
    data = 'bar';
    lastBlock = Block.genesis();
    block = Block.mineBlock(lastBlock, data);
})

describe('Block', ()=>{
    it('sets the `data` to match the input', ()=>{
        expect(block.data).toEqual('bar');
    });

    it('sets the `lastHash` to match the hash of the lastBlock', ()=>{
        expect(block.lastHash).toEqual(lastBlock.hash)
    })
})