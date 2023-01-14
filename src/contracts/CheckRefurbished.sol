// SPDX-License-Identifier: MIT
// pragma solidity >=0.4.22 <0.9.0;
// pragma solidity ^0.7.0;
// import "./ERC721.sol";

// contract checkRefurbished is ERC721 {
//     modifier refurbishedCheck(uint256 _tokenId) {
//         require(
//             previousOwners[_tokenId] < 1,
//             "Yes this is a refurbished Item, It has been sold more than once.."
//         );
//         _;
//     }

//     // function additems(uint _tokenId ) public {
//     //     previousOwners[_tokenId]+=1;
//     // }

//     //create a seperate mapping in NFT, which is named as Previous Owners.... as uint=>uint..where 1st uint is token id and second one is how many owners it had...
//     function check(uint256 _tokenId)
//         public
//         view
//         refurbishedCheck(_tokenId)
//         returns (bool)
//     {
//         return false; //meaning that this is not a refurbished item.
//     }
// }

pragma solidity >=0.4.22 <0.9.0;
import "./NFT.sol";

contract checkRefurbished is NFT {
    //custom event and emit...
    function checkRefurbishedItem(uint256 tokenId) public view returns (bool) {
        if (NFTinfo[tokenId].minted == true && previousOwners[tokenId] >= 1) {
            return true; //true means that the item is refurbished
        }
        return false; //false means it is not refurbished and has not been minted yet....
    }
}
