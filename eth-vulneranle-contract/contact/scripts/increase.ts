import {ethers} from "hardhat";

async function main () {
    // Sepolia
    const contractAddress = (process.env.CONTRACT_ADDRESS as string) ??  "0xb7b5fd1eebb5a609e67146ff8b015ad79be08f03";
    const [deployer] = await ethers.getSigners();

    // Load the Counter contract
    const counter = await ethers.getContractAt("Counter", contractAddress, deployer);
    // const Counter = await ethers.getContractFactory('Counter');
    //const counter  = Counter.attach(contractAddress)

    console.log("Contract address: ", await counter.getAddress());
    console.log("Contract owner: ", await counter.owner());

    // Call the getCounter function to retrieve the current count
    const response = await counter.increaseCounter(1);
    const receipt = await response.wait();
    console.log(`Transaction hash: ${receipt?.transactionHash}`);
   // console.log(`EventLog: `, receipt?.logs[0]);
    console.log(`Current count: ${await counter.getCounter()}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });