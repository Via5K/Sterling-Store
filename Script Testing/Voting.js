var abi = [{
        "inputs": [{
            "internalType": "contract NFT",
            "name": "_nft",
            "type": "address"
        }],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "name": "votingRecord",
        "outputs": [{
                "internalType": "string",
                "name": "votingName",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "votingStarted",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "resultDeclared",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "_index",
            "type": "uint256"
        }],
        "name": "findActiveVotingsId",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "activeVotingLength",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [{
            "internalType": "string",
            "name": "_tokenId",
            "type": "string"
        }],
        "name": "getVotingName",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [{
                "internalType": "string",
                "name": "_id",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_votingName",
                "type": "string"
            }
        ],
        "name": "createNewVoting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "string",
                "name": "_id",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_contestant",
                "type": "string"
            }
        ],
        "name": "addChoices",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "string",
            "name": "_id",
            "type": "string"
        }],
        "name": "viewChoices",
        "outputs": [{
            "internalType": "string[]",
            "name": "",
            "type": "string[]"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [{
                "internalType": "string",
                "name": "_id",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_votedFor",
                "type": "string"
            }
        ],
        "name": "newVote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "string",
            "name": "_id",
            "type": "string"
        }],
        "name": "startVoting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "string",
            "name": "_id",
            "type": "string"
        }],
        "name": "checkResult",
        "outputs": [{
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
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

//ABI OF VOTING CONTRACT


async function checkResult() {
    load();
    const account = await getCurrentAccount();
    var votingAddress = '0x06cAe43E2666269501dC4BEbFcfFd48f17498095';
    var votingContract = await new web3.eth.Contract(abi, votingAddress)
    var _id = document.getElementById('_checkResultId').value;


    var result = await votingContract.methods.checkResult(_id).call({
        from: account
    }, function (err, result) {
        if (err) {
            console.log("Error");
            console.log(err);
        }
        if (result) {
            console.log(result);
            // document.getElementById("createNewVoting").innerText = "Created Successfully with ID:" + _id;
            // console.log(result   );
        }
    });
}

async function newVote() {
    load();
    const account = await getCurrentAccount();
    var votingAddress = '0x06cAe43E2666269501dC4BEbFcfFd48f17498095';
    var votingContract = await new web3.eth.Contract(abi, votingAddress)
    var _id = document.getElementById('_newVoteId').value;
    var _votedFor = document.getElementById('_votedFor').value;

    var result = await votingContract.methods.newVote(_id, _votedFor).send({
        from: account
    }, function (err, result) {
        if (err) {
            console.log("Error");
            console.log(err);
        }
        if (result) {
            console.log(result);
            // document.getElementById("createNewVoting").innerText = "Created Successfully with ID:" + _id;
            // console.log(result   );
        }
    });
}


async function startVoting() {
    load();
    const account = await getCurrentAccount();
    var votingAddress = '0x06cAe43E2666269501dC4BEbFcfFd48f17498095';
    var votingContract = await new web3.eth.Contract(abi, votingAddress)
    var _id = document.getElementById('_startVotingId').value;

    var result = await votingContract.methods.startVoting(_id).send({
        from: account
    }, function (err, result) {
        if (err) {
            console.log("Error");
            console.log(err);
        }
        if (result) {
            console.log(result);
            // document.getElementById("createNewVoting").innerText = "Created Successfully with ID:" + _id;
            // console.log(result   );
        }
    });
}
async function viewChoices() {
    load();
    const account = await getCurrentAccount();
    var votingAddress = '0x06cAe43E2666269501dC4BEbFcfFd48f17498095';
    var votingContract = await new web3.eth.Contract(abi, votingAddress)
    var _id = document.getElementById('_viewChoiceId').value;

    var result = await votingContract.methods.viewChoices(_id).call({
        from: account
    }, function (err, result) {
        if (err) {
            console.log("Error");
            console.log(err);
        }
        if (result) {
            console.log(result);
            var s = result.length;
            console.log(s);
            for (var i = 0; i < s; i++) {
                console.log(result[0]);
            }
            // document.getElementById("createNewVoting").innerText = "Created Successfully with ID:" + _id;
            // console.log(result   );
        }
    });
}

async function addChoices() {
    load();
    const account = await getCurrentAccount();
    var votingAddress = '0x06cAe43E2666269501dC4BEbFcfFd48f17498095';
    var votingContract = await new web3.eth.Contract(abi, votingAddress)
    var _id = document.getElementById('_id').value;
    var _contestant = document.getElementById('_contestant').value;
    var result = await votingContract.methods.addChoices(_id, _contestant).send({
        from: account
    }, function (err, result) {
        if (err) {
            console.log("Error");
            console.log(err);
        }
        if (result) {
            console.log(_contestant);
            // document.getElementById("createNewVoting").innerText = "Created Successfully with ID:" + _id;
            console.log(result);
        }
    });
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


async function createNewVoting() {
    load();
    const account = await getCurrentAccount();
    var votingAddress = '0x06cAe43E2666269501dC4BEbFcfFd48f17498095';
    var votingContract = await new web3.eth.Contract(abi, votingAddress)
    var _id = _UqUrl();
    var _votingName = document.getElementById('_votingName').value;
    var result = await votingContract.methods.createNewVoting(_id, _votingName).send({
        from: account
    }, function (err, result) {
        if (err) {
            console.log("Error");
            console.log(err);
        }
        if (result) {
            console.log(_id);
            document.getElementById("createNewVoting").innerText = "Created Successfully with ID:" + _id;
            console.log(result);
        }
    });
}


async function getVotingName() {
    load();
    const account = await getCurrentAccount();
    var votingAddress = '0x06cAe43E2666269501dC4BEbFcfFd48f17498095';
    var votingContract = await new web3.eth.Contract(abi, votingAddress)
    var _tokenId = document.getElementById('_tokenId').value;
    var result = await votingContract.methods.getVotingName(_tokenId).call({
        from: account
    }, function (err, result) {
        if (err) {
            console.log("Error");
            console.log(err);
        }
        if (result) {
            document.getElementById("getVotingName").innerText = result;
            console.log(result);
        }
    });
}



async function findActiveVotingsId() {
    load();
    const account = await getCurrentAccount();
    var votingAddress = '0x06cAe43E2666269501dC4BEbFcfFd48f17498095';
    var votingContract = await new web3.eth.Contract(abi, votingAddress)
    var _index = document.getElementById('_index').value;
    //once redeployed, make sure to change the method name here too... rename it as. findActiveVotingsId
    var result = await votingContract.methods.activeVotings(_index).call({
        from: account
    }, function (err, result) {
        if (err) {
            console.log("Error");
            console.log(err);
        }
        if (result) {
            document.getElementById("findActiveVotingsId").innerText = result;
            console.log(result);
        }
    });
}

async function activeVotingLength() {
    load();
    const account = await getCurrentAccount();
    var votingAddress = '0x06cAe43E2666269501dC4BEbFcfFd48f17498095';
    var votingContract = await new web3.eth.Contract(abi, votingAddress)
    var result = await votingContract.methods.activeVotingLength().call({
        from: account
    }, function (err, result) {
        if (err) {
            console.log("Error");
            console.log(err);
        }
        if (result) {
            document.getElementById("activeVotingLength").innerText = result;
            console.log(result);
        }
    });
}