#!/usr/bin/env sh

timestamp_ms_to_human_date() {
  date -r $(($1 / 1000))
}

TESTNET_PACKAGE_ID="0x9c0b30d6717142694a6de87249e9b92c58d2018d750f8abd7d7b16a067bfca5b"
TESTNET_COUNTER_ADDRESS="0xc7dcfe7b9be4efb80ff567dbf212694ba1462693a58c19f5e41958b03cf9aee5"

TX_RESPONSE=$(sui client call --json --gas-budget 10000000 --package ${TESTNET_PACKAGE_ID} --module counter --function set_value --args ${TESTNET_COUNTER_ADDRESS} 300)

DIGEST=$(echo $TX_RESPONSE | jq -r ".digest")

echo "Tx digest: ${DIGEST}"

TIMESTAMP_MS=$(sui client tx-block ${DIGEST} --json | jq -r ".timestampMs")

echo "Commit timestamp: $(timestamp_ms_to_human_date ${TIMESTAMP_MS})"
