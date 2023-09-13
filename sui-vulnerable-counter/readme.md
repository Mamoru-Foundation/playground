# Sui Vulnerable Counter

## Contract

The contract is `counter` from Sui Examples. 
The only difference is that `set_value` is not restricted to the owner (let's say due to a developer mistake).
The contract is already deployed to Sui Testnet.
See `call_set_value.sh` to call.

## Agent

Agent check if the `set_value` caller is the owner of the contract.
If not, it will produce `Alert` incident.
It is deployed to Mamoru Devnet. By default, it looks for the deployed contract on Sui Testnet.
