import { ethers, network } from "hardhat";
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

    const [owner, addr1, addr2, addr3] = await ethers.getSigners();

    // Mint some tokens to addr1 and addr2 for testing
    await token.mint(addr1.address, ethers.utils.parseEther("100"));
    await token.mint(addr2.address, ethers.utils.parseEther("100"));
    await token.mint(addr3.address, ethers.utils.parseEther("100"));

    return { crowdFunding, token, owner, addr1, addr2, addr3 };
  }

  describe("Deployment", function () {
    it("Should set the correct ERC20 token address", async function () {
      const { crowdFunding, token } = await loadFixture(
        deployCrowdFundingFixture
      );
      expect(await crowdFunding.token()).to.equal(token.address);
    });
  });

  describe("Campaign Management", function () {
    it("Should allow users to create a campaign", async function () {
      const { crowdFunding, addr1 } = await loadFixture(
        deployCrowdFundingFixture
      );

      await expect(
        crowdFunding
          .connect(addr1)
          .createCampaign(
            addr1.address,
            "Test Campaign",
            "Description for test campaign",
            ethers.utils.parseEther("50"),
            Math.floor(Date.now() / 1000) + 86400,
            "https://example.com/image.jpg"
          )
      ).to.emit(crowdFunding, "CampaignCreated");

      const campaign = await crowdFunding.campaigns(0);
      expect(campaign.owner).to.equal(addr1.address);
      expect(campaign.title).to.equal("Test Campaign");
      expect(campaign.target).to.equal(ethers.utils.parseEther("50"));
    });

    it("Should not allow creating a campaign with invalid inputs", async function () {
      const { crowdFunding, addr1 } = await loadFixture(
        deployCrowdFundingFixture
      );

      await expect(
        crowdFunding.connect(addr1).createCampaign(
          ethers.constants.AddressZero, // Invalid owner
          "Invalid Campaign",
          "Invalid description",
          ethers.utils.parseEther("50"),
          Math.floor(Date.now() / 1000) + 86400,
          "https://example.com/image.jpg"
        )
      ).to.be.revertedWith("Invalid owner address");

      await expect(
        crowdFunding.connect(addr1).createCampaign(
          addr1.address,
          "Invalid Campaign",
          "Invalid description",
          0, // Invalid target
          Math.floor(Date.now() / 1000) + 86400,
          "https://example.com/image.jpg"
        )
      ).to.be.revertedWith("Target must be greater than 0");

      await expect(
        crowdFunding.connect(addr1).createCampaign(
          addr1.address,
          "Invalid Campaign",
          "Invalid description",
          ethers.utils.parseEther("50"),
          Math.floor(Date.now() / 1000) - 86400, // Invalid deadline (past)
          "https://example.com/image.jpg"
        )
      ).to.be.revertedWith("The deadline should be a date in the future.");
    });
  });

  describe("Donations", function () {
    it("Should allow users to donate to a campaign", async function () {
      const { crowdFunding, token, addr1, addr2 } = await loadFixture(
        deployCrowdFundingFixture
      );

      await crowdFunding
        .connect(addr1)
        .createCampaign(
          addr1.address,
          "Charity Campaign",
          "A campaign for charity",
          ethers.utils.parseEther("100"),
          Math.floor(Date.now() / 1000) + 86400,
          "https://example.com/image.jpg"
        );

      await token
        .connect(addr2)
        .approve(crowdFunding.address, ethers.utils.parseEther("20"));

      await expect(
        crowdFunding
          .connect(addr2)
          .donateToCampaign(0, ethers.utils.parseEther("20"))
      ).to.emit(crowdFunding, "DonationReceived");

      const campaign = await crowdFunding.campaigns(0);
      expect(campaign.amountCollected).to.equal(ethers.utils.parseEther("20"));
    });

    it("Should not allow donations after deadline", async function () {
      const { crowdFunding, token, addr1, addr2 } = await loadFixture(
        deployCrowdFundingFixture
      );

      // Create a campaign with a future deadline
      const futureDeadline = Math.floor(Date.now() / 1000) + 100; // 100 seconds from now

      await crowdFunding.connect(addr1).createCampaign(
        addr1.address,
        "Valid Campaign",
        "A campaign that will expire soon",
        ethers.utils.parseEther("50"),
        futureDeadline, // Future deadline
        "https://example.com/image.jpg"
      );

      // Fast-forward time to after the deadline
      await network.provider.send("evm_increaseTime", [200]); // Increase time by 200 seconds
      await network.provider.send("evm_mine"); // Mine a new block

      // Attempt donation after deadline
      await token
        .connect(addr2)
        .approve(crowdFunding.address, ethers.utils.parseEther("10"));

      await expect(
        crowdFunding
          .connect(addr2)
          .donateToCampaign(0, ethers.utils.parseEther("10"))
      ).to.be.revertedWith("Campaign has ended");
    });

    it("Should update donation records correctly", async function () {
      const { crowdFunding, token, addr1, addr2, addr3 } = await loadFixture(
        deployCrowdFundingFixture
      );

      await crowdFunding
        .connect(addr1)
        .createCampaign(
          addr1.address,
          "Education Support",
          "Fund for education",
          ethers.utils.parseEther("100"),
          Math.floor(Date.now() / 1000) + 86400,
          "https://example.com/image.jpg"
        );

      await token
        .connect(addr2)
        .approve(crowdFunding.address, ethers.utils.parseEther("15"));
      await token
        .connect(addr3)
        .approve(crowdFunding.address, ethers.utils.parseEther("25"));

      await crowdFunding
        .connect(addr2)
        .donateToCampaign(0, ethers.utils.parseEther("15"));
      await crowdFunding
        .connect(addr3)
        .donateToCampaign(0, ethers.utils.parseEther("25"));

      const [donators, donations] = await crowdFunding.getDonators(0);
      expect(donators.length).to.equal(2);
      expect(donators[0]).to.equal(addr2.address);
      expect(donators[1]).to.equal(addr3.address);
      expect(donations[0]).to.equal(ethers.utils.parseEther("15"));
      expect(donations[1]).to.equal(ethers.utils.parseEther("25"));
    });
  });

  describe("Retrieving Campaigns", function () {
    it("Should return all campaigns", async function () {
      const { crowdFunding, addr1, addr2 } = await loadFixture(
        deployCrowdFundingFixture
      );

      await crowdFunding
        .connect(addr1)
        .createCampaign(
          addr1.address,
          "Campaign 1",
          "First campaign",
          ethers.utils.parseEther("50"),
          Math.floor(Date.now() / 1000) + 86400,
          "https://example.com/image1.jpg"
        );

      await crowdFunding
        .connect(addr2)
        .createCampaign(
          addr2.address,
          "Campaign 2",
          "Second campaign",
          ethers.utils.parseEther("75"),
          Math.floor(Date.now() / 1000) + 86400,
          "https://example.com/image2.jpg"
        );

      const campaigns = await crowdFunding.getCampaigns();
      expect(campaigns.length).to.equal(2);
      expect(campaigns[0].title).to.equal("Campaign 1");
      expect(campaigns[1].title).to.equal("Campaign 2");
    });
  });
});
