#!/usr/bin/env sh

set -xe

SPONSOR_ADDRESS="0x$(aptos account lookup-address | jq -r ".Result")"
RECEIVER_ADDRESS=${SPONSOR_ADDRESS}
YEAR_LATER=$(date -v+1y +%s)

APTOS_TESTNET_LOCKER_MODULE='0xb5d81192ebe4e6201673301ea8018549fcda2ff4c1dd5c60d76041d0ddecf0bf::locked_coins'

aptos move run \
  --function-id ${APTOS_TESTNET_LOCKER_MODULE}::add_locked_coins \
  --args "address:${RECEIVER_ADDRESS}" \
  --args "u64:1000000" \
  --args "u64:${YEAR_LATER}" \
  --type-args '0x1::aptos_coin::AptosCoin' \
  --assume-yes
