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


async function buyNFT() {
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
    var tokenId = document.getElementById("_tokenId").value;

    var result = await nftcontract.methods.buyNFT(tokenId).send({
        from: account
    }, function (err, res) {
        if (err) {
            console.log(err);
        } else if (res) {
            console.log(res);
            // console.log(res[0]);
            // console.log(res[1]);
            // console.log(res[2]);
            // console.log(res[3]);
            // document.getElementById("__boughtOn").innerText = res[0];
            // document.getElementById("__sellerAddress").innerText = res[1];
            // document.getElementById("__expireOn").innerText = res[2];
            // if (res[3] == true)
            //     document.getElementById("__expireable").innerText = "True";
            // else {
            //     document.getElementById("__expireable").innerText = "False";
            // }
        }
    });
}