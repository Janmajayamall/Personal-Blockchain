const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain', ()=>{
    let bc;
    let bc2;

    beforeEach(()=>{
        bc = new Blockchain();
        bc2 = new Blockchain();
    });

    it('starts with the genesis block', ()=>{
        expect(bc.chain[0]).toEqual(Block.genesis()); 
    });

    it('add a new block', ()=>{
        const data = 'dodo';
        const block = bc.addBlock(data);
        expect(bc.chain[bc.chain.length-1]).toEqual(block);
    });

    it('validates a valid chain', ()=>{
        bc2.addBlock('foo');
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });

    it('invalidates a chain with corrupt genesis block', ()=>{
        bc2.chain[0].data = 'dawdddad';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('invalidates a corrupt chain', ()=>{
        bc2.addBlock('dhdouiahdaw');
        bc2.chain[1].data = 'dadawdawdawdaw';
        expect(bc.isValidChain(bc2.chain)).toBe(false)
    });

    it('replaces the chain with a valid chain', ()=>{
        bc2.addBlock('gooooo');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).toEqual(bc2.chain);
    })

    it('does not replace the chain with one of less than or equal to length', ()=>{
        bc.addBlock('dawdadaw');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).not.toEqual(bc2.chain);
    })


})