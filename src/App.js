import React, {Component} from 'react';
import './App.css';
import Web3 from 'web3';
import {CONTRACT_ADDRESS, CONTRACT_ABI} from './config';
import Navbar from './Navbar';
import PostCreateForm from './PostCreateForm';
import Post from './Post';

class App extends Component {

  async componentDidMount() {
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const ethereum = window.ethereum;

    if(ethereum && ethereum.isMetaMask) {
      await this.loadAccount();

      ethereum.on("accountsChanged", await this.loadAccount);
      ethereum.on("chainChanged", function(chainId) {
        window.location.reload();
      });

      window.web3 = new Web3(ethereum);

      const contract = new window.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      this.setState({contract});

      await this.loadPosts();

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

  async loadPosts() {
    this.setState({loading: true});

    const postCount = await this.state.contract.methods.postCount().call();
    this.setState({postCount});

    this.setState({posts: []});

    for(let i=1; i<=postCount; i++) {
      const post = await this.state.contract.methods.posts(i).call();
      this.setState({posts: [...this.state.posts, post]});
    }

    this.setState({posts: 
      this.state.posts.sort((a,b) => b.tip - a.tip)
    });

    this.setState({loading: false});
  }

  createPost(content) {
    this.setState({loading: true});

    this.state.contract.methods.createPost(content).send({from: this.state.account})
    .once("receipt", async (receipt) => {
      await this.loadPosts();
      this.setState({loading: false});
    });
  }

  modifyPost(id, content) {
    this.setState({loading: true});

    this.state.contract.methods.modifyPost(id, content).send({from: this.state.account})
    .once("receipt", async (receipt) => {
      await this.loadPosts();
      this.setState({loading: false});
    });
  }

  tipPost(id, tip) {
    this.setState({loading: true});

    this.state.contract.methods.tipPost(id).send({from: this.state.account, value: tip})
    .once("receipt", async (receipt) => {
      await this.loadPosts();
      this.setState({loading: false});
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      account: "",
      contract: null,
      postCount: 0,
      posts: [],
      loading: true
    }

    this.loadAccount = this.loadAccount.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.createPost = this.createPost.bind(this);
    this.modifyPost = this.modifyPost.bind(this);
    this.tipPost = this.tipPost.bind(this);
  }

  render() {
    return(
      <div>
        {/* Navbar at the top */}
        <Navbar account={this.state.account} />

        { this.state.loading ?
          <div id="loader" className="text-center mt-5"><p>Loading...</p></div> :
          <div>
            {/* Post creation form */}
            <PostCreateForm createPost={this.createPost} />
            {/* Posts list */}
            { this.state.posts.map((post, key) => {
                  return (<Post
                          currentAccount={this.state.account}
                          post={post}
                          key={key}
                          modifyPost={this.modifyPost}
                          tipPost={this.tipPost}
                        />)
                })
            }
          </div>
        }
      </div>
    );
  }
}

export default App;
