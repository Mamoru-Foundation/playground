import {ethers} from "hardhat";

async function main () {
    const contractAddress = "0xb7B5fD1eeBb5A609E67146fF8B015aD79be08F03";
    const [deployer] = await ethers.getSigners();

    // Load the Counter contract
     const counter = await ethers.getContractAt("Counter", contractAddress, deployer);
   // const Counter = await ethers.getContractFactory('Counter');
    //const counter  = Counter.attach(contractAddress)

    console.log("Contract address: ", await counter.getAddress());
    //console.log("Contract ABI: ", counter.interface.format());
    // Call the getCounter function to retrieve the current count
    const currentCount = await counter.getCounter();

    console.log(`Current count: ${currentCount.toString()}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });