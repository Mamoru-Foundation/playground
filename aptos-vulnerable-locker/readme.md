## Contract

The contract is a token locker taken from Aptos examples and made vulnerable.
The contract is deployed to Aptos Testnet.

How to interact:
- First time only: execute `aptos init`, faucet the account with coins. Then, call `call_init_sponsor.sh`.
- Execute `call_lock_coins.sh` to lock some testnet aptos coins to be available in a year.
- Execute `call_claim_coins.sh` to claim the locked coins. You will see that the call is successful.


## Agent

The agent tracks that claim were valid.
It throws an Alert incident if the claim time was invalid.
By default, it looks for the deployed contract on Aptos Testnet, but it can be overridden during deploy.
