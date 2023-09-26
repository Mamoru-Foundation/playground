import {ethers} from "hardhat";

async function main () {
    //BCS testnet
    const contractAddress = "0x0F0F0a53F15eE3Ad5bf981CC9396603c3D2f0f32";
    const [deployer] = await ethers.getSigners();

    // Load the Counter contract
    const counter = await ethers.getContractAt("Counter", contractAddress, deployer);
    // const Counter = await ethers.getContractFactory('Counter');
    //const counter  = Counter.attach(contractAddress)

    console.log("Contract address: ", await counter.getAddress());
    console.log("Contract owner: ", await counter.owner());

    // Call the getCounter function to retrieve the current count
    const response = await counter.increaseCounter(1);
    await response.wait();

    console.log(`Current count: ${await counter.getCounter()}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });