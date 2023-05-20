async function owner() {
    load();
    const account = await getCurrentAccount();
    //NFT contract ABI
    var abi = [{
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "address",
            "name": "approved",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "Approval",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }, {
            "indexed": false,
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
        }],
        "name": "ApprovalForAll",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "Stake",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "Transfer",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "mintEvent",
        "type": "event"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "AllGenericNFT",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "AllNonTransferrableNFT",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "AllPreLaunchNFT",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "AllSpecialNFT",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "AllStakedNFT",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "NFTinfo",
        "outputs": [{
            "internalType": "bool",
            "name": "minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "bool",
            "name": "expireable",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "NFTs",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }],
        "name": "balanceOf",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "boughtOnDate",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "getApproved",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }],
        "name": "isApprovedForAll",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "name",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "owner",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "ownerOf",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }, {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
        }],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }, {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
        }],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "bytes4",
            "name": "interfaceId",
            "type": "bytes4"
        }],
        "name": "supportsInterface",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "symbol",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "tempExp",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "tokenURI",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }, {
            "internalType": "string",
            "name": "_nftURL",
            "type": "string"
        }],
        "name": "setURL",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_NumberOfItems",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_cap",
            "type": "uint256"
        }],
        "name": "buyBulk",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "viewNFTPropByIndex1",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "viewNFTPropByIndex2",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }, {
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }, {
            "internalType": "bool",
            "name": "_minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "_nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "bool",
            "name": "_expireable",
            "type": "bool"
        }],
        "name": "addNftProp",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "addNewBoughtOn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_exp",
            "type": "uint256"
        }],
        "name": "addTempExp",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_expiryDate",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "addExpiredOn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "__ExpireOn",
            "type": "uint256"
        }],
        "name": "ifTimeHasPassed",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "AllSpecialNFTLength",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "nftsLen",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_id",
            "type": "uint256"
        }],
        "name": "nftVal",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }, {
            "internalType": "bool",
            "name": "_minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "_nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "_NonTransferableNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }, {
            "internalType": "bool",
            "name": "_minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "_nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "_PreLaunch",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }, {
            "internalType": "bool",
            "name": "_minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "_nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "_Generic",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }, {
            "internalType": "bool",
            "name": "_minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "_nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "_Special",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "_of",
            "type": "address"
        }, {
            "internalType": "string",
            "name": "__url",
            "type": "string"
        }],
        "name": "removeAllExpiredNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }],
        "name": "mintToOthers",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_till",
            "type": "uint256"
        }],
        "name": "StakeSpecialNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "getAllStakedNFTFromAddress",
        "outputs": [{
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "getStakedNFTProp",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }];
    //NFT CONTRACT ADDRESS
    var nftaddress = '0xC5c4309bd5B33E066d145bd9Aa972B610a61e2F9';

    var nftcontract = await new web3.eth.Contract(abi, nftaddress);
    var tid = document.getElementById("tid").value;
    var result = await nftcontract.methods.ownerOf(tid).call({
        from: account
    }, function(err, res) {
        if (err) {
            console.log(err);

        } else if (res) {
            console.log(res);
        }
    });

}

