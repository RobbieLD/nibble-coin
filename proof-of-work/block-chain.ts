import Block from './block';
import Transaction from '../common/transaction';

export default class BlockChain {

    private chain: Block[];
    private difficulty: number;

    // This is how much the difficulty should be increased for every transaction
    private difficultyScale: number;

    constructor(scale: number) {
        // Seed the chain with a new block
        this.chain = [new Block(Date.now().toString(), '', new Transaction('', '', 0))];
        this.difficulty = 1;
        this.difficultyScale = scale;

        console.log(`Creating block chain with a maximum number of blocks set at ${64 / this.difficultyScale}`)
    }

    private getLastBlock() : Block {
        return this.chain[this.chain.length - 1];
    }

    public isValid() : boolean {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Check if the block is valid. To be valid it's hash must be equal
            // to what the hashing algorithm returns and also it's previous hash
            // must be equal to what the previous blocks hash
            if (!currentBlock.isValid(previousBlock)) {
                return false;
            }
        }

        return true;
    }

    public addTransaction(transaction: Transaction) {
        const block = new Block(Date.now().toString(), this.getLastBlock().Hash, transaction);
        block.mine(this.difficulty);

        this.chain.push(block);

        // We update the difficulty to make calculating the next block harder.
        this.difficulty += this.difficultyScale;
    }
}
