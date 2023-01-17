// const Name  = artifacts.require("Name");

// module.exports = function(deployer) {
//     deployer.deploy(Name);
// };

const Caller = artifacts.require("Caller");
const CheckDigitalDuplicate = artifacts.require("CheckDigitalDuplicate");
const CheckRefurbished = artifacts.require("CheckRefurbished");
const ERC721 = artifacts.require("ERC721");
const ERC721Connector = artifacts.require("ERC721Connector");
const ERC721Enumerable = artifacts.require("ERC721Enumerable");
const ERC721Metadata = artifacts.require("ERC721Metadata");
const NFT = artifacts.require("NFT");
const Voting = artifacts.require("Voting");
// const GenericNFT = artifacts.require("GenericNFT");
// const SpecialNFT = artifacts.require("SpecialNFT");
// const NonTransferableNFT = artifacts.require("NonTransferableNFT");
// const PreLaunchNFT = artifacts.require("PreLaunchNFT");
module.exports = async function(deployer) {
    await deployer.deploy(CheckDigitalDuplicate);
    await deployer.deploy(CheckRefurbished);
    await deployer.deploy(ERC721);
    await deployer.deploy(ERC721Enumerable);
    await deployer.deploy(NFT);
    const NFT_ = await NFT.deployed();
    await deployer.deploy(Voting);
    await deployer.deploy(Caller, NFT_.address);
    // const con = deployer.deploy(ERC721Connector, "Neeraj", "NEER");
    // const con2 = deployer.deploy(ERC721Metadata, "Neeraj1", "NEER1");
    // await deployer.deploy(GenericNFT);
    // const GenericNFT_ = await GenericNFT.deployed();
    // await deployer.deploy(NonTransferableNFT);
    // const NonTransferableNFT_ = await NonTransferableNFT.deployed();
    // await deployer.deploy(PreLaunchNFT);
    // const PreLaunchNFT_ = await PreLaunchNFT.deployed();
    // await deployer.deploy(SpecialNFT);
    // const SpecialNFT_ = await SpecialNFT.deployed();
};