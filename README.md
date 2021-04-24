# Ethereum Social Network

### Features

* Create posts
* Modify posts
* Tip posts
* Modify profile

### Usage details - Testing phase

Prerequisites:
* Metamask
* Ganache
  - Save the environment after deploying the smart contract, for later access.
  - Import some accounts into metamask, for interaction from the webpage.

Usage:
* This is an example application only for development purpose.
* It has been tested on local Ganache blockchain.
* To test on your machine, follow these steps:
  1. Deploy the smart contracts (inside /src/contracts/) on a Ganache network using Remix IDE or truffle.
  2. Edit the deployed contract addresses in /src/config.js. Currently they are:
     ```js
     CONTRACT_ADDRESS = "0xf7cD57DDBf1770951aD783De8887876c94B06167"
     PROFILES_CONTRACT_ADDRESS = "0x80FACBAAf9dBa32217E96D08f20a36dBb0bD83e2";
     ```
  3. Make sure to save the Ganache network environment, and run it every time while working with the application.
  4. Navigate to project directory and run `npm install` to install all the required packages.
  5. Start the server using `npm start`.
