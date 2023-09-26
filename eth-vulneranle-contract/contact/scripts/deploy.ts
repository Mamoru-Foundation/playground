import {artifacts, ethers} from "hardhat";
import * as path from "path";
import { Counter } from "../typechain-types";

async function main() {
  const initNum = 100;
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const counter = await ethers.deployContract("Counter", [initNum]);

  await counter.waitForDeployment();

  console.log(
      `Counter with ${initNum} deployed to ${counter.target}`
  );
  saveFrontendFiles(counter);
}

function saveFrontendFiles(counter: Counter) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  console.log('contractsDir:', contractsDir);

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, {recursive: true});
  }

  fs.writeFileSync(
      path.join(contractsDir, "contract-address.json"),
      JSON.stringify({ Counter: counter.target }, undefined, 2)
  );

  const CounterArtifact = artifacts.readArtifactSync("Counter");

  fs.writeFileSync(
      path.join(contractsDir, "Counter.json"),
      JSON.stringify(CounterArtifact, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
