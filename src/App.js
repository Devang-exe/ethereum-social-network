import React, {Component} from 'react';
import './App.css';
import Web3 from 'web3';
import {CONTRACT_ADDRESS, CONTRACT_ABI} from './config';
import Navbar from './Navbar';

class App extends Component {

  async componentDidMount() {
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const ethereum = window.ethereum;

    if(ethereum && ethereum.isMetaMask) {
      await this.loadAccount();

      window.web3 = new Web3(ethereum);
      const web3 = window.web3;
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      this.setState({contract});

      ethereum.on("accountsChanged", await this.loadAccount);
      ethereum.on("chainChanged", function(chainId) {
        window.location.reload();
      })

      this.setState({loading: false});

    }

    else {
      window.alert("Please install MetaMask");
    }
  }

  async loadAccount(accounts) {
    this.setState({loading: true});
    if(accounts) {
      this.setState({account: accounts[0]});
    }
    else {
      const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
      this.setState({account: accounts[0]});
    }
    this.setState({loading: false});
  }

  createPost(content) {
    /* TODO */
  }

  modifyPost(content) {
    /* TODO */
  }

  tipPost(content) {
    /* TODO */
  }

  filterPosts(address) {
    /* TODO */
  }

  constructor(props) {
    super(props);

    this.state = {
      account: "",
      /* TODO */
      loading: true
    }

    this.createPost = this.createPost.bind(this);
    this.modifyPost = this.modifyPost.bind(this);
    this.tipPost = this.tipPost.bind(this);
    this.filterPosts = this.filterPosts.bind(this);
    this.loadAccount = this.loadAccount.bind(this);
  }

  render() {
    return(
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading ?
          <div id="loader" className="text-center mt-5"><p>Loading...</p></div> :
          <div className="text-center mt-5"><p>Account: {this.state.account}</p></div>
        }
      </div>
    );
  }

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
