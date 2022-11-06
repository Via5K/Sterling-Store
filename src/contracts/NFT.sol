// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721, Ownable {
    using Strings for uint256;

    /*
    /// @notice This mapping, maps and item name -> address -> number of tokens...
    /// @param string is the item name... or the item ID
    //  item->address;
    //  ID -> address;
    //  address-> number of tokens....
    */

    mapping(string => mapping(address => uint256)) item_address_num_tokens;

    uint256 public constant MAX_TOKENS = 10000;

    //These are the tokens that are reserved in case one wants for demo purpose etc.
    //Or to show how NFT looks like
    uint256 private constant TOKENS_RESERVED = 5;

    //This is the price, of the NFT... In case user wants to set it to something else.
    uint256 public price = 100000000000000000;

    //If there is a limit, on how many pieces one can buy
    //This may be un-necessary, because validation will be done in e-com.
    uint256 public constant MAX_MINT_PER_TX = 10;

    //This needs to set manually incase, the seller wants to deactivate the sale, or activate it.
    bool public isSaleActive;
    //How many total tokens are there right now...
    uint256 public totalSupply;
    //Stores which addr. has how many tokens.
    mapping(address => uint256) private mintedPerWallet;
    //for imaging purpose.
    string public baseUri;
    string public baseExtesion = ".json";

    /*
    /// @param NFT Name : takes the name as a parameter
    /// @param SYMBOL : this is right now standard, but we will take the image , and its rarities and other importatn details.
    PARAMS NEEDS TO BE modified according to the description/....
    */
    constructor() ERC721("NFT Name", "SYMBOL") {
        baseUri = "ipfs://xxxxxxxxxxxxxxxxxxxxxxxxxxxxx/";
        for (uint256 i = 1; i <= TOKENS_RESERVED; ++i) {
            _safeMint(msg.sender, i);
        }
        totalSupply = TOKENS_RESERVED;
    }

    // Public Functions
    function mint(uint256 _numTokens) external payable {
        require(isSaleActive, "The sale is paused.");
        require(
            _numTokens <= MAX_MINT_PER_TX,
            "You cannot mint that many in one transaction."
        );
        require(
            mintedPerWallet[msg.sender] + _numTokens <= MAX_MINT_PER_TX,
            "You cannot mint that many total."
        );
        uint256 curTotalSupply = totalSupply;
        require(
            curTotalSupply + _numTokens <= MAX_TOKENS,
            "Exceeds total supply."
        );
        require(_numTokens * price <= msg.value, "Insufficient funds.");

        for (uint256 i = 1; i <= _numTokens; ++i) {
            _safeMint(msg.sender, curTotalSupply + i);
        }
        mintedPerWallet[msg.sender] += _numTokens;
        totalSupply += _numTokens;
    }

    // Owner-only functions
    function flipSaleState() external onlyOwner {
        isSaleActive = !isSaleActive;
    }

    function setBaseUri(string memory _baseUri) external onlyOwner {
        baseUri = _baseUri;
    }

    function setPrice(uint256 _price) external onlyOwner {
        price = _price;
    }

    function withdrawAll() external payable onlyOwner {
        uint256 balance = address(this).balance;
        uint256 balanceOne = (balance * 70) / 100;
        uint256 balanceTwo = (balance * 30) / 100;
        (bool transferOne, ) = payable(
            0x7ceB3cAf7cA83D837F9d04c59f41a92c1dC71C7d
        ).call{value: balanceOne}("");
        (bool transferTwo, ) = payable(
            0x7ceB3cAf7cA83D837F9d04c59f41a92c1dC71C7d
        ).call{value: balanceTwo}("");
        require(transferOne && transferTwo, "Transfer failed.");
    }

    // temporary right now.... will be changd later.
    function make() private returns (bool) {
        return true;
    }
}
