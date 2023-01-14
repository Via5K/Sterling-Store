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
const GenericNFT = artifacts.require("GenericNFT");
const NFT = artifacts.require("NFT");
const NonTransferableNFT = artifacts.require("NonTransferableNFT");
const PreLaunchNFT = artifacts.require("PreLaunchNFT");
const SpecialNFT = artifacts.require("SpecialNFT");
const Voting = artifacts.require("Voting");
module.exports = async function(deployer) {
    await deployer.deploy(CheckDigitalDuplicate);
    await deployer.deploy(CheckRefurbished);
    await deployer.deploy(ERC721);
    // const con = deployer.deploy(ERC721Connector, "Neeraj", "NEER");
    await deployer.deploy(ERC721Enumerable);
    // const con2 = deployer.deploy(ERC721Metadata, "Neeraj1", "NEER1");
    await deployer.deploy(GenericNFT);
    const GenericNFT_ = await GenericNFT.deployed();
    await deployer.deploy(NFT);
    await deployer.deploy(NonTransferableNFT);
    const NonTransferableNFT_ = await NonTransferableNFT.deployed();
    await deployer.deploy(PreLaunchNFT);
    const PreLaunchNFT_ = await PreLaunchNFT.deployed();
    await deployer.deploy(SpecialNFT);
    const SpecialNFT_ = await SpecialNFT.deployed();
    await deployer.deploy(Voting);
    await deployer.deploy(Caller, GenericNFT_.address, SpecialNFT_.address, NonTransferableNFT_.address, PreLaunchNFT_.address);

};