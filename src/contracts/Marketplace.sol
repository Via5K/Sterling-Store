// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "NFT.sol";

contract Marketplace is NFT {
    function viewPersonalNFT(address user) public view returns () {
        uint256[] stakedTokens = getAllStakedNFTFromAddress(user);
    }
    // NOT WORKING
    /*
    viewUserStakedNFT function, is used to return the staked info along with nft info of the token .
    It returns the info about staked token of the user. 
    Parameters:
    address: address of the person whose staked nfts info are to be fetched.
    Returns:
    (uint[], uint[])

    function viewUserStakedNFT(address user)
        public
        view
        returns (stakeProp[], nftProp[])
    {
        //returns an array containing the id of tokens.
        uint256[] temp = getAllStakedNFTFromAddress(user);
        //now, for each token display the token properties.

        //id=>stake info detail
        //stakeDetail contains the staked info of the NFT
        stakeProp[] stakeDetail;

        //id=>nft info
        //NFTinfoDetail of the staked NFT.
        nftProp[] NFTpropDetail;

        for (uint256 i = 0; i < temp.length; i++) {
            stakeDetail[i].push(getStakedNFTProp(user, i));
        }
        for (uint256 i = 0; i < temp.length; i++) {
            NFTinfoDetail.push(NFTinfo[i]);
        }
        return (NFTpropDetail, stakeDetail);
    }
    */
}
