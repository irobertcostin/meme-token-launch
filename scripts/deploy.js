// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { ethers, run, network } = require("hardhat")




async function main() {


  const Gom = await ethers.getContractFactory("GOM")

  console.log("Deploying contract ... ");
  const gomContract = await Gom.deploy();
  await gomContract.waitForDeployment();

  const contractAddress = await gomContract.getAddress();
  console.log(`Contract deployed at ${contractAddress}`);

  const deployoor = gomContract.deploymentTransaction();
  console.log(`Contract deployer is: ${deployoor.from}`);

  if (network.config.chainId === 43114) {
    await gomContract.waitForDeployment(6)
    await verify(contractAddress, []);
  }


}



async function verify(contractAddress, arguments) {
  // args will be blank, because of no constructor contract
  // verify for etherscan 
  console.log("Verifying contract ...");


  // if the contract is verified ?!
  try {

    // verify task, verify subtask , and params
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: arguments
    })
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified");
    } {
      console.log(error);
    }
  }
}




// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
