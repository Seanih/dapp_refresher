// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Refresher {
    address public immutable owner;
    personInfo[] public allPeople;

    struct personInfo {
        string name;
        uint8 age;
        string occupation;
    }

    event PersonAdded(
        string indexed _name,
        uint8 indexed _age,
        uint indexed _timeAdded
    );

    constructor() {
        owner = msg.sender;
    }

    function addPerson(
        string memory _name,
        uint8 _age,
        string memory _occupation
    ) public returns (bool success) {
        require(bytes(_name).length > 0, "name can't be blank");
        require(_age >= 18, "must be at least 18");
        require(bytes(_occupation).length > 0, "occupation can't be blank");

        personInfo memory newPerson;

        newPerson.name = _name;
        newPerson.age = _age;
        newPerson.occupation = _occupation;

        allPeople.push(newPerson);

        emit PersonAdded(_name, _age, block.timestamp);

        return success = true;
    }
}
