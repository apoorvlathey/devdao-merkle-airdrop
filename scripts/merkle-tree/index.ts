import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { ethers } from "ethers";
import { parseEther, formatEther } from "@ethersproject/units";
import BN from "bignumber.js";
import { saveToFile } from "./utils";

const _snapshot = require("./snapshots/DEVS_Snapshot_13612670.json");
const snapshot: tokenBalanceSnapshot = _snapshot;

type tokenBalanceSnapshot = {
  wallet: string;
  tokenIds: string[];
  type?: string;
}[];

const getTotalUniqueWallets = () => {
  return new BN(snapshot.length);
};

const getNodeLeaf = (
  _airdropIndex: number,
  _token: string,
  _user: string,
  _amount: string
) => {
  return Buffer.from(
    ethers.utils
      .solidityKeccak256(
        ["uint256", "address", "address", "uint256"],
        [_airdropIndex, _token, _user, _amount]
      )
      .slice(2),
    "hex"
  );
};

interface UserData {
  [user: string]: {
    airdropAmountInWei: string;
    airdropAmount: string;
    proof: string[];
  };
}

const main = () => {
  const airdropIndex = 0;
  const tokenAddress = "0x2d651b707C9c535cf7FB88c8C4E13D1fcE55025f";
  const tokenSymbol = "DEV";
  const tokenImg = "/images/tokens/dev.png";
  const totalTokensToAirdrop = new BN(parseEther("1000000").toString());

  const totalUniqueWallets = getTotalUniqueWallets();
  const airdropAmount = totalTokensToAirdrop.div(totalUniqueWallets).toFixed(0);

  let userData: UserData = {};

  const merkleTree = new MerkleTree(
    snapshot.map((x) => {
      const user = x.wallet.toLowerCase();

      const leaf = getNodeLeaf(airdropIndex, tokenAddress, user, airdropAmount);

      userData[user] = {
        airdropAmountInWei: airdropAmount,
        airdropAmount: formatEther(airdropAmount).toString(),
        proof: [""], // empty for now, as would be calculated after merkle tree is generated
      };

      return leaf;
    }),
    keccak256,
    { sortPairs: true }
  );

  for (const user in userData) {
    userData[user].proof = merkleTree.getHexProof(
      getNodeLeaf(
        airdropIndex,
        tokenAddress,
        user,
        userData[user].airdropAmountInWei
      )
    );
  }

  let output: {
    root: string;
    airdropIndex: number;
    token: string;
    tokenSymbol: string;
    tokenImg: string;
    totalTokensToAirdropInWei: string;
    userData: UserData;
  } = {
    root: merkleTree.getHexRoot(),
    airdropIndex,
    token: tokenAddress,
    tokenSymbol,
    tokenImg,
    totalTokensToAirdropInWei: totalTokensToAirdrop.toFixed(),
    userData,
  };

  saveToFile(`${airdropIndex}_${tokenAddress}`, output);
};

main();
