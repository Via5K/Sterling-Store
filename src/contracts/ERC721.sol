// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./ERC165.sol";
import "./interfaces/IERC721.sol";

// pragma solidity ^0.8.7;
// pragma solidity ^0.7.0;

// Building the minting function
// a. NFT to point to an address.
// b. Keep track of the token IDS.
// c. Keep track of the token owner addresses to token IDS.
// d. Keep track of how many tokens does an owner have.
// e. create a event that emita a transfer log - where is it being minted to and the id.

contract ERC721 is ERC165, IERC721 {
    // event Transfer(
    //     address indexed from,
    //     address indexed to,
    //     uint256 indexed tokenId
    // );
    // event Approval(
    //     address indexed owner,
    //     address indexed approved,
    //     uint256 indexed tokenId
    // );

    // Mapping from token id to the owner.
    mapping(uint256 => address) private _tokenOwner;
    // Mapping from owner to the number of owned tokens.
    mapping(address => uint256) private _ownedTokensCount;
    // Mapping from token id to approval address
    mapping(uint256 => address) private _tokenApprovals;
    //this is my self created function of modifier which is used in balance of.
    modifier restrict(address _owner) {
        require(_owner != address(0), "Token Doesn't Exists");
        _;
    }

    constructor() {
        _registerInterface(
            bytes4(
                keccak256("balanceOf(bytes4)") ^
                    keccak256("ownerOf(bytes4)") ^
                    keccak256("transferFrom(bytes4)")
            )
        );
    }

    //Creating Balanceof Function
    function balanceOf(address _owner)
        public
        view
        override
        restrict(_owner)
        returns (uint256)
    {
        return _ownedTokensCount[_owner];
    }

    //ownerOf function that finds the Owner of the NFT.
    function ownerOf(uint256 _tokenId) public view returns (address) {
        require(_tokenOwner[_tokenId] != address(0), "Token doesn't exist!");
        return _tokenOwner[_tokenId];
        // address owner =  _tokenOwner[_tokenId];
        // require(owner !=address(0),'Owner query for non existent ')
        // return owner;
    }

    function _exists(uint256 tokenId) public view returns (bool) {
        if (_tokenOwner[tokenId] == address(0)) {
            return false;
        }
        return true;
        //this is other code..
        // address owner = _tokenOwner[tokenId];
        // return owner!=address(0);
    }

    //Mint function
    function _mint(address to, uint256 tokenId) internal virtual {
        // function _mint(address to, uint256 tokenId) public virtual {
        //virtual
        //requires that the address is a valid and not 0.
        require(to != address(0), "ERC721: minting to the 0 address.");
        //checking that the token doesn't already exists.
        require(!_exists(tokenId), "ERC721: token already exists.");
        //minting
        _tokenOwner[tokenId] = to;
        //keeping track of each address that is minting and adding one.
        _ownedTokensCount[to] += 1;

        //currently setting the from address =  address 0.
        emit Transfer(address(0), to, tokenId);
    }

    function _transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal {
        require(_to != address(0), "Error - ERC721 Transfer to 0 Address");
        require(
            ownerOf(_tokenId) == _from,
            "Trying to transfer a token the address does not -----"
        );
        _ownedTokensCount[_from] -= 1;
        _ownedTokensCount[_to] += 1;
        _tokenOwner[_tokenId] = _to;
        emit Transfer(_from, _to, _tokenId);
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external override {
        //payable
        require(isApprovedOrOwner(msg.sender, _tokenId));
        _transferFrom(_from, _to, _tokenId);
    }

    //require that the person approving is the owner, approving an address to tokenId(token), require that we can't approve sending tokens of the owner to the owner
    // update the map of the approval address
    function approve(address _to, uint256 _tokenId) public {
        address owner = ownerOf(_tokenId);
        require(_to != owner, "Error - approval to current owner");
        require(
            msg.sender == owner,
            "Current caller is not the ownerof the token"
        );
        _tokenApprovals[_tokenId] = _to;
        emit Approval(owner, _to, _tokenId);
    }

    function isApprovedOrOwner(address _spender, uint256 _tokenId)
        internal
        view
        returns (bool)
    {
        require(_exists(_tokenId), "token does not exists");
        address owner = ownerOf(_tokenId);
        return (_spender == owner);
    }

    /**
    
    approve(to, tokenId)
    getApproved(tokenId)
    setApprovalForAll(to, approved)
    isApprovedForAll(owner, operator)
    transferFrom(from, to, tokenId)
    safeTransferFrom(from, to, tokenId)
    safeTransferFrom(from, to, tokenId, _data)
    _safeTransferFrom(from, to, tokenId, _data)
    
    _isApprovedOrOwner(spender, tokenId)
    _safeMint(to, tokenId)
    _safeMint(to, tokenId, _data)
    
    _burn(owner, tokenId)
    _burn(tokenId)
    _transferFrom(from, to, tokenId)
    _checkOnERC721Received(from, to, tokenId, _data)
    **/
}
