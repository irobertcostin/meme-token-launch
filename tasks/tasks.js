import "@nomicfoundation/hardhat-toolbox";



task("balance", "Prints an account's balance")
    .addParam("account", "The account's address")
    .setAction(async (taskArgs) => {
        const balance = await ethers.provider.getBalance(taskArgs.account)

        console.log(ethers.formatEther(balance), "ETH");

        // can be run with 
        // npx hardhat balance --account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
    })


task("block-number", "Prints the current block number ")
    .setAction(async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber();
        console.log("Current block number:", blockNumber);
    })


module.exports = {};