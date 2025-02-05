import { ethers } from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Token contract", function () {
  async function deployCrowdFundingFixture() {
    // Deploy an ERC20 token for testing
    const TestToken = await ethers.getContractFactory("Token");
    const token = await TestToken.deploy();
    await token.deployed();

    // Deploy the CrowdFunding contract
    const CrowdFunding = await ethers.getContractFactory("CrowdFunding");
    const crowdFunding = await CrowdFunding.deploy(token.address);
    await crowdFunding.deployed();

    const [owner, addr1, addr2] = await ethers.getSigners();

    // Mint some tokens to addr1 and addr2 for testing
    await token.mint(addr1.address, ethers.utils.parseEther("100"));
    await token.mint(addr2.address, ethers.utils.parseEther("100"));

    return { crowdFunding, token, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { crowdFunding, owner, addr1 } = await loadFixture(
        deployCrowdFundingFixture
      );
    });
  });
});
