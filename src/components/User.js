import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Identicon from 'identicon.js';

class User extends Component {

  render() {
    return (
      <>
        {this.props.loading ?
        
          <div id="loader" className="text-center mt-5"><p>Loading...</p></div> :

          <>
          {this.props.userProfile ?

            <div id="profile" className="ml-auto mr-auto mt-5" style={{maxWidth: "650px"}}>

              <div id="profile-info">
                <div id="profile-info-top-heading">
                  <img
                    alt="account-avatar"
                    className="ml-2"
                    width="60"
                    height="60"
                    src={`data:image/png;base64,${new Identicon(this.props.userAddress, 60).toString()}`}
                  />
                </div>

              </div>

              <div id="recent-activities">

              </div>
            </div> :

            <div id="no-profile" className="text-center ml-auto mr-auto mt-5" style={{maxWidth: "650px"}}>
              <br />
              <h2 className="text-center">Profile Not Available :(</h2>
              <br />
              <h5 className="text-center">Go to <Link to="/">Homepage</Link></h5>
            </div>

          }
            
          </>
        }

        {/* <h1>User's Profile page</h1>

        {this.props.userProfile ?
          
          (this.props.userProfile.displayName ?
              <p>{this.props.userProfile.displayName}</p>
              :
              <p>{this.props.userAddress}</p>
          )
          :
          <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
        } */}
      </>
    );
  }
}

export default User;
