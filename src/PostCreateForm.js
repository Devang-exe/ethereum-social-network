import React, {Component} from 'react';

class PostCreateForm extends Component {

  render() {
    return (
      <div className="container ml-auto mr-auto mt-5 mb-5" style={{maxWidth: "500px"}}>
        <br />
        <form onSubmit={(event) => {
                  event.preventDefault();
                  this.props.createPost(this.postContent.value);
                }}>
          <input
            id="postContent"
            ref={(input) => {this.postContent = input}}
            className="form-control"
            placeholder="What's on your mind?"
            required />
          <button type="submit" className="btn btn-primary btn-block mt-3">Share</button>
        </form>
        <br />
      </div>
    );
  }
}

export default PostCreateForm;