async function viewProp1() {
    load();
    const account = await getCurrentAccount();
    var abi = [{
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "address",
            "name": "approved",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "Approval",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }, {
            "indexed": false,
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
        }],
        "name": "ApprovalForAll",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "Stake",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "Transfer",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "mintEvent",
        "type": "event"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "AllGenericNFT",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "AllNonTransferrableNFT",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "AllPreLaunchNFT",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "AllSpecialNFT",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "AllStakedNFT",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "NFTinfo",
        "outputs": [{
            "internalType": "bool",
            "name": "minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "bool",
            "name": "expireable",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "NFTs",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }],
        "name": "balanceOf",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "boughtOnDate",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "getApproved",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }],
        "name": "isApprovedForAll",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "name",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "owner",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "ownerOf",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }, {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
        }],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }, {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
        }],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "bytes4",
            "name": "interfaceId",
            "type": "bytes4"
        }],
        "name": "supportsInterface",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "symbol",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "tempExp",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "tokenURI",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }, {
            "internalType": "string",
            "name": "_nftURL",
            "type": "string"
        }],
        "name": "setURL",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_NumberOfItems",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_cap",
            "type": "uint256"
        }],
        "name": "buyBulk",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "viewNFTPropByIndex1",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "viewNFTPropByIndex2",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }, {
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }, {
            "internalType": "bool",
            "name": "_minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "_nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "bool",
            "name": "_expireable",
            "type": "bool"
        }],
        "name": "addNftProp",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "addNewBoughtOn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_exp",
            "type": "uint256"
        }],
        "name": "addTempExp",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_expiryDate",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "addExpiredOn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "__ExpireOn",
            "type": "uint256"
        }],
        "name": "ifTimeHasPassed",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "AllSpecialNFTLength",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "nftsLen",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_id",
            "type": "uint256"
        }],
        "name": "nftVal",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }, {
            "internalType": "bool",
            "name": "_minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "_nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "_NonTransferableNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }, {
            "internalType": "bool",
            "name": "_minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "_nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "_PreLaunch",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }, {
            "internalType": "bool",
            "name": "_minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "_nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "_Generic",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }, {
            "internalType": "bool",
            "name": "_minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "_nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "_Special",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "_of",
            "type": "address"
        }, {
            "internalType": "string",
            "name": "__url",
            "type": "string"
        }],
        "name": "removeAllExpiredNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }],
        "name": "mintToOthers",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_till",
            "type": "uint256"
        }],
        "name": "StakeSpecialNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "getAllStakedNFTFromAddress",
        "outputs": [{
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "getStakedNFTProp",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }];
    var nftaddress = '0xC5c4309bd5B33E066d145bd9Aa972B610a61e2F9';

    var nftcontract = await new web3.eth.Contract(abi, nftaddress)
    var pid = document.getElementById("id").value;

    var result = await nftcontract.methods.viewNFTPropByIndex1(pid).call({
        from: account
    }, function(err, res) {
        if (err) {
            console.log(err);

        } else if (res) {
            console.log(res[0]);
            console.log(res[1]);
            console.log(res[2]);
            console.log(res[3]);
            console.log(res[4]);
            document.getElementById("__name").innerText = res[0];
            document.getElementById("__description").innerText = res[1];
            document.getElementById("__url").innerText = res[2];
            document.getElementById("__trxnHash").innerText = res[3];
            document.getElementById("__nftType").innerText = res[4];
        }
    });
}

