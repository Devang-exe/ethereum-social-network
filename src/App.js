import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import assert from 'assert';
import './App.css';
import Web3 from 'web3';
import {CONTRACT_ADDRESS, CONTRACT_ABI, PROFILES_CONTRACT_ADDRESS, PROFILES_CONTRACT_ABI} from './config';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import User from './components/User';

class App extends Component {

  async componentDidMount() {
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const ethereum = window.ethereum;

    if(ethereum && ethereum.isMetaMask) {

      window.web3 = new Web3(ethereum);

      const contract = new window.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      this.setState({contract});

      const profilesContract = new window.web3.eth.Contract(PROFILES_CONTRACT_ABI, PROFILES_CONTRACT_ADDRESS);
      this.setState({profilesContract});

      await this.loadAccount();

      ethereum.on("accountsChanged", await this.loadAccount);
      ethereum.on("chainChanged", function() {
        window.location.reload();
      });

      this.setState({contractsLoaded: true});

      await this.loadPosts();

      this.setState({loading: false});
    }

    else {
      window.alert("Please install MetaMask");
    }
  }

  async loadAccount() {
    this.setState({loading: true});

    const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
    this.setState({account: accounts[0]});
    await this.loadProfile(this.state.account);

    this.setState({loading: false});
  }

  async loadPosts() {
    this.setState({loading: true});

    let oldPostCount = parseInt(this.state.postCount);

    let newPostCount = await this.state.contract.methods.postCount().call();
    newPostCount = parseInt(newPostCount);

    for(let id = oldPostCount+1; id <= newPostCount; id++) {
      await this.loadPost(id);
    }

    this.setState({postCount: newPostCount});
    this.setState({loading: false});
  }

  async loadPost(id) {
    assert(typeof id === "number");

    let post = await this.state.contract.methods.posts(id).call();
    let object = {};
    object[id] = post;

    this.setState({
      posts: Object.assign(this.state.posts, object)
    });

    await this.loadProfile(post["author"]);
  }

  async loadProfile(address) {
    assert(typeof address === "string");
    assert(address.length === 42);
    assert(address.slice(0,2) === "0x");

    address = address.toLowerCase();

    if(!(this.state.userProfiles[address])) {

      let profile = await this.state.profilesContract.methods.profiles(address).call();
      let object = {};
      object[address] = profile;

      this.setState({
        userProfiles: Object.assign(this.state.userProfiles, object)
      });
    }
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

    id = parseInt(id);
    this.state.contract.methods.modifyPost(id, content).send({from: this.state.account})
    .once("receipt", async (receipt) => {
      await this.loadPost(id);
      this.setState({loading: false});
    });
  }

  tipPost(id, tip) {
    this.setState({loading: true});

    id = parseInt(id);
    this.state.contract.methods.tipPost(id).send({from: this.state.account, value: tip})
    .once("receipt", async (receipt) => {
      await this.loadPost(id);
      this.setState({loading: false});
    });
  }

  modifyProfile(
    address,
    displayName,
    name,
    day,
    month,
    year,
    gender,
    email,
    profession,
    about) {

      this.state.profilesContract.methods.setProfile(
        address,
        displayName,
        name,
        day,
        month,
        year,
        gender,
        email,
        profession,
        about
      ).send({from: this.state.account})
      .once("receipt", async(receipt) => {
        await this.loadProfile(address);
      })
    }

  constructor(props) {
    super(props);

    this.state = {
      account: "",
      contract: null,
      profilesContract: null,
      postCount: 0,
      posts: {},
      userProfiles: {},
      contractsLoaded: false,
      loading: true
    }

    this.loadAccount = this.loadAccount.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.loadPost = this.loadPost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.modifyPost = this.modifyPost.bind(this);
    this.tipPost = this.tipPost.bind(this);
    this.loadProfile = this.loadProfile.bind(this);
    this.modifyProfile = this.modifyProfile.bind(this);
  }

  render() {
    return(
      <BrowserRouter>

        <NavigationBar account={this.state.account} />
        <div className="mt-5"></div>
        <br />

        <Switch>

          <Route path="/" exact render={() =>
              <Home
                loading={this.state.loading}
                account={this.state.account}
                posts={this.state.posts}
                userProfiles={this.state.userProfiles}
                createPost={this.createPost}
                modifyPost={this.modifyPost}
                tipPost={this.tipPost}
              />
            }
          />

          <Route path="/me" exact render={() =>
              <User
                loading={this.state.loading}
                account={this.state.account}
                posts={this.state.posts}
                userAddress={this.state.account}
                userProfile={this.state.userProfiles[this.state.account.toLowerCase()]}
                modifyPost={this.modifyPost}
                tipPost={this.tipPost}
                modifyProfile={this.modifyProfile}
              />
            }
          />

          <Route path="/user/:address" exact render={(props) => {
              if(this.state.contractsLoaded)
                this.loadProfile(props.match.params.address);
              return <User
                loading={this.state.loading}
                account={this.state.account}
                posts={this.state.posts}
                userAddress={props.match.params.address}
                userProfile={this.state.userProfiles[props.match.params.address.toLowerCase()]}
                modifyPost={this.modifyPost}
                tipPost={this.tipPost}
                modifyProfile={this.modifyProfile}
              />;
            }
            }
          />

        </Switch>

      </BrowserRouter>
    );
  }
}

export default App;
