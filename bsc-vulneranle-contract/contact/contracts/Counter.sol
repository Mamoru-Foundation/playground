// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Counter {
    uint private count;
    address private _owner;

    event CounterIncreased(uint256 amount);
    event CounterDecreased(uint256 amount);


    constructor(uint num) {
        _owner = msg.sender;
        count = num;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "You aren't the owner");
        _;
    }

    function owner() public view returns (address) {
        return _owner;
    }

    function getCounter() public view returns (uint) {
        return count;
    }

    function increaseCounter(uint256 amount) public onlyOwner {
        count += amount;
        emit CounterIncreased(count);
    }

    function decreaseCounter(uint256 amount) public /*onlyOwner*/ {
        require(count >= amount, "Cannot be lower than 0");
        count -= amount;
        emit CounterDecreased(count);
    }
}





