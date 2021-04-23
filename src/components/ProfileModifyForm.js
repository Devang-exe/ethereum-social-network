import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';

class ProfileModifyForm extends Component {

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
      // this.props.modifyPost(this.props.post.postId, this.newPostContent.value);
      handleClose();
    }

    return (
      <div>
        <button className="btn btn-danger float-right"
          onClick={handleOpen}>
        Edit Profile
        </button>

        <Modal show={this.state.open} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit your profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <input
            id="Name"
            ref={(input) => {this.name = input}}
            // defaultValue={this.props.post.content}
            required />
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
            <button type="button" className="btn btn-primary"
              onClick={saveAndClose}>Save</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ProfileModifyForm;
