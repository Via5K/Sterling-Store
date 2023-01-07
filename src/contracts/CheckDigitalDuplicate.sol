// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract checkDigitalDuplicate {
    /*Structure that is used in mapping to make sure that if the address of the company is 
    resent then it is registered with the name also. This is to make sure that if a comapny 
    is registered as selling phones, then while checking digital duplicate we do not check 
    it with the company that is selling pens.
    Eg: companyA = selling phones with company name as AB= address of thsi company is x
    So it is registered in our decentralised database as 
    x => {true, AB}

    Now if in ecom, it is selling pens now then?
    company A = selling Pens with company name as BB = address of this company is x
    So we will check with our database it will say that this is registered with us, but 
    because its name doesn't matches, it will reject it saying that it is a digital duplicate.
    */
    struct prop {
        bool toggle; //if false means the address is not in the list
        string companyName; //makes sure that the name also matches like we are not saying that buy this phone if it is verfied as a pen address.
    }
    //takes the company address and stores them
    mapping(address => prop) public companyAddresses;
    //has a list of users who are verified to add new users that can add company addresses in the list.
    mapping(address => bool) public verifiedUserList;

    //make the owner as verified user.
    constructor() {
        verifiedUserList[msg.sender] = true;
    }

    //checks duplicate... by taking 2 address params
    modifier duplicate(address _original, address _current) {
        require(_original == _current, "Yes it is a Digital Duplicate");
        _;
    }
    //modfier that restricts the user if the user is not verified
    modifier VerifiedUser() {
        require(
            verifiedUserList[msg.sender] == true,
            "You need to be a verified User to add Address in the list."
        );
        _;
    }

    //adds a user in the verifiedUserList, if the user is verfiedUser
    //only a verified user can add a new verified user...
    function addVerifiedUser(address _user) public VerifiedUser {
        verifiedUserList[_user] = true;
    }

    //addCompanyAddress
    /** takes a new address and puts it in the originalAddress mapping. 
    And makes sure that the person who is adding this address is verified user.
     */
    function addCompanyAddress(address _newAddress, string memory _companyName)
        public
        VerifiedUser
    {
        //if company is already registered then we are not going to change anything and will return
        if (companyAddresses[_newAddress].toggle == true) {
            return; //with a status that the address is already in the list....
        }
        //otherwise change the name and make it as true
        companyAddresses[_newAddress].companyName = _companyName;
        companyAddresses[_newAddress].toggle = true;
    }

    //original means the original owner that we think
    //current means the current seller address form whom we are trying to buy it.
    //manual check is when the user sends the address along with the original and current one....
    function manualCheck(address _original, address _current)
        public
        pure
        duplicate(_original, _current)
        returns (bool)
    {
        return true;
        //if not true then it is false;
    }

    //make sure that company name is sent in all lower cases....
    //auto check is from our own database...
    function autoCheck(address _current, string memory _companyName)
        public
        view
        returns (bool)
    {
        require(
            companyAddresses[_current].toggle == true,
            "Yes it is a digital duplicate"
        );
        require(
            keccak256(
                abi.encodePacked(companyAddresses[_current].companyName)
            ) == keccak256(abi.encodePacked(_companyName)),
            "Yes it is a digital duplicate"
        );
        return true;
    }
}
