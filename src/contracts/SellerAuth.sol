// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Auth {
    address private owner;
    // Owners password
    string private secret;

    // Authorized sellers
    mapping (address => bool) private sellers;

    // event for EVM logging
    event OwnerSet(address indexed oldOwner, address indexed newOwner);
    event SellerSet(address indexed seller);

    // modifier to check if caller is owner
    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    // modifier to check if caller is authorized seller
    modifier isAuthorizedSeller() {
        require(sellers[msg.sender], "Caller is not an authorized seller");
        _;
    }

    /**
     * * dev: Set contract deployer as owner
     */
    constructor() {
        owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
        secret = "secret"; // Owners password/secret
        emit OwnerSet(address(0), owner);
    }

    /**
     * * dev: Change owner and secret
     * * param: newOwner address of new owner, new secret, old secret
     */
    function changeOwner(address newOwner, string memory newSecret, string memory currentSecret) public isOwner {
        require(keccak256(abi.encodePacked(currentSecret)) == keccak256(abi.encodePacked(secret)), "Incorrect owners secret string: changeOwner(newOwner, newSecret, currentSecret)");
        emit OwnerSet(owner, newOwner);
        owner = newOwner;
        secret = newSecret;
    }

    /**
     * * dev: Return owner address 
     * * return: address of owner
     */
    function getOwner() public view returns (address) {
        return owner;
    }

    /**
     * * dev: add seller address to authorized seller mapping 
     * * param: sellersAddress of seller
     */
    function addSeller (address sellersAddress) public isOwner {
        emit SellerSet(sellersAddress);
        sellers[sellersAddress] = true;
    }

    /**
     * * dev: remove seller address from authorized seller mapping 
     * * param: address of seller
     */
    function removeSeller (address sellersAddress) public isOwner {
        require(sellers[msg.sender], "Already not an authorized seller");
        sellers[sellersAddress] = false;
    }

    /**
     * * dev: check if seller is authorized by the owner 
     * * return: address of true or false
     */
    function checkSeller(address sellersAddress) public view returns (bool) {
        return sellers[sellersAddress] == true;
    }
}
