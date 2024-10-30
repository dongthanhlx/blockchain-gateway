const { Ed25519Keypair } = require('@mysten/sui/keypairs/ed25519');
const { getFullnodeUrl, SuiClient } = require('@mysten/sui/client');
const { Transaction } = require('@mysten/sui/transactions')
const Decimal = require('decimal.js')

function generateAddress() {
    const keyPair = new Ed25519Keypair();

    return {
        address: keyPair.toSuiAddress(),
        private_key: keyPair.getSecretKey()
    }
}

async function buildTransaction({amount, fromKey, sendTo}) {
    const client = new SuiClient({
        url: 'https://rpc.ankr.com/sui/0b0b99eee34ea3c2ab0132f62e87e8ed05d5ffec286f41d88ba87117fcea6e9d'
    })
    const tx = new Transaction();
    const keypair = Ed25519Keypair.fromSecretKey(fromKey)

    const [coin] = tx.splitCoins(tx.gas, [Decimal.mul(amount, 1000000000)]);

    tx.transferObjects([coin], sendTo);

    let result = await client.signAndExecuteTransaction({
        signer: keypair, transaction: tx
    })

    let {digest, effects} = await client.waitForTransaction({ digest: result.digest, options: {showEffects: true} });

    return digest;
}

module.exports = {generateAddress, buildTransaction}
