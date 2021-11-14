import { HardhatRuntimeEnvironment, Network } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const merkleDistributorName = "MerkleAirdropDistributor";
const devTokenName = "DEV";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const merkleDistributor = await deploy(merkleDistributorName, {
    from: deployer,
    log: true,
  });

  await deploy(devTokenName, {
    args: [merkleDistributor.address],
    from: deployer,
    log: true,
  });
};
export default func;
func.tags = [merkleDistributorName, devTokenName];
