// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./ERC721Connector.sol";

contract NFT is ERC721Connector {
    // string public baseUri;
    // string public baseExtesion = ".json";
    // function setBaseUri(string memory _baseUri) external onlyOwner {
    //     baseUri = _baseUri;
    // }

    /***** 
    nftProp: Structure contains multiple dataTypes that stores different information.
    *****/

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
        uint256 boughtOn; //date on which the item is bought can be obtained using block.timestamp()
        address seller; //address of the person who sold the item
        uint256 ExpireOn; //If the item is expireable, Then it contains the date on which it will be expired.
        bool expireable; // Stores if the item is Expireable or not?
    }

    /***** 
    NFTs store array of string.
    It contains all the Unique Strings from which a NFT is being generated.
    *****/
    string[] public NFTs;

    /***** 
    AllNonTransferableNFT mapping  stores all the non transferable NFT's.
    Parameters:
    address: Address of the Person 
    uint[]: stores all the tokenId.
    *****/
    mapping(address => uint256[]) AllNonTransferrableNFT;

    /***** 
    AllPreLaunchNFT mapping  stores all the non Prelaunch NFT's.
    Parameters:
    address: Address of the Person 
    uint[]: stores all the tokenId.
    *****/
    mapping(address => uint256[]) AllPreLaunchNFT;
    /***** 
    AllSpecialNFT mapping  stores all the non transferable NFT's.
    Parameters:
    address: Address of the Person 
    uint[]: stores all the tokenId.
    *****/
    mapping(address => uint256[]) AllSpecialNFT;
    /***** 
    AllGenericNFT mapping  stores all the non transferable NFT's.
    Parameters:
    address: Address of the Person 
    uint[]: stores all the tokenId.
    *****/
    mapping(address => uint256[]) AllGenericNFT;

    /***** 
    _NFTExists mapping  stores wether the NFT is created or not?
    It contains if the NFT with gien unique string exists or not.
    Parameters:
    string: Unique String from which a NFT is being generated.  
    bool: true or false. True if it exists.
    *****/
    mapping(string => bool) _NFTExists;

    address public owner;

    /***** 
    NFTinfo mapping stores the information of the NFT using tokenId.
    For every tokenId, NFT information is stored.
    Parameters:
    uint: TokenId
    nftProp: Structure that contains multiple datatypes.
    *****/
    mapping(uint256 => nftProp) public NFTinfo;

    /***** 
    New Mapping for Refurbished Contract.
    previousOwners mapping stores that how many owners did this token had.
    Parameters:
    uint: TokenId
    uint: Number of Owners.
    *****/
    mapping(uint256 => uint256) previousOwners;

    /***** 
    setURL: Temporary function that can change the NFT url, if in future we want to make modifications.
    Parameters:
    uint: TokenId of the NFT that we want to change the URL of.
    string: _nftURL the new URL.
    Can only be done by the contract OWNER.
    *****/
    function setURL(uint256 tokenId, string memory _nftURL) public {
        require(
            msg.sender == owner,
            "Not authorised to add the URL to the NFT"
        );
        NFTinfo[tokenId].url = _nftURL;
    }

    /***** 
    Constructor Set the Name and Symbol.
    *****/
    constructor() ERC721Connector("SterlingStore", "SterlingNFT") {
        owner = msg.sender;
    }

    //if item number is greater than one....
    // cap is the maximum number of items one can buy.
    // MODIFY THIS FUNCTION
    /***** 
    buyBulk function, is used to generate multiple NFT, when user is trying to buy more than one item.
    Parameters:
    uint: tokenId
    uint: _NumberOfItems.
    uint: _cap is the maximum number of items bought.
    *****/
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

    /***** 
    viewNFTPropByIndex: Temporary function to check if the Properties of NFT is being successfully stored.
    Parameters:
    uint: TokenId
    Return:
    string :name
    string: description
    uint: nftType
    address: seller
    *****/
    function viewNFTPropByIndex(uint256 _tokenId)
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            address
        )
    {
        return (
            NFTinfo[_tokenId].name,
            NFTinfo[_tokenId].description,
            NFTinfo[_tokenId].nftType,
            NFTinfo[_tokenId].seller
        );
    }

    /***** 
    addNftProp function adds the property of NFT in NFTinfo mapping.
    Parameters:
    uint256: _tokenId,
    bool: _minted,
    string: _name,
    string: _description,
    string: _url,
    string: _trxnHash,
    uint256: _nftType,
    uint256: _boughtOn,
    address: _seller,
    uint256: _ExpireOn,
    bool: _expireable 
    *****/
    function addNftProp(
        uint256 _tokenId,
        bool _minted,
        string memory _name,
        string memory _description,
        string memory _url,
        string memory _trxnHash,
        uint256 _nftType,
        uint256 _boughtOn,
        address _seller,
        uint256 _ExpireOn,
        bool _expireable
    ) public {
        NFTinfo[_tokenId].minted = _minted;
        NFTinfo[_tokenId].name = _name;
        NFTinfo[_tokenId].description = _description;
        NFTinfo[_tokenId].url = _url;
        NFTinfo[_tokenId].trxnHash = _trxnHash;
        NFTinfo[_tokenId].nftType = _nftType;
        NFTinfo[_tokenId].boughtOn = block.timestamp;
        NFTinfo[_tokenId].seller = _seller;
        NFTinfo[_tokenId].ExpireOn = _ExpireOn;
        NFTinfo[_tokenId].expireable = _expireable;
        if (_nftType == 1) {
            AllSpecialNFT[msg.sender].push(_tokenId);
        } else if (_nftType == 2) {
            AllPreLaunchNFT[msg.sender].push(_tokenId);
        } else if (_nftType == 23) {
            AllGenericNFT[msg.sender].push(_tokenId);
        } else {
            AllNonTransferrableNFT[msg.sender].push(_tokenId);
        }
    }

    /***** 
    boughtOn & tempExp: Temporary variables for check.
    *****/
    // to transform a JavaScript date to unix timestamp (the number of seconds since 1970)
    uint256 public boughtOn;
    uint256 public tempExp;

    /***** 
    addNewBoughtOn & addTempExp: Temporary function to check the functionality.
    addNewBoughtOn - adds the current timestamp 
    addTempExp - adds a expiry date by taking a input i.e expiry date.
    *****/
    function addNewBoughtOn() public {
        boughtOn = block.timestamp;
    }

    function addTempExp(uint256 _exp) public {
        tempExp = _exp;
    }

    /***** 
    addExpiredOn function, is used to add the expiry of a token.
    Parameters:
    uint: _expiryDate //Expiry date will come from frontend
    uint: tokenId
    *****/
    //USE THIS to get the current date: const dateInSecs = Math.floor(new Date().getTime() / 1000);
    function addExpiredOn(uint256 _expiryDate, uint256 _tokenId) public {
        NFTinfo[_tokenId].ExpireOn = _expiryDate;
    }

    /***** 
    ifTimeHasPassed function, is used to check if the expiry of the item has been reached or not.
    Parameters:
    uint: _expireOn is the expiry date //Expiry date will come from frontend
    Return:
    bool: if the expiry has reached then true otherwise false.
    *****/

    function ifTimeHasPassed(uint256 __ExpireOn) public view returns (bool) {
        return (block.timestamp > __ExpireOn);
    }

    /***** 
    nftsLen function, is used to find the current length of th earray which contains all the NFT's. Returns length
    nftVal function is used to find the Unique string form which the NFT has been generated. Takes id as input and returns the unique URL.
    *****/
    function nftsLen() public view returns (uint256) {
        return NFTs.length;
    }

    function nftVal(uint256 _id) public view returns (string memory) {
        return NFTs[_id];
    }

    /***** 
    _NonTransferableNFT function, is used to mint and then add the property of the NFT.
    Parameters:
    string: _nft - Unique URL
    bool: _minted,
    string: _name
    string: _description
    string: _url
    string: _trxnHash
    uint256: _nftType
    uint256: _boughtOn
    address: _seller
    uint256: _ExpireOn
    bool: _expireable
    *****/

    function _NonTransferableNFT(
        string memory _nft,
        bool _minted,
        string memory _name,
        string memory _description,
        string memory _url,
        string memory _trxnHash,
        uint256 _nftType,
        uint256 _boughtOn,
        address _seller,
        uint256 _ExpireOn,
        bool _expireable
    ) external {
        uint256 _tokenId = nftsLen();
        mint(_nft);

        addNftProp(
            _tokenId,
            _minted,
            _name,
            _description,
            _url,
            _trxnHash,
            _nftType,
            _boughtOn,
            _seller,
            _ExpireOn,
            _expireable
        );
    }

    /***** 
    _PreLaunch function, is used to mint and then add the property of the NFT.
    Parameters:
    string: _nft - Unique URL
    bool: _minted,
    string: _name
    string: _description
    string: _url
    string: _trxnHash
    uint256: _nftType
    uint256: _boughtOn
    address: _seller
    uint256: _ExpireOn
    bool: _expireable
    *****/
    function _PreLaunch(
        string memory _nft,
        bool _minted,
        string memory _name,
        string memory _description,
        string memory _url,
        string memory _trxnHash,
        uint256 _nftType,
        uint256 _boughtOn,
        address _seller,
        uint256 _ExpireOn,
        bool _expireable
    ) external {
        uint256 _tokenId = nftsLen();
        mint(_nft);
        addNftProp(
            _tokenId,
            _minted,
            _name,
            _description,
            _url,
            _trxnHash,
            _nftType,
            _boughtOn,
            _seller,
            _ExpireOn,
            _expireable
        );
    }

    /***** 
    _Generic function, is used to mint and then add the property of the NFT.
    Parameters:
    string: _nft - Unique URL
    bool: _minted,
    string: _name
    string: _description
    string: _url
    string: _trxnHash
    uint256: _nftType
    uint256: _boughtOn
    address: _seller
    uint256: _ExpireOn
    bool: _expireable
    *****/

    function _Generic(
        string memory _nft,
        bool _minted,
        string memory _name,
        string memory _description,
        string memory _url,
        string memory _trxnHash,
        uint256 _nftType,
        uint256 _boughtOn,
        address _seller,
        uint256 _ExpireOn,
        bool _expireable
    ) external {
        uint256 _tokenId = nftsLen();
        mint(_nft);
        addNftProp(
            _tokenId,
            _minted,
            _name,
            _description,
            _url,
            _trxnHash,
            _nftType,
            _boughtOn,
            _seller,
            _ExpireOn,
            _expireable
        );
    }

    /***** 
    _Special function, is used to mint and then add the property of the NFT.
    Parameters:
    string: _nft - Unique URL
    bool: _minted,
    string: _name
    string: _description
    string: _url
    string: _trxnHash
    uint256: _nftType
    uint256: _boughtOn
    address: _seller
    uint256: _ExpireOn
    bool: _expireable
    *****/
    function _Special(
        string memory _nft,
        bool _minted,
        string memory _name,
        string memory _description,
        string memory _url,
        string memory _trxnHash,
        uint256 _nftType,
        uint256 _boughtOn,
        address _seller,
        uint256 _ExpireOn,
        bool _expireable
    ) external {
        uint256 _tokenId = nftsLen();
        mint(_nft);
        addNftProp(
            _tokenId,
            _minted,
            _name,
            _description,
            _url,
            _trxnHash,
            _nftType,
            _boughtOn,
            _seller,
            _ExpireOn,
            _expireable
        );
    }

    /***** 
    _NonTransferableNFT function, is used to mint and then add the property of the NFT.
    Parameters:
    address: persons address.
    uint []: Integer Array that contains all the IDS owned by te that address.
    *****/
    mapping(address => uint256[]) _ownerOwnedIds;

    /***** 
    removeAllExpiredNFT function, is used to remove the Expired NFT from the list. 
    Parameters:
    address: persons address.
    string: __url of the NEW nft, this is for temporary right now. Fix this by directly adding url in the code.
    *****/
    //call this continuously.... for particular wallet address so that expired IDS can be removed from the mapping.
    function removeAllExpiredNFT(address _of, string memory __url) public {
        uint256 totalTokensOfOwner = _ownerOwnedIds[_of].length;
        uint256[] storage allIds = _ownerOwnedIds[_of];
        for (uint256 i = 0; i < totalTokensOfOwner; i++) {
            if (
                NFTinfo[allIds[i]].expireable == true &&
                ifTimeHasPassed(NFTinfo[allIds[i]].ExpireOn)
            ) {
                allIds[i] = allIds[allIds.length - 1];
                allIds.pop();
                NFTinfo[i].description = "EXPIRED ITEM";
                NFTinfo[i].url = __url; //add a url where IMAGE SHOWS EXPIRED ITEM
            }
        }
        _ownerOwnedIds[_of] = allIds;
    }

    /***** 
    mint function, is used to mint a new NFT by the Unique URL.
    Parameters:
    string: _nft which is a UNIQUE URL.
    *****/
    function mint(string memory _nft) public {
        //validation that the nft we are minting has not yet minted.
        require(!_NFTExists[_nft], "Dang it!!, I Have already been minted");
        NFTs.push(_nft); //add this Unique url to the NFTs Array.
        uint256 _id = NFTs.length - 1;
        _mint(msg.sender, _id);
        _ownerOwnedIds[msg.sender].push(_id);
        previousOwners[_id] += 1; //owners has been increased....or it has been sold once..
        //everytime we mint, then we are making sure that particular NFT is not minted again.
        _NFTExists[_nft] = true;
    }

    /***** 
    mintToOthers function, is used to mint a new NFT to a address by the Unique URL.
    Parameters:
    address: address of the person to whose address you want ot mint ht eNFT.
    string: _nft which is a UNIQUE URL.

    *****/
    function mintToOthers(address to, string memory _nft) public virtual {
        //requires that the address is a valid and not 0.
        require(to != address(0), "ERC721: minting to the 0 address.");
        require(!_NFTExists[_nft], "Dang it!!, I Have already been minted");
        NFTs.push(_nft);
        uint256 _id = NFTs.length - 1;
        _mint(to, _id);
        //everytime we mint, then we are making sure that particular NFT is not minted again.
        _NFTExists[_nft] = true;
        previousOwners[_id] += 1;
    }
}
