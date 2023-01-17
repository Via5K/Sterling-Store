// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./interfaces/IERC721Metadata.sol";
import "./ERC165.sol";

// pragma solidity ^0.8.7;
// pragma solidity ^0.7.0;

contract ERC721Metadata is IERC721Metadata, ERC165 {
    string private _name;
    string private _symbol;

    constructor(string memory __name, string memory __symbol) {
        _registerInterface(
            bytes4(keccak256("name(bytes4)") ^ keccak256("symbol(bytes4)"))
        );

        _name = __name;
        _symbol = __symbol;
    }

    function name() external view override returns (string memory) {
        return _name;
    }

    function symbol() external view override returns (string memory) {
        return _symbol;
    }
    // function tokenURI(uint256 _tokenId) external view override returns (string memory);
}
