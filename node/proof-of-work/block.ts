import * as crypto from 'crypto';
import Transaction from '../common/transaction';


export default class Block {

    private timestamp: string;
    private data: Transaction;
    private nonce: number;
    private hash: string;
    private prevHash: string;

    public get Hash(): string {
        return this.hash;
    }

    constructor(timestamp: string, prevHash: string, data: Transaction) {
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.getHash();
        this.prevHash = prevHash;
        this.nonce = 0;
    }

    private SHA256(message: string) : string {
        return crypto.createHash('sha256').update(message).digest('hex');
    }

    public getHash() : string {
        return this.SHA256(this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce);
    }

    public isValid(previousBlock: Block) : boolean {
        return this.hash === this.getHash() && this.prevHash === previousBlock.hash;
    }

    public mine(difficulty: number) {

        // To make the block 'difficult' to calculate we have to keep guessing new 
        // hashes (by incrimenting the nonce which is used in the hash) and seeing 
        // if the hash meets out difficulty requirment. In this case it's that it
        // must start with a given number of 0s
        while (!this.hash.startsWith(Array(Math.trunc(difficulty) + 1).join('0'))) {
            // We increases our nonce so that we can get a whole different hash.
            this.nonce++;
            // Update our new hash with the new nonce value.
            this.hash = this.getHash();
        }

        console.log(`Block mined with nonce: ${this.nonce}`)
    }
}
