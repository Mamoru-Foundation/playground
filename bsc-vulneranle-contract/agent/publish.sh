set -ex

export MAMORU_PRIVATE_KEY=
export GRAPHQL_BASE=https://mamoru-be-development.mamoru.foundation/graphql
mamoru-cli publish --rpc "https://devnet.chain.mamoru.foundation:26657"  --gas 1900000 -c ETH_TESTNET