async function viewProp2() {
    load();
    const account = await getCurrentAccount();
    var abi = [{
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "address",
            "name": "approved",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "Approval",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }, {
            "indexed": false,
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
        }],
        "name": "ApprovalForAll",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "Stake",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "Transfer",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "mintEvent",
        "type": "event"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "AllGenericNFT",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "AllNonTransferrableNFT",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "AllPreLaunchNFT",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "AllSpecialNFT",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "AllStakedNFT",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "NFTinfo",
        "outputs": [{
            "internalType": "bool",
            "name": "minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "bool",
            "name": "expireable",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "NFTs",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }],
        "name": "balanceOf",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "boughtOnDate",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "getApproved",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }],
        "name": "isApprovedForAll",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "name",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "owner",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "ownerOf",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }, {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
        }],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }, {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
        }],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "bytes4",
            "name": "interfaceId",
            "type": "bytes4"
        }],
        "name": "supportsInterface",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "symbol",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "tempExp",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "tokenURI",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }, {
            "internalType": "string",
            "name": "_nftURL",
            "type": "string"
        }],
        "name": "setURL",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_NumberOfItems",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_cap",
            "type": "uint256"
        }],
        "name": "buyBulk",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "viewNFTPropByIndex1",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "viewNFTPropByIndex2",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }, {
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }, {
            "internalType": "bool",
            "name": "_minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "_nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "bool",
            "name": "_expireable",
            "type": "bool"
        }],
        "name": "addNftProp",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "addNewBoughtOn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_exp",
            "type": "uint256"
        }],
        "name": "addTempExp",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_expiryDate",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "addExpiredOn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "__ExpireOn",
            "type": "uint256"
        }],
        "name": "ifTimeHasPassed",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "AllSpecialNFTLength",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "nftsLen",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_id",
            "type": "uint256"
        }],
        "name": "nftVal",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }, {
            "internalType": "bool",
            "name": "_minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "_nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "_NonTransferableNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }, {
            "internalType": "bool",
            "name": "_minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "_nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "_PreLaunch",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }, {
            "internalType": "bool",
            "name": "_minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "_nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "_Generic",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }, {
            "internalType": "bool",
            "name": "_minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "_nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "_Special",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "_of",
            "type": "address"
        }, {
            "internalType": "string",
            "name": "__url",
            "type": "string"
        }],
        "name": "removeAllExpiredNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }],
        "name": "mintToOthers",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_till",
            "type": "uint256"
        }],
        "name": "StakeSpecialNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "getAllStakedNFTFromAddress",
        "outputs": [{
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "getStakedNFTProp",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }];
    var nftaddress = '0xC5c4309bd5B33E066d145bd9Aa972B610a61e2F9';

    var nftcontract = await new web3.eth.Contract(abi, nftaddress)
    var pid = document.getElementById("id").value;

    var result = await nftcontract.methods.viewNFTPropByIndex2(pid).call({
        from: account
    }, function(err, res) {
        if (err) {
            console.log(err);
        } else if (res) {
            console.log(res[0]);
            console.log(res[1]);
            console.log(res[2]);
            console.log(res[3]);
            document.getElementById("__boughtOn").innerText = res[0];
            document.getElementById("__sellerAddress").innerText = res[1];
            document.getElementById("__expireOn").innerText = res[2];
            if (res[3] == true)
                document.getElementById("__expireable").innerText = "True";
            else {
                document.getElementById("__expireable").innerText = "False";
            }
        }
    });
}

async function createNFT() {
    load();
    const account = await getCurrentAccount();
    var abi = [{
        "inputs": [{
            "internalType": "contract NFT",
            "name": "_nft",
            "type": "address"
        }],
        "stateMutability": "nonpayable",
        "type": "constructor"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_cost",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_pid",
            "type": "uint256"
        }, {
            "internalType": "string",
            "name": "_UqURL",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_trxnHash",
            "type": "string"
        }, {
            "internalType": "address",
            "name": "_seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_validTill",
            "type": "uint256"
        }],
        "name": "createNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }];
    var callerAddress = '0xAF1e8d728390eA94ef700D9172FEeEFC34495DD4';

    var callerContract = await new web3.eth.Contract(abi, callerAddress)

    var cost = document.getElementById("_cost").value;
    var pid = document.getElementById("_pid").value;
    var UqUrl = _UqUrl();
    console.log(UqUrl);
    var name = document.getElementById("_name").value;
    var description = document.getElementById("_description").value;
    var url = document.getElementById("_url").value;
    var trxnHash = document.getElementById("_trxnHash").value;
    var sellerAddress = document.getElementById("_sellerAddress").value;
    var validTill = document.getElementById("_validTill").value;

    var result = await callerContract.methods.createNFT(cost, pid, UqUrl, name,
        description, url, trxnHash,
        sellerAddress, validTill).send({
        from: account
    }, function(err, result) {
        if (err) {
            console.log("Error");
            console.log(err);
        }
        if (result) {
            document.getElementById("welcome").innerText = "ThankYou";
        }
    });
    console.log(cost, pid, UqUrl, name,
        description, url, trxnHash,
        sellerAddress, validTill);
    // console.log(typeof(cost));
    // console.log(cost);
}

