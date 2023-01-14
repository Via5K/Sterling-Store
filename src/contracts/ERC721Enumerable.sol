// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
// pragma solidity ^0.8.7;
// pragma solidity ^0.7.0;
import "./ERC721.sol";
import "./interfaces/IERC721Enumerable.sol";

contract ERC721Enumerable is IERC721Enumerable, ERC721 {
    uint256[] private _allTokens;
    mapping(uint256 => uint256) private _allTokensIndex;
    mapping(address => uint256[]) private _ownedTokens;
    mapping(uint256 => uint256) private _ownedTokensIndex;

    constructor() {
        _registerInterface(
            bytes4(
                keccak256("totalSupply(bytes4)") ^
                    keccak256("tokenByIndex(bytes4)") ^
                    keccak256("tokenOfOwnerByIndex(bytes4)")
            )
        );
    }

    function tokenByIndex(uint256 _index)
        public
        view
        override
        returns (uint256)
    {
        //make sure that the index is not out od bounds from totalsupply.
        require(_index < totalSupply(), "Gloabl index is out of bounds!");
        return _allTokens[_index];
    }

    function tokenOfOwnerByIndex(address _owner, uint256 _index)
        public
        view
        override
        returns (uint256)
    {
        require(_index < balanceOf(_owner), "owner index is out of range");
        return _ownedTokens[_owner][_index];
    }

    function totalSupply() public view override returns (uint256) {
        return _allTokens.length;
    }

    function _mint(address to, uint256 tokenId) internal override(ERC721) {
        // function _mint(address to, uint256 tokenId) public override(ERC721) {
        //(ERC721)
        super._mint(to, tokenId);
        _addTokensToAllTokensEnumeration(tokenId);
        _addTokensToOwnerEnumeration(to, tokenId);
    }

    function _addTokensToAllTokensEnumeration(uint256 tokenId) private {
        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId);
    }

    function _addTokensToOwnerEnumeration(address to, uint256 tokenId) private {
        _ownedTokensIndex[tokenId] = _ownedTokens[to].length;
        _ownedTokens[to].push(tokenId);
    }

    // function totalSupply() public view returns(uint){
    //     return _allTokens.length;
    // }
}
