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

    /***** 
    duplicate: a modifier that checks if it is digital duplicate or not?
    parameters:
    _original: the address of the company i.e the address that is verified to be original.
    _current : the address of the company that you currently have.
    *****/
    modifier duplicate(address _original, address _current) {
        require(_original == _current, "Yes it is a Digital Duplicate");
        _;
    }
    /***** 
    VerifiedUser: a modifier that checks if the current caller is verfied or not?
    *****/
    modifier VerifiedUser() {
        require(
            verifiedUserList[msg.sender] == true,
            "You need to be a verified User to add Address in the list."
        );
        _;
    }

    /***** 
    addVerifiedUser: a function, that adds a new user in the verifiedUserList.
    parameters:
    _user: the address of the user that you want to make verified...
    *****/
    //only a verified user can add a new verified user...
    function addVerifiedUser(address _user) public VerifiedUser {
        verifiedUserList[_user] = true;
    }

    /***** 

    addCompanyAddress: a function that adds the company address and name in the mapping comapnyAddresses.
    parameters:
    _newAddress: the address of the company
    _companyName: the name of the company.
    *****/
    // And makes sure that the person who is adding this address is verified user.
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

    /***** 
    manualCheck: a function that is called by a consumer manually, to check if the 2 addresses are Digital duplicate or not.
    parameters:
    _original: the address of the company i.e the address that is verified to be original.
    _current : the address of the company that you currently have.
    *****/
    function manualCheck(address _original, address _current)
        public
        pure
        duplicate(_original, _current)
        returns (bool)
    {
        return true;
        //if not true then it is false;
    }

    /***** 
    autoCheck: a function that uses its own database to check if the current address we have is verified or not?
    parameters:
    _current: the address of the company that you currently have.
    _companyName: name of the company that we are trying to buy from.
    *****/
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
