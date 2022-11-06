// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./GenericNFT.sol";
import "./PreLaunchNFT.sol";
import "./NonTransferableNFT.sol";
import "./SpecialNFT.sol";

contract Caller {
    //Creating the Contracts instances of Doctor and Patient.
    Generic generic_;
    Special special_;
    NonTransferable non_transferable_;
    PreLaunch prelaunch_;

    constructor(
        Generic _genericContractAddress,
        Special _specialContractAddress,
        NonTransferable _nonTransferableContractAddress,
        PreLaunch _preLaunchContractAddress
    ) public {
        //updating the contracts instances with the addresses of the constructor
        generic_ = Patients(_genericContractAddress);
        special_ = Doctors(_specialContractAddress);
        non_transferable_ = Records(_nonTransferableContractAddress);
        prelaunch_ = Records(_preLaunchContractAddress);
    }

    //NOW WE CAN CALL THE CONTRACTS, BASED UPON THE THE SEPCIFICATIONS DECIDED AT FINAL....
    // DEMO FUNCTIONS...

    //createNFT function will check the parameters that are coming from front, and then segrigate, which NFT to create.
    // _pid is for either it is electric, grocery, /... 1 for electricity, 2 for grocery and so on...
    //1 = special i.e electrical/>10000  || electrical and cost>=5000 //done
    //2 = prelaunch    //done
    //3 = generic everything less than 10K
    //4 = Non transferable i.e music, video etc. //done

    function createNFT(uint256 _cost, uint256 _pid) public view {
        //also need to pass the parameter in make function....

        if (_pid == 4) {
            non_transferable_.make(); // if it is pid==4, then it is non-transferabble.
        } else if (_pid == 2) {
            prelaunch_.make(); // if it is pid==2, then it is prelaunch item.
        } else if ((_pid == 1 && _cost >= 5000) || _cost >= 10000) {
            special_.make(); //if it is electrical, then only create special...
            //or if it is greater than 10K.
        } else if (_cost < 10000) {
            generic_.make(); //if it is less than 10K
        }
    }
}
