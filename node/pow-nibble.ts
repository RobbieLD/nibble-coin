import BlockChain from './proof-of-work/block-chain';
import Transaction from './common/transaction';

const chain = new BlockChain(0.1);

const numBlocks = 10
const dummyTransaction = new Transaction('Jack', 'Jill', 100);

for (let i = 0; i < numBlocks; i++) {
    chain.addTransaction(dummyTransaction);
}

console.log(chain);
console.log(chain.isValid())
