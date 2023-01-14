// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./ERC721Connector.sol";

contract NFT is ERC721Connector {
    // string public baseUri;
    // string public baseExtesion = ".json";
    // function setBaseUri(string memory _baseUri) external onlyOwner {
    //     baseUri = _baseUri;
    // }

    // now what i have to do is, to store the NFTS,
    // storing of NFT's can be done using array.
    string[] public NFTs;
    mapping(string => bool) _NFTExists;

    //nft property.. can add more depending on the requirements...
    struct nftProp {
        bool minted; //makes sure if it is minted or not?
        string name; //name of the item.
        string description; //desc. of the prod bought
        string url; //nft url
        string trxnHash; //trxn hash from frontend
        uint256 nftType;
        // nftType is for either it is electric, grocery, /... 1 for electricity, 2 for grocery and so on...
        // //1 = special i.e electrical/>10000  || electrical and cost>=5000 //done
        // //2 = prelaunch    //done
        // //3 = generic everything less than 10K
        // //4 = Non transferable i.e music, video etc. //done
        string boughtOn; //date on which the item is bought
        address seller; //address of the person who sold the item
        string validTill;
        //if valid till is "MORTAL", means it cannot be destroyed...
        //if valid till is 8char long then it will be destroyed on that date.. dd/mm/yyyy
        //if valid till is "NON"followed with 8 chars it means that this is non transferable and ..will be expired on that date..
        //if valid till is "GEN" followed with 8 chars it measn that this is Generic NFT nad nft will be destroyed at that date..
        //if valid till is "PRE" followed with 8 chars, then a nft will be generated on that date which will not expire neither destroyed..
    }

    address public owner;

    //tokenId=>nftProp
    mapping(uint256 => nftProp) NFTinfo;

    //NEW MAPPING AS SPECIFIED IN REFURBISHED CONTRACT
    //tokenID=>owners
    mapping(uint256 => uint256) previousOwners;

    //this will be called after nft is minted to set the props... and it is internal so only minting function will call this....

    function addNftProp(
        uint256 _tokenId,
        bool _minted,
        string memory _name,
        string memory _description,
        string memory _url,
        string memory _trxnHash,
        uint256 _nftType,
        string memory _boughtOn,
        address _seller,
        string memory _validTill
    ) internal {
        NFTinfo[_tokenId].minted = _minted;
        NFTinfo[_tokenId].name = _name;
        NFTinfo[_tokenId].description = _description;
        NFTinfo[_tokenId].url = _url;
        NFTinfo[_tokenId].trxnHash = _trxnHash;
        NFTinfo[_tokenId].nftType = _nftType;
        NFTinfo[_tokenId].boughtOn = _boughtOn;
        NFTinfo[_tokenId].seller = _seller;
        NFTinfo[_tokenId].validTill = _validTill;
    }

    //if want to be done by the token owner, then can also add that....
    function setURL(uint256 tokenId, string memory _nftURL) public {
        require(
            msg.sender == owner,
            "Not authorised to add the URL to the NFT"
        );
        NFTinfo[tokenId].url = _nftURL;
    }

    constructor() ERC721Connector("SterlingStore", "SterlingNFT") {
        owner = msg.sender;
    }

    //if item number is greater than one....
    // cap is the maximum number of items one can buy.
    function buyBulk(
        uint256 tokenId,
        uint256 _NumberOfItems,
        uint256 _cap
    ) public {
        require(
            _cap <= _NumberOfItems,
            "Must Not exceed the Cap provided by the seller..."
        );
        for (uint256 i = 0; i < _NumberOfItems; i += 1)
            _mint(msg.sender, tokenId);
    }

    // function mintToOthers(
    //     address to,
    //     string memory _nft,
    //     bool _minted,
    //     string memory _name,
    //     string memory _description,
    //     string memory _url,
    //     string memory _trxnHash,
    //     uint256 _nftType,
    //     string memory _boughtOn,
    //     address _seller,
    //     string memory _validTill
    // ) public virtual;

    // function mint(
    //     string memory _nft,
    //     bool _minted,
    //     string memory _name,
    //     string memory _description,
    //     string memory _url,
    //     string memory _trxnHash,
    //     uint256 _nftType,
    //     string memory _boughtOn,
    //     address _seller,
    //     string memory _validTill
    // ) public virtual;
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
    ) public virtual {
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
    ) public virtual {
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
