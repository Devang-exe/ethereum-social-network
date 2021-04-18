import React, {Component} from 'react';

class PostModifyForm extends Component {

  render() {
    return (
      <div>
        <button className="btn btn-danger btn-sm float-right mr-3"
          data-bs-toggle="modal"
          data-bs-target="#editingModal">
        Edit
        </button>

        <div className="modal fade" id="editingModal" tabIndex="-1" aria-labelledby="editingModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editingModalLabel">Modify Your Post</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <input
                  id="postContent"
                  ref={(input) => {this.newPostContent = input}}
                  className="form-control"
                  value={this.props.post.content}
                  required />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary"
                  onClick={() => {
                    this.props.modifyPost(this.props.post.postId, this.newPostContent);
                  }}  
                >Modify Post</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostModifyForm;
