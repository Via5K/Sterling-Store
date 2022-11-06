// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract checkDigitalDuplicate {
    modifier duplicate(address _original, address _current) {
        require(_original == _current, "Yes it is a Digital Duplicate");
        _;
    }

    //original means the original owner that we think
    //current means the current seller address form whom we are trying to buy it.
    function check(address _original, address _current)
        public
        view
        duplicate(_original, _current)
        returns (bool)
    {
        return true;
    }
}
