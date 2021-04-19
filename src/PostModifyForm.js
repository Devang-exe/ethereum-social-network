import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';

class PostModifyForm extends Component {

  constructor(props) {
		super(props);
		this.state = {open: false};
	}

  render() {

    let handleOpen = () => {
      this.setState({open: true});
    }

    let handleClose = () => {
      this.setState({open: false});
    }

    let saveAndClose = () => {
      this.props.modifyPost(this.props.post.postId, this.newPostContent.value);
      handleClose();
    }

    return (
      <div>
        <button className="btn btn-danger btn-sm float-right mr-3"
          onClick={handleOpen}>
        Edit
        </button>

        <Modal show={this.state.open} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modify your post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <input
            id="postContent"
            ref={(input) => {this.newPostContent = input}}
            className="form-control"
            defaultValue={this.props.post.content}
            required />
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
            <button type="button" className="btn btn-primary"
              onClick={saveAndClose}>Modify Post</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default PostModifyForm;
