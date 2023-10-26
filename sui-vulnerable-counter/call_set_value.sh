#!/usr/bin/env sh

timestamp_ms_to_human_date() {
  date -r $(($1 / 1000))
}

TESTNET_PACKAGE_ID="0x4958a3a96e91380a443d116b84c07b48dba90bce664d9f060f94a8f26f537e62"
TESTNET_COUNTER_ADDRESS="0xaa6752395f8740b1ee6cee50d43cf3a1b703c06ade0a7f730032e8d20e7c5861"

TX_RESPONSE=$(sui client call --json --gas-budget 10000000 --package ${TESTNET_PACKAGE_ID} --module counter --function set_value --args ${TESTNET_COUNTER_ADDRESS} 300)

DIGEST=$(echo $TX_RESPONSE | jq -r ".digest")

echo "Tx digest: ${DIGEST}"

TIMESTAMP_MS=$(sui client tx-block ${DIGEST} --json | jq -r ".timestampMs")

echo "Commit timestamp: $(timestamp_ms_to_human_date ${TIMESTAMP_MS})"
