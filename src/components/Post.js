import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Identicon from 'identicon.js';
import PostModifyForm from './PostModifyForm';

class Post extends Component {

  calcTime(time) {
    if(time.length === 10)
      time += "000";
    return new Date(Number(time)).toString();
  }

  render() {
    return (
      <div className="container">
<div className="card ml-auto mr-auto mt-4 mb-4" style={{maxWidth: "500px"}}>

<div className="card-header">

  <img
    alt="account-avatar"
    className="mr-2"
    width="30"
    height="30"
    src={`data:image/png;base64,${new Identicon(this.props.post.author, 30).toString()}`}
  />

  {this.props.username ?
    <span><Link to={`/user/${this.props.post.author}`}>{this.props.username}</Link></span>
    :
    <small><Link to={`/user/${this.props.post.author}`}>{this.props.post.author}</Link></small>
  }

</div>

<div className="card-body">

  <p className="card-text">{this.props.post.content}</p>
  <br />
  <hr />
  <small className="text-muted">Last updated: {this.calcTime(this.props.post.timestamp)}</small>

</div>

<div className="card-footer">

  <small className="float-left mt-1 text-muted">
    TIPS: {window.web3.utils.fromWei(this.props.post.tip, "ether")} ETH
  </small>

  <button className="btn btn-primary btn-sm float-right"
    onClick={() => {
      let postId = this.props.post.postId;
      let tipAmt = window.web3.utils.toWei("0.001", "ether");
      this.props.tipPost(postId, tipAmt);
    }}
  >
    Tip 0.001 ETH
  </button>

  {this.props.post.author.toLowerCase() === this.props.account.toLowerCase() ?
    <PostModifyForm post={this.props.post} modifyPost={this.props.modifyPost} /> :
    <span></span>
  }

</div>

</div>
      </div>
      
    );
  }
}

export default Post;
