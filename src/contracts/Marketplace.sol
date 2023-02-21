// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./NFT.sol";

contract Marketplace is NFT {
    //returns the tokenIDS of the user owned tokens.
    function viewMyNFTS(address _off) public view returns (uint256[] memory) {
        return viewAllTokens(_off);
        // uint[] memory myNFTtokenIds = viewAllTokens(_off);
    }

    //return the total number of nft that this user have.
    function myTotalNFTCount(address _off) public view returns (uint256) {
        return viewMyNFTS(_off).length;
    }

    //returns the information about the staked NFT.
    //return information includes, nftProp[] and stakedProp[].
    function viewMyStakedNFTs(address _user)
        public
        view
        returns (nftProp[] memory, stakeProp[] memory)
    {
        return viewUserStakedNFT(_user);
    }

    //now for marketplace.....

    //mapping for tokenId=>address :- uint for token id and address for the person who is selling.
    mapping(uint256 => bool) forSell;

    //array contians the tokenId's for easy size description.
    uint256[] forSellArray;

    //checks if the token Exists ..... and then checks if the user owns the token id.
    modifier isNFTOwner(uint256 _tokenId) {
        if (_tokenId > 0) {
            require(
                _NFTExists[NFTs[_tokenId - 1]] == true,
                "NFT Doesn't exists.... Create NFT First"
            );
        } else {
            require(
                _NFTExists[NFTs[_tokenId]] == true,
                "NFT Doesn't exists.... Create NFT First"
            );
        }
        //now check if the user has the tokenId...
        bool counter = false;
        uint256[] memory all = viewAllTokens(msg.sender);
        for (uint256 i = 0; i < all.length; i += 1) {
            if (all[i] == _tokenId) {
                counter = true;
            }
        }
        require(counter == true, "Owner doesn't owns the token");
        _;
    }

    //function available to buy.
    // function availableToBuy(address _user) public view returns(){

    // }

    mapping(uint256 => bool) Bought;

    // tokenId=>true/false
    //add for sell, put them as we are selling.
    function addForSell(uint256 _tokenId) public isNFTOwner(_tokenId) {
        require(getNFTtype(_tokenId) == 4, "Cannot Sell Non Transferable NFT");
        forSell[_tokenId] = true;
    }

    function removeFromSell(uint256 _tokenId) public {
        require(
            Bought[_tokenId] == true,
            "Cannot remove from Selling, NFT is already sold..."
        );
        forSell[_tokenId] = false;
    }

    //used to buy the NFT
    function buyNFT(uint256 _tokenId) public {
        require(msg.sender == ownerOf(_tokenId), "You cannot Buy Your Own NFT");
        require(Bought[_tokenId] == true, "NFT Already Bought!!");
        require(forSell[_tokenId] == true, "NFT removed from Selling");
        forSell[_tokenId] = false;
        Bought[_tokenId] = true;
        //now add this nft to user wallet. depending on what type of nft it is.
        //also mark the previous owners mapping,

        address tempUser = ownerOf(_tokenId);
        uint256 num = getNFTtype(_tokenId);
        if (num == 1) {
            //remove from prevouis owner
            uint256[] memory newTokens = removeNFTfromAddress(
                _tokenId,
                tempUser,
                AllSpecialNFT[tempUser]
            );
            //push into new user
            AllSpecialNFT[msg.sender].push(_tokenId);
            //update mapping of old user.
            AllSpecialNFT[tempUser] = newTokens;
        } else if (num == 2) {
            uint256[] memory newTokens = removeNFTfromAddress(
                _tokenId,
                tempUser,
                AllPreLaunchNFT[tempUser]
            );
            AllPreLaunchNFT[msg.sender].push(_tokenId);
            AllPreLaunchNFT[tempUser] = newTokens;
        } else {
            uint256[] memory newTokens = removeNFTfromAddress(
                _tokenId,
                tempUser,
                AllGenericNFT[tempUser]
            );
            AllGenericNFT[msg.sender].push(_tokenId);
            AllGenericNFT[tempUser] = newTokens;
        }

        previousOwners[_tokenId] += 1;
    }

    //after selling, we need to make sure that nft is added to wallet of user as well as removed from prevous owners wallet.
    function removeNFTfromAddress(
        uint256 _tokenId,
        address _tempUser,
        uint256[] memory tokensOwned
    ) internal returns (uint256[] memory) {
        uint256 counter = 0;
        for (uint256 i = 0; i < tokensOwned.length; i += 1) {
            //first swap, then pop
            if (tokensOwned[i] == _tokenId) {
                counter = i;
                break;
            }
        }
        if (counter != tokensOwned.length - 1) {
            //swap
            tokensOwned[counter] = tokensOwned[tokensOwned.length - 1];
        }
        //then pop
        // delete tokensOwned[counter];
        // tokensOwned.length--;
        shrinkArray(tokensOwned, tokensOwned.length - 1);

        return tokensOwned;
    }

    //because pop function in arrays is giving memory storage issue so created new function.

    function shrinkArray(uint256[] memory array, uint256 newLength)
        internal
        pure
        returns (uint256[] memory)
    {
        require(
            newLength <= array.length,
            "Array: length after shrinking larger than before"
        );
        /// @solidity memory-safe-assembly
        assembly {
            mstore(array, newLength)
        }
        return array;
    }
}