function _UqUrl() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function removeAllExpiredNFT() {
    load();
    const account = await getCurrentAccount();
    //NFT contract ABI
    var abi = [{
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "address",
            "name": "approved",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "Approval",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }, {
            "indexed": false,
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
        }],
        "name": "ApprovalForAll",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "Stake",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "Transfer",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "mintEvent",
        "type": "event"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "AllGenericNFT",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "AllNonTransferrableNFT",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "AllPreLaunchNFT",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "AllSpecialNFT",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "AllStakedNFT",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "NFTinfo",
        "outputs": [{
            "internalType": "bool",
            "name": "minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "bool",
            "name": "expireable",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "NFTs",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }],
        "name": "balanceOf",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "boughtOnDate",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "getApproved",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }],
        "name": "isApprovedForAll",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "name",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "owner",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "ownerOf",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }, {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
        }],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }, {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
        }],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "bytes4",
            "name": "interfaceId",
            "type": "bytes4"
        }],
        "name": "supportsInterface",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "symbol",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "tempExp",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "tokenURI",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }, {
            "internalType": "string",
            "name": "_nftURL",
            "type": "string"
        }],
        "name": "setURL",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_NumberOfItems",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_cap",
            "type": "uint256"
        }],
        "name": "buyBulk",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "viewNFTPropByIndex1",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "viewNFTPropByIndex2",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }, {
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }, {
            "internalType": "bool",
            "name": "_minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "_nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "bool",
            "name": "_expireable",
            "type": "bool"
        }],
        "name": "addNftProp",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "addNewBoughtOn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_exp",
            "type": "uint256"
        }],
        "name": "addTempExp",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_expiryDate",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "addExpiredOn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "__ExpireOn",
            "type": "uint256"
        }],
        "name": "ifTimeHasPassed",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "AllSpecialNFTLength",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "nftsLen",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_id",
            "type": "uint256"
        }],
        "name": "nftVal",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }, {
            "internalType": "bool",
            "name": "_minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "_nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "_NonTransferableNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }, {
            "internalType": "bool",
            "name": "_minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "_nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "_PreLaunch",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }, {
            "internalType": "bool",
            "name": "_minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "_nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "_Generic",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }, {
            "internalType": "bool",
            "name": "_minted",
            "type": "bool"
        }, {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_description",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_url",
            "type": "string"
        }, {
            "internalType": "string",
            "name": "_trxnHash",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "_nftType",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_boughtOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_seller",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_ExpireOn",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "_Special",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "_of",
            "type": "address"
        }, {
            "internalType": "string",
            "name": "__url",
            "type": "string"
        }],
        "name": "removeAllExpiredNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "string",
            "name": "_nft",
            "type": "string"
        }],
        "name": "mintToOthers",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_till",
            "type": "uint256"
        }],
        "name": "StakeSpecialNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }],
        "name": "getAllStakedNFTFromAddress",
        "outputs": [{
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "_off",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "getStakedNFTProp",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }];
    //NFT CONTRACT ADDRESS
    var nftaddress = '0xC5c4309bd5B33E066d145bd9Aa972B610a61e2F9';
    var nftcontract = await new web3.eth.Contract(abi, nftaddress);
    // var _person = document.getElementById("_person").value;
    var _url = document.getElementById("_url").value;
    var result = await nftcontract.methods.removeAllExpiredNFT(account, _url).call({
        from: account
    }, function(err, res) {
        if (err) {
            console.log(err);
        } else if (res) {
            console.log(res);
            console.log(res[0]);
            document.getElementById("expireNFTHead").innerText = "Removed All Expired NFT";
        }
    });
}

async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
    }
}
async function load() {
    await loadWeb3();
}
async function getCurrentAccount() {
    const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
}
//Simple function that converts the Current Date to unix timestamp format so that it can easily do the operations for expired NFT format. 
//Also because block.timestamp gives the time in UNIX Format.
function convertCurrentDateToUnixTime() {
    const date = new Date();
    const timeInMillisecond = date.getTime();
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    console.log(unixTimestamp); // 1623801600
    return unixTimestamp;
}