const Block = require('./block');

class Blockchain {
    constructor(){
        this.chain = [Block.genesis()];
    }

    addBlock(data){
        const block = Block.mineBlock(this.chain[this.chain.length-1], data);
        this.chain.push(block);

        return block;
    }   

    isValidChain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())){
            return false;
        }
        
        for(let i = 1; i < chain.length;i++){
            if (chain[i].lastHash !== chain[i-1].hash
                || JSON.stringify(chain[i].hash) !== JSON.stringify(Block.blockHash(chain[i]))){
                    return false;
            }
        }
        
        return true;
    }

    replaceChain(newChain){
        if (newChain.length <= this.chain.length){
            console.log('Received chain is not longer than the current chain');
            return;
        } else if (!this.isValidChain(newChain)){
            console.log('The recevied chain is not valid');
            return;
        }

        console.log('Replacing the blockchain with new chain')
        this.chain = newChain;         
    }
}

module.exports = Blockchain;