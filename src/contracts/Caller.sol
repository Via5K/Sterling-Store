// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./NFT.sol";

contract Caller {
    //Creating the Contracts instances of NFT CONTRACT
    NFT nft_;

    //updating the contracts instances with the addresses of the constructor
    constructor(NFT _nft) {
        nft_ = NFT(_nft);
    }

    // //NOW WE CAN CALL THE CONTRACTS, BASED UPON THE THE SEPCIFICATIONS DECIDED AT FINAL....
    // // DEMO FUNCTIONS...

    // //createNFT function will check the parameters that are coming from front, and then segrigate, which NFT to create.
    // // _pid is for either it is electric, grocery, /... 1 for electricity, 2 for grocery and so on...
    // //1 = special i.e electrical/>10000  || electrical and cost>=5000 //done
    // //2 = prelaunch    //done
    // //3 = generic everything less than 10K
    // //4 = Non transferable i.e music, video etc. //done

    function createNFT(
        uint256 _cost,
        uint256 _pid,
        string memory _UqURL,
        string memory _name,
        string memory _description,
        string memory _url,
        string memory _trxnHash,
        address _seller,
        uint256 _validTill
    ) public {
        if (_pid == 4) {
            // if it is pid==4, then it is non-transferabble.
            nft_._NonTransferableNFT(
                _UqURL,
                true,
                _name,
                _description,
                _url,
                _trxnHash,
                4,
                block.timestamp,
                _seller,
                _validTill,
                true
            );
        } else if (_pid == 2) {
            // if it is pid==2, then it is prelaunch item.
            nft_._PreLaunch(
                _UqURL,
                true,
                _name,
                _description,
                _url,
                _trxnHash,
                2,
                block.timestamp,
                _seller,
                _validTill,
                true
            );
        } else if ((_pid == 1 && _cost >= 5000) || _cost >= 10000) {
            //if it is electrical, then only create special...//or if it is greater than 10K.
            nft_._Special(
                _UqURL,
                true,
                _name,
                _description,
                _url,
                _trxnHash,
                1,
                block.timestamp,
                _seller,
                _validTill,
                false
            );
        } else if (_cost < 10000) {
            //if it is less than 10K
            nft_._Generic(
                _UqURL,
                true,
                _name,
                _description,
                _url,
                _trxnHash,
                3,
                block.timestamp,
                _seller,
                _validTill,
                true
            );
        }
    }
}
