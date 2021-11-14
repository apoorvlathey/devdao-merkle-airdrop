# Token Snapshot: Create ERC721 Token Snapshot

> Forked from [erc721-snapshot](https://github.com/0xSlot/erc721-snapshot)

## Setup

Refer to `.env.sample` and create `.env` with the required values

<hr />

This command-line utility creates a snapshot of any ERC721 token in JSON or CSV format. Use your own fully synced Ethereum node or any _Ethereum node as a service_ like Infura.

- Works without a local Ethereum node.
- Automatically resumes the next time upon failure.
- Tested to work with Infura.

## Getting Started

```
npm install erc721-snapshot -g
```

### CLI Arguments

None. Prompts for user input and produces a configuration file on the first run.

### How to Use Token Snapshot?

Navigate to a directory where you'd like to save the token snapshot to.

```
cd path/to/a/directory
```

Run the program:

```
erc721-snapshot
```

## Configuration File / Prompt Parameters

To avoid getting prompted for each configuration parameters, each time `erc721-snapshot` is ran, have a `./snapshot.config.json` file at the same location as `erc721-snapshot` is executed.

```json
{
  "provider": "https://mainnet.infura.io/v3/<key>",
  "contractAddress": "",
  "fromBlock": 0,
  "toBlock": "latest",
  "format": "json",
  "blocksPerBatch": 2500,
  "delay": 0,
  "checkIfContract": true
}
```

### provider

Enter your fully synced Ethereum node. Could be a local node or remote services like Infura.

### contractAddress

Address of your ERC721 contract.

### fromBlock

The block height to scan from. To save time, enter the block number of the transaction your token was created on.

### toBlock

The block height to end the scan at.

### blocksPerBatch

The number of blocks to query per batch.

If you are using remote service like Infura, keep this number relative low (2000-5000) to avoid rate limits. If you are using a dedicated Ethereum node, you can increase this number to suit your needs.

### delay

The delay (in ms) between each request in the loop. Tweak this if you are experiencing rate limit from your provider.

### checkIfContract

Checks each address to determine whether it is a smart contract or an Ethereum wallet.
