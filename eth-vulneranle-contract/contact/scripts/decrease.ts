import {ethers} from "hardhat";

async function main () {
    const contractAddress = "0xb7B5fD1eeBb5A609E67146fF8B015aD79be08F03";
    const [deployer] = await ethers.getSigners();

    // Load the Counter contract
    const counter = await ethers.getContractAt("Counter", contractAddress, deployer);
    // const Counter = await ethers.getContractFactory('Counter');
    //const counter  = Counter.attach(contractAddress)

    console.log("Contract address: ", await counter.getAddress());
    console.log("Contract owner: ", await counter.owner());

    // Call the getCounter function to retrieve the current count
    const response = await counter.decreaseCounter(1);
    const receipt = await response.wait();

   // console.log(`EventLog: `, receipt?.logs[0]);
    console.log(`Current count: ${await counter.getCounter()}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });