// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
    // string public baseUri;
    // string public baseExtesion = ".json";
    // function setBaseUri(string memory _baseUri) external onlyOwner {
    //     baseUri = _baseUri;
    // }

    /***** 
    nftProp: Structure contains multiple dataTypes that stores different information.
    *****/
    event mintEvent(address to, uint256 _tokenId);
    event Stake(address from, address to, uint256 _tokenId);
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
    mapping(address => uint256[]) public AllNonTransferrableNFT;

    /***** 
    AllPreLaunchNFT mapping  stores all the non Prelaunch NFT's.
    Parameters:
    address: Address of the Person 
    uint[]: stores all the tokenId.
    *****/
    mapping(address => uint256[]) public AllPreLaunchNFT;
    /***** 
    AllSpecialNFT mapping  stores all the non transferable NFT's.
    Parameters:
    address: Address of the Person 
    uint[]: stores all the tokenId.
    *****/
    mapping(address => uint256[]) public AllSpecialNFT;
    /***** 
    AllGenericNFT mapping  stores all the non transferable NFT's.
    Parameters:
    address: Address of the Person 
    uint[]: stores all the tokenId.
    *****/
    mapping(address => uint256[]) public AllGenericNFT;
    /***** 
    AllStakedNFT mapping  stores all the NFT's staked in contract..
    Parameters:
    address: Address of the Person 
    uint[]: stores all the tokenId.
    *****/
    mapping(address => uint256[]) public AllStakedNFT;

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
    constructor() ERC721("SterlingStore", "SterlingNFT") {
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

    //return the type of nft by taking in the tokenID of the nft.
    function getNFTtype(uint256 _tokenId) public view returns (uint256) {
        return NFTinfo[_tokenId].nftType;
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
    function viewNFTPropByIndex1(uint256 _tokenId)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            uint256
        )
    {
        return (
            NFTinfo[_tokenId].name,
            NFTinfo[_tokenId].description,
            NFTinfo[_tokenId].url,
            NFTinfo[_tokenId].trxnHash,
            NFTinfo[_tokenId].nftType
        );
    }

    function viewNFTPropByIndex2(uint256 _tokenId)
        public
        view
        returns (
            uint256,
            address,
            uint256,
            bool
        )
    {
        return (
            NFTinfo[_tokenId].boughtOn,
            NFTinfo[_tokenId].seller,
            NFTinfo[_tokenId].ExpireOn,
            NFTinfo[_tokenId].expireable
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
    }

    /***** 
    boughtOn & tempExp: Temporary variables for check.
    *****/
    // to transform a JavaScript date to unix timestamp (the number of seconds since 1970)
    uint256 public boughtOnDate;
    uint256 public tempExp;

    /***** 
    addNewBoughtOn & addTempExp: Temporary function to check the functionality.
    addNewBoughtOn - adds the current timestamp 
    addTempExp - adds a expiry date by taking a input i.e expiry date.
    *****/
    function addNewBoughtOn() public {
        boughtOnDate = block.timestamp;
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
    AllSpecialNFTLength is used to find the length of the mapping.
    nftsLen function, is used to find the current length of th earray which contains all the NFT's. Returns length
    nftVal function is used to find the Unique string form which the NFT has been generated. Takes id as input and returns the unique URL.
    *****/
    function AllSpecialNFTLength(address _off) public view returns (uint256) {
        return AllSpecialNFT[_off].length;
    }

    function addSpecialNFT(address _off, uint256 _tokenId) internal {
        AllSpecialNFT[_off].push(_tokenId);
    }

    function nftsLen() public view returns (uint256) {
        return NFTs.length;
    }

    function nftVal(uint256 _id) public view returns (string memory) {
        return NFTs[_id];
    }

    function viewAllTokens(address _off)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory allUserTokensNontransfer = AllNonTransferrableNFT[
            _off
        ];
        uint256[] memory allUserTokensPrelaunch = AllPreLaunchNFT[_off];
        uint256[] memory allUserTokensGeneric = AllGenericNFT[_off];
        uint256[] memory allUserTokensSpecial = AllSpecialNFT[_off];
        uint256[] memory allTokens = new uint256[](
            allUserTokensGeneric.length +
                allUserTokensNontransfer.length +
                allUserTokensPrelaunch.length +
                allUserTokensSpecial.length
        );
        uint256 counter = 0;
        for (uint256 i = 0; i < allUserTokensNontransfer.length; i++) {
            // allTokens.push(allUserTokensNontransfer[i]);
            allTokens[counter] = allUserTokensNontransfer[i];
            counter += 1;
        }
        for (uint256 i = 0; i < allUserTokensPrelaunch.length; i++) {
            // allTokens.push(allUserTokensPrelaunch[i]);
            allTokens[counter] = allUserTokensPrelaunch[i];
            counter += 1;
        }
        for (uint256 i = 0; i < allUserTokensGeneric.length; i++) {
            // allTokens.push(allUserTokensGeneric[i]);
            allTokens[counter] = allUserTokensGeneric[i];
            counter += 1;
        }
        for (uint256 i = 0; i < allUserTokensSpecial.length; i++) {
            // allTokens.push(allUserTokensSpecial[i]);
            allTokens[counter] = allUserTokensSpecial[i];
            counter += 1;
        }
        return allTokens;
    }

    //this function returns all the tokens with nft info.
    function viewPersonalNFT(address _off)
        public
        view
        returns (nftProp[] memory)
    {
        // uint[] memory allOwnedTokens = viewAllTokens();
        uint256[] memory allOwnedTokens = viewAllTokens(_off);
        nftProp[] memory NFTpropDetail = new nftProp[](allOwnedTokens.length);
        for (uint256 i = 0; i < allOwnedTokens.length; i++) {
            NFTpropDetail[i] = NFTinfo[i];
            // NFTpropDetail.push(NFTinfo[i]);
        }
        return NFTpropDetail;
    }

    //same above function but contains another parameter allownedTokens.
    function userPersonalNFTinfo(address _off, uint256[] memory allOwnedTokens)
        public
        view
        returns (nftProp[] memory)
    {
        // uint[] memory allOwnedTokens = viewAllTokens(_off);
        nftProp[] memory NFTpropDetail = new nftProp[](allOwnedTokens.length);
        for (uint256 i = 0; i < allOwnedTokens.length; i++) {
            NFTpropDetail[i] = NFTinfo[i];
            // NFTpropDetail.push(NFTinfo[i]);
        }
        return NFTpropDetail;
    }

    function userStakedNFTinfo(address _user, uint256[] memory allOwnedTokens)
        public
        view
        returns (stakeProp[] memory)
    {
        stakeProp[] memory stakePropDetail = new stakeProp[](
            allOwnedTokens.length
        );
        for (uint256 i = 0; i < allOwnedTokens.length; i++) {
            (
                stakePropDetail[i]._stakedOn,
                stakePropDetail[i]._stakedTill
            ) = getStakedNFTProp(_user, i);
        }
        return stakePropDetail;
    }

    function viewUserStakedNFT(address _user)
        public
        view
        returns (nftProp[] memory, stakeProp[] memory)
    {
        uint256[] memory allStakedTokens = getAllStakedNFTFromAddress(_user);
        // uint[] memory allOwnedTokens = viewAllTokens();
        // uint[] memory allOwnedTokens = viewAllTokens(_user);
        return (
            userPersonalNFTinfo(_user, allStakedTokens),
            userStakedNFTinfo(_user, allStakedTokens)
        );
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
        address _off
    ) external {
        uint256 _tokenId = nftsLen();
        mintToOthers(_off, _nft);

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
            true
        );

        AllNonTransferrableNFT[_off].push(_tokenId);
    }

    /***** 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
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
        address _off
    ) external {
        uint256 _tokenId = nftsLen();
        mintToOthers(_off, _nft);
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
            true
        );
        AllPreLaunchNFT[_off].push(_tokenId);
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
        address _off
    ) external {
        uint256 _tokenId = nftsLen();
        mintToOthers(_off, _nft);
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
            true
        );

        AllGenericNFT[_off].push(_tokenId);
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
        address _off
    ) external {
        uint256 _tokenId = nftsLen();
        mintToOthers(_off, _nft);
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
            false
        );
        // addSpecialNFT(_off, _tokenId);
        AllSpecialNFT[_off].push(_tokenId);
    }

    /***** 
    _NonTransferableNFT function, is used to mint and then add the property of the NFT.
    Parameters:
    address: persons address.
    uint []: Integer Array that contains all the IDS owned by te that address.
    *****/
    mapping(address => uint256[]) _ownerOwnedIds;

    function getAllOwnerOwnedIds(address _user)
        public
        view
        returns (uint256[] memory)
    {
        return _ownerOwnedIds[_user];
    }

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
        emit mintEvent(msg.sender, _id);
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
        emit mintEvent(msg.sender, _id);
        _ownerOwnedIds[msg.sender].push(_id);
        //everytime we mint, then we are making sure that particular NFT is not minted again.
        _NFTExists[_nft] = true;
        previousOwners[_id] += 1;
    }

    /***** 
    Stake Prop contains different information on when was this nft staked and what else to do with it. or when is it supposed to be sent back.
    *****/
    struct stakeProp {
        uint256 _stakedOn;
        uint256 _stakedTill;
    }
    mapping(address => mapping(uint256 => stakeProp)) StakedNFTs;

    /***** 
    StakeSpecialNFT function, is used to stake a Special NFT so that particular person can participate in the VOTING.
    Parameters:
    address: address of the person to whose address you want to mint the NFT.
    Returns:
    bool: True if the staking is successful otherwise false.
    *****/

    function StakeSpecialNFT(address _off, uint256 _till) public {
        uint256 _tokenId;
        if (AllSpecialNFT[_off].length == 0) {
            _tokenId = AllSpecialNFT[_off][0];
        } else _tokenId = AllSpecialNFT[_off][AllSpecialNFT[_off].length - 1];
        // approve(_off, AllSpecialNFT[_off][_tokenId]); // this will send address and token id.
        _transfer(_off, address(this), _tokenId);
        AllSpecialNFT[_off].pop();
        //add this token to stake nft.
        AllStakedNFT[_off].push(_tokenId);
        StakedNFTs[_off][_tokenId]._stakedOn = block.timestamp;
        StakedNFTs[_off][_tokenId]._stakedTill = _till;
        emit Stake(_off, owner, _tokenId);
    }

    /***** 
    getAllStakedNFTFromAddress function, is used to return all the staked NFT's of the user.
    It takes the address and returns integer array that contains the token ids that have been staked by the user.
    Parameters:
    address: address of the person to whose address you want to mint the NFT.
    Returns:
    uint[]: an array containing all the tokenIds staked of that user.
    *****/
    function getAllStakedNFTFromAddress(address _off)
        public
        view
        returns (uint256[] memory)
    {
        return AllStakedNFT[_off];
    }

    /***** 
    getStakedNFTProp function, is used to return the stakedOn and StakedTill.
    Parameters:
    address: address of the person to whose address you want to mint the NFT.
    _tokenId: id of the token whose information needs to be fetched.
    Returns:
    uint, uint
    *****/
    function getStakedNFTProp(address _off, uint256 _tokenId)
        public
        view
        returns (uint256, uint256)
    {
        return (
            StakedNFTs[_off][_tokenId]._stakedOn,
            StakedNFTs[_off][_tokenId]._stakedTill
        );
    }

    /*** @Contract Marketplace: **/

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

    // function available to buy nfts... or the nfts that are available to sell by the user..returns the nft information along with the token ids for those nfts.
    function availableToBuy(address _user)
        public
        view
        returns (nftProp[] memory, uint256[] memory)
    {
        nftProp[] memory availableToBuyNFTsInformation = new nftProp[](
            forSellArray.length
        );
        uint256[] memory availableToBuyNFTsTokenIds = new uint256[](
            forSellArray.length
        );
        for (uint256 i = 0; i < forSellArray.length; i += 1) {
            //return the nftprop structure for selling.
            availableToBuyNFTsInformation[i] = NFTinfo[forSellArray[i]];
            availableToBuyNFTsTokenIds[i] = forSellArray[i];
        }
        return (availableToBuyNFTsInformation, availableToBuyNFTsTokenIds);
    }

    mapping(uint256 => bool) Bought;

    // tokenId=>true/false
    //add for sell, put them as we are selling.
    function addForSell(uint256 _tokenId) public isNFTOwner(_tokenId) {
        require(getNFTtype(_tokenId) != 4, "Cannot Sell Non Transferable NFT");
        require(forSell[_tokenId] == false, "Already Listed For Selling!!");
        forSell[_tokenId] = true;
        forSellArray.push(_tokenId);
    }

    function removeFromSell(uint256 _tokenId) public isNFTOwner(_tokenId) {
        require(
            Bought[_tokenId] == false,
            "Cannot remove from Selling, NFT is already sold..."
        );
        require(forSell[_tokenId] == true, "NFT is not listed for selling...");
        forSell[_tokenId] = false;
        //now remove the nft from forSellArray too....
        uint256 counter = 0;
        for (uint256 i = 0; i < forSellArray.length; i += 1) {
            //first swap, then pop
            if (forSellArray[i] == _tokenId) {
                counter = i;
                break;
            }
        }
        if (counter != forSellArray.length - 1) {
            //swap
            forSellArray[counter] = forSellArray[forSellArray.length - 1];
            forSellArray.pop();
        }
    }

    //used to buy the NFT
    function buyNFT(uint256 _tokenId) public {
        require(msg.sender != ownerOf(_tokenId), "You cannot Buy Your Own NFT");
        require(Bought[_tokenId] == false, "NFT Already Bought!!");
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

        //after buying the nft it should also be removed from forSell array as the nft is sold......
        bool shouldSwap = false;
        uint256 counter = 0;
        for (uint256 i = 0; i < forSellArray.length; i += 1) {
            //return
            if (forSellArray[i] == _tokenId) {
                counter = i;
                shouldSwap = true;
                break;
            }
        }
        if (shouldSwap) {
            //swap
            forSellArray[counter] = forSellArray[forSellArray.length - 1];
            forSellArray.pop();
        }
    }

    //after selling, we need to make sure that nft is added to wallet of user as well as removed from prevous owners wallet.
    function removeNFTfromAddress(
        uint256 _tokenId,
        address _tempUser,
        uint256[] memory tokensOwned
    ) internal pure returns (uint256[] memory) {
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
