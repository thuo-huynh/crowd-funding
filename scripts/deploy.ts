import { Contract } from "ethers";
import fs from "fs";
import { artifacts, ethers, network } from "hardhat";
import path from "path";

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("Token");
  const CrowdFunding = await ethers.getContractFactory("CrowdFunding");

  const token = await Token.deploy();
  const crowdFundingContract = await CrowdFunding.deploy(token.address);

  await token.deployed();
  await crowdFundingContract.deployed();

  console.log("Token address:", token.address);
  console.log("Marketplace address:", crowdFundingContract.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles({
    crowdFundingContract,
    crowdFundingName: "CrowdFunding",
    tokenContract: token,
    tokenName: "Token",
  });
}

function saveFrontendFiles({
  tokenContract,
  crowdFundingContract,
  tokenName,
  crowdFundingName,
}: {
  tokenContract: Contract;
  crowdFundingContract: Contract;
  tokenName: string;
  crowdFundingName: string;
}) {
  const contractsDir = path.join(
    __dirname,
    "..",
    "frontend",
    "src",
    "contracts"
  );

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify(
      {
        nftAddress: tokenContract.address,
        marketplaceAddress: crowdFundingContract.address,
      },
      undefined,
      2
    )
  );
  const TokenArtifact = artifacts.readArtifactSync(tokenName);
  const CrowdFundingArtifact = artifacts.readArtifactSync(crowdFundingName);

  fs.writeFileSync(
    path.join(contractsDir, tokenName + ".json"),
    JSON.stringify(TokenArtifact, null, 2)
  );
  fs.writeFileSync(
    path.join(contractsDir, crowdFundingName + ".json"),
    JSON.stringify(CrowdFundingArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
