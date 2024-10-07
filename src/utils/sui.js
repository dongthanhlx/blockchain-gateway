const { Ed25519Keypair } = require('@mysten/sui/keypairs/ed25519');
const { getFullnodeUrl, SuiClient } = require('@mysten/sui/client');
const { Transaction } = require('@mysten/sui/transactions')

function generateAddress() {
    const keyPair = new Ed25519Keypair();

    return {
        address: keyPair.toSuiAddress(),
        private_key: keyPair.getSecretKey()
    }
}

async function buildTransaction({amount, fromKey, sendTo}) {
    const client = new SuiClient({
        url: getFullnodeUrl('mainnet')
    })
    const tx = new Transaction();
    const keypair = Ed25519Keypair.fromSecretKey(fromKey)

    const [coin] = tx.splitCoins(tx.gas, [amount * 1000000000]);

    tx.transferObjects([coin], sendTo);

    let result = await client.signAndExecuteTransaction({
        signer: keypair, transaction: tx
    })

    let {digest} = await client.waitForTransaction({ digest: result.digest });

    return digest;
}

module.exports = {generateAddress, buildTransaction}
