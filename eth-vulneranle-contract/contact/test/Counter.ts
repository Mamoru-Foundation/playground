import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Test Counter contract", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployCounter() {


    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const initNum = 100;
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy(initNum);

    return { counter, initNum, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right init count", async function () {
      const { counter, initNum } = await loadFixture(deployCounter);

      expect(await counter.getCounter()).to.equal(initNum);
    });

    it("Should set the right owner", async function () {
      const { counter, owner } = await loadFixture(deployCounter);

      expect(await counter.owner()).to.equal(owner.address);
    });

  });

  describe("Counter", function () {
    describe("increaseCounter", function () {

      it("Should revert with the right error if called from another account", async function () {
        const { counter, otherAccount } = await loadFixture(
          deployCounter
        );


        // We use lock.connect() to send a transaction from another account
        await expect(counter.connect(otherAccount).increaseCounter(1)).to.be.revertedWith(
          "You aren't the owner"
        );
      });
    });

    describe("decreaseCounter", function () {
      it("Should revert with the right error if called from another account", async function () {
        const { counter, otherAccount } = await loadFixture(deployCounter);

        // We use lock.connect() to send a transaction from another account
        await expect(counter.connect(otherAccount).decreaseCounter(1)).to.be.revertedWith(
            "You aren't the owner"
        );
      });
    });

    describe("Events", function () {
      it("Should emit an event on increaseCounter", async function () {
        const { counter, initNum } = await loadFixture(deployCounter);
        const newNum = initNum + 1;
        await expect(counter.increaseCounter(1))
          .to.emit(counter, "CounterIncreased")
          .withArgs(newNum); // We accept any value as `when` arg
      });

      it("Should emit an event on decreaseCounter", async function () {
        const { counter, initNum } = await loadFixture(deployCounter);
        const newNum = initNum - 1;
        await expect(counter.decreaseCounter(1))
            .to.emit(counter, "CounterDecreased")
            .withArgs(newNum); // We accept any value as `when` arg
      });
    });

  });
});
