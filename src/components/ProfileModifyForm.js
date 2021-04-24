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
      let date = new Date(this.dob.value);
      let dd = date.getDate();
      let mm = date.getMonth() + 1;
      let yyyy = date.getFullYear();

      if(!dd) dd = 0;
      if(!mm) mm = 0;
      if(!yyyy) yyyy = 0;

      this.props.modifyProfile(
        this.props.userAddress,
        this.displayName.value,
        this.name.value,
        dd, mm, yyyy,
        this.gender.value,
        this.email.value,
        this.profession.value,
        this.about.value
      );

      handleClose();
    }

    let setMaxDate = () => {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth()+1;
      let yyyy = today.getFullYear();
      if(dd<10) dd="0"+dd;
      if(mm<10) mm="0"+mm;
      return `${yyyy}-${mm}-${dd}`;
    }

    let getDefaultDob = () => {
      let dd = this.props.profileData.birthday.day;
      let mm = this.props.profileData.birthday.month;
      let yyyy = this.props.profileData.birthday.year;

      if(!(dd && mm && yyyy))
        return "";
      
      if(dd<10) dd="0"+dd;
      if(mm<10) mm="0"+mm;
      return `${yyyy}-${mm}-${dd}`;
    }

    return (
      <div>
        <button className="btn btn-danger float-right"
          onClick={handleOpen}>
        Edit Profile
        </button>

        <Modal size="lg" scrollable show={this.state.open} onHide={handleClose}>

          <Modal.Header closeButton>
            <Modal.Title>Edit your profile</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form id="profileModifyForm" onSubmit={(event) => {
                event.preventDefault();
                saveAndClose();
              }}
            >
              <small className="form-text text-secondary">
                You can leave a field empty if you don't want to share that specific information
              </small>

              <div className="form-group">
                <label>Name</label>
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  defaultValue={this.props.profileData.name}
                  ref={(input) => {this.name = input}}
                />
              </div>

              <div className="form-group">
                <label>Display name (to be displayed on top of posts)</label>
                <input
                  id="display-name"
                  type="text"
                  className="form-control"
                  defaultValue={this.props.profileData.displayName}
                  ref={(input) => {this.displayName = input}}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  defaultValue={this.props.profileData.email}
                  ref={(input) => {this.email = input}}
                />
              </div>

              <div className="form-group">
                <label>Date of birth</label>
                <input
                  id="dob"
                  type="date"
                  className="form-control"
                  defaultValue={getDefaultDob()}
                  min="1900-01-01"
                  max={setMaxDate()}
                  ref={(input) => {this.dob = input}}
                />
                <button type="button" className="btn btn-secondary btn-sm mt-2"
                  onClick={() => {document.querySelector("#dob").value = ""}}>
                    Clear
                </button>
              </div>

              <div className="form-group">
                <label>Gender</label>
                <input
                  id="gender"
                  type="text"
                  className="form-control"
                  defaultValue={this.props.profileData.gender}
                  ref={(input) => {this.gender = input}}
                />
              </div>

              <div className="form-group">
                <label>Profession</label>
                <input
                  id="profession"
                  type="text"
                  className="form-control"
                  defaultValue={this.props.profileData.profession}
                  ref={(input) => {this.profession = input}}
                />
              </div>

              <div className="form-group">
                <label>About</label>
                <input
                  id="about"
                  type="text"
                  className="form-control"
                  defaultValue={this.props.profileData.about}
                  ref={(input) => {this.about = input}}
                />
              </div>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
            <button type="submit" form="profileModifyForm" className="btn btn-primary">Save</button>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }
}

export default ProfileModifyForm;
