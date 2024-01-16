// test/deployScript.test.js
const { expect } = require("chai");
const { ethers, run, network } = require("hardhat");



describe("Deploy Script", function () {

    let gomContractFactory;
    let gomContract;

    // before testing, deploy the contract
    beforeEach(async function () {
        gomContractFactory = await ethers.getContractFactory("GOM")
        gomContract = await gomContractFactory.deploy()
    })


    it("Should deploy GOM contract", async function () {

        // Get the contract address
        const contractAddress = gomContract.target;


        // Check if the contract is deployed
        expect(contractAddress).to.not.equal("0");
        console.log(contractAddress);

    });


    it("Deployment should assign the total supply of tokens to the owner", async function () {
        const [owner] = await ethers.getSigners();

        // const hardhatToken = await ethers.deployContract("Token");

        const ownerBalance = await gomContract.balanceOf(owner.address);
        console.log(ownerBalance);
        expect(await gomContract.totalSupply()).to.equal(ownerBalance);
    });
});


