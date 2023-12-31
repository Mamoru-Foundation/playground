import { HardhatUserConfig, task, types } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-solhint";
//import "@nomiclabs/hardhat-etherscan";
import "hardhat-abi-exporter";
import "@nomicfoundation/hardhat-verify";
import {formatEther} from "ethers";


task("verify-etherscan", "Verify deployed contract on Etherscan")
    .addParam("contractAddress", "Contract address deployed", undefined, types.string)
    .setAction(async ({ contractAddress }: { contractAddress: string }, hre) => {
        try {
            await hre.run("verify:verify", {
                address: contractAddress,
                contract: 'contracts/Counter.sol:Counter', // <path-to-contract>:<contract-name>
                constructorArguments: [100], // If your contract has constructor arguments, you can pass them as an array
            })
        } catch ({ message }) {
            console.error(message)
        }
    })

// Show the balance of an account
task("balances", "Prints an accounts balances", async () => {
    const accounts = await ethers.getSigners();

    for (const account of accounts) {
        const balance = await ethers.provider.getBalance(account.address);
        console.log(account.address, formatEther(balance), "ETH");
    }
});

// Show the list of accounts
task("accounts", "Prints the list of accounts", async () => {
    const accounts = await ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});


const PRIVATE_KEY: string = (process.env.PRIVATE_KEY as string) ?? "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const ETHSCAN_API_KEY: string = (process.env.ETHSCAN_API_KEY as string) ?? "";

const config: HardhatUserConfig = {
    solidity: {
        version:"0.8.9",
        settings:{
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    //defaultNetwork: "localhost",
    networks: {
        hardhat: {
        },
        sepolia: {
            url: `https://sepolia.infura.io/v3/181b5fd5f80745f1bb5993c87966ece4`,
            accounts: [PRIVATE_KEY]
        },
        eth_testnet: {
            url: "https://endpoints.omniatech.io/v1/eth/goerli/public",
            chainId: 5,
            gasPrice: 20000000000,
            accounts: [PRIVATE_KEY]
        },
        eth_mainnet: {
            url: "https://ethereum.publicnode.com",
            chainId: 1,
            gasPrice: 20000000000,
            accounts: [PRIVATE_KEY]
        },
        bsc_testnet: {
            url: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
            chainId: 97,
            gasPrice: 20000000000,
            accounts: [PRIVATE_KEY]
        },
        bsc_mainnet: {
            url: "https://bsc-dataseed.bnbchain.org/",
            chainId: 56,
            gasPrice: 20000000000,
            accounts: [PRIVATE_KEY]
        },
        bor_testnet: {
            url: "https://rpc-mumbai.maticvigil.com",
            accounts: [PRIVATE_KEY]
        }
    },
    etherscan: {
        apiKey: ETHSCAN_API_KEY
    }
};

export default config;
