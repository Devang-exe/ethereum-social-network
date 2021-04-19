# Ethereum Social Network

### Features

* Create Posts
* Modify Posts

### Usage details

Prerequisites:
* Metamask
* Ganache (optional)
  - Save the environment after deploying the smart contract, for later access.
  - Import some accounts into metamask, for interaction from the webpage.

* This is an example application only for development purpose.
* It has been tested on local Ganache blockchain.
* To test on your machine, follow these steps:
  1. Deploy the smart contract (/src/contracts/SocialNetwork.sol) on a network (local Ganache or any public network) using Remix IDE or truffle.
  2. Edit the deployed contract address in /src/config.js. Currently it is:
     ```js
     CONTRACT_ADDRESS = "0xf7cD57DDBf1770951aD783De8887876c94B06167"
     ```
  3. If the contract is deployed on Ganache, make sure to save the environment, and run it every time while working with the application.
  4. Start the server using `npm start`.
