# ETH/BSC Vulnerable Counter

## Contract

The contract is `counter` from Eth/Bsc Examples.
The only difference is that `decreaseCounter` is not restricted to the owner (let's say due to a developer mistake).
The contract is already deployed to Sepolia and Bsc Testnet.
See `increment.sh` and `decrement.sh` to call.

## Agent

Agent check if the `decreaseCounter` caller is the owner of the contract.
If not, it will produce `Alert` incident.

## Run before using

install mamoru-cli

`npm install -g mamoru-cli`

install dependencies

```npm install```

build agent

`mamoru-cli build`