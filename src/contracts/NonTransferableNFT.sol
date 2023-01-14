// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./NFT.sol";

contract NonTransferableNFT is NFT {
    function mint(
        string memory _nft,
        bool _minted,
        string memory _name,
        string memory _description,
        string memory _url,
        string memory _trxnHash,
        uint256 _nftType,
        string memory _boughtOn,
        address _seller,
        string memory _validTill
    ) public override {
        //validation that the nft we are minting has not yet minted.
        require(!_NFTExists[_nft], "Dang it!!, I Have already been minted");

        NFTs.push(_nft);
        uint256 _id = NFTs.length - 1;
        _mint(msg.sender, _id);
        addNftProp(
            _id,
            _minted,
            _name,
            _description,
            _url,
            _trxnHash,
            _nftType,
            _boughtOn,
            _seller,
            _validTill
        );
        //everytime we mint, then we are making sure that particular NFT is not minted again.
        _NFTExists[_nft] = true;
    }

    function mintToOthers(
        address to,
        string memory _nft,
        bool _minted,
        string memory _name,
        string memory _description,
        string memory _url,
        string memory _trxnHash,
        uint256 _nftType,
        string memory _boughtOn,
        address _seller,
        string memory _validTill
    ) public override {
        //requires that the address is a valid and not 0.
        require(to != address(0), "ERC721: minting to the 0 address.");
        // //checking that the token doesn't already exists.
        // require(!_exists(tokenId), "ERC721: token already exists.");
        //add the ownerssss.....

        require(!_NFTExists[_nft], "Dang it!!, I Have already been minted");
        NFTs.push(_nft);
        uint256 _id = NFTs.length - 1;
        _mint(msg.sender, _id);
        //everytime we mint, then we are making sure that particular NFT is not minted again.
        _NFTExists[_nft] = true;

        _mint(to, _id);
        addNftProp(
            _id,
            _minted,
            _name,
            _description,
            _url,
            _trxnHash,
            _nftType,
            _boughtOn,
            _seller,
            _validTill
        );
        previousOwners[_id] += 1;
    }
}
