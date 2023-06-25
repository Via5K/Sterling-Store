# NFT In e-commerce [Strerling Store]

This Repository is a part of NFT in E-Commerce, It includes the implementation of Blockchain section and test only as of now. Full Project with working demo can be viewed at [SterlingStore](https://nftincommerce.vercel.app).

## Deployment Information: [NOTE: This deployment is moved to Sepolia Network]

Current Active Deployment is done on Goerli Network. 
![image](https://user-images.githubusercontent.com/72505269/191512347-b93f5879-7047-4f39-87f1-4fbc754b15c5.png)


Local Deployment is on Localhost.

![image](https://user-images.githubusercontent.com/72505269/191512294-8c6c3db7-0956-4614-ab5b-9bc3ac600b04.png)



#### Clean Networks:

```truffle networks --clean``` : removes all the deployments

```truffle migrate --reset --network <goerli - N/W Name>```: Resets the contract deployment i.e starts from 0 and deploys it on goerli net.

```truffle console --network goerli```: opens goerli console.


### .env

Contains the Memonic and the address of the testnet. Format of same is:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/API_KEY"

MNEMONIC = "privatekey here"
```

## Deploy

![image](https://user-images.githubusercontent.com/72505269/191513057-efcaf329-5507-4109-b6ec-eab09e560df8.png)


To re-deploy, you will first need to install the requirements.
You should have *Node* installed

`npm install`

### For Local Deployment

1. truffle compile
2. truffle migrate --reset 
3. truffle console
4. Now you will be in console window and you can run commands. See the below section on how to run commands in local deployment.

### For Testnet Deployment

1. truffle compile
2. truffle migrate --reset  --network goerli (here i am using goerli testnet)
3. truffle console --network goerli (to enter into the goerli testnet console)
4. Run the commands just like you ran commands in Local deployment.


## CLI

First, you have to create a instance of the deployment using `const n = await NFT.deployed()`

Now, you can access the Patients contract with the 'n' only. So all the functions can be accessed like this

1. `n.name()`
2. `n.setURL('ID','URL')`

Similarly, you can do it for other contracts, and call the functions with `instanceName.functionName('parameter')`


## Fronetend

This is the backend implementation for Sterling Store. Frontend Implementation can be viewed in [here](https://github.com/PrashantAmoli/NFTCommerce).
Note that this is a POC for implementation of Ecommerce to blockchain with the help of NFTs.
