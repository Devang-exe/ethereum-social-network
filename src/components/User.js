import React, {Component} from 'react';
import Identicon from 'identicon.js';
import Post from './Post';
import ProfileModifyForm from './ProfileModifyForm';

class User extends Component {

  render() {

    let calcAge = (birthday) => {
      let day = parseInt(birthday["day"]);
      let month = parseInt(birthday["month"]);
      let year = parseInt(birthday["year"]);

      if(!(day && month && year))
        return "";
      
      else {
        let bDay = new Date(`${year}-${month}-${day}`);
        let ageDifMs = Date.now() - bDay.getTime();
        let ageDate = new Date(ageDifMs);
        let years = Math.abs(ageDate.getUTCFullYear() - 1970);
        return years + " years";
      }
    }

    return (
      <div className="container ml-auto mr-auto" style={{maxWidth: "650px"}}>
        
        <h2>User details</h2>
        <hr />
        {this.props.userProfile ?

          <div id="profile-details" className="container" style={{maxWidth: "600px"}}>
            <div className="mt-4">
              <img
                alt="account-avatar"
                className="mr-3 mb-3"
                width="60"
                height="60"
                src={`data:image/png;base64,${new Identicon(this.props.userAddress, 60).toString()}`}
              />
              <span>{this.props.userAddress}</span>
            </div>

            <div className="mt-4">
              {this.props.userProfile.name
              ? <span className="h6">{this.props.userProfile.name}</span>
              : <span></span>
              }
              {this.props.userProfile.gender
              ? <span className="h6 float-right ml-2">
                  {this.props.userProfile.gender}
                </span>
              : <span></span>
              }
              {this.props.userProfile.birthday
              ? <span className="h6 float-right mr-2">
                  {calcAge( {...this.props.userProfile.birthday} )}
                </span>
              : <span></span>
              }
            </div>

            <div className="mt-4">
              <label className="mr-2">Display Name:</label>
              {this.props.userProfile.displayName
              ? <span className="text-primary">{this.props.userProfile.displayName}</span>
              : <span className="text-secondary">(Not available)</span>
              }
            </div>

            <div className="mt-1">
              <label className="mr-2">Email:</label>
              {this.props.userProfile.email
              ? <span className="text-primary">{this.props.userProfile.email}</span>
              : <span className="text-secondary">(Not available)</span>
              }
            </div>

            <div className="mt-2">
              <label className="mr-2"><u>Profession</u></label>
              {this.props.userProfile.profession
              ? <p className="text-dark">{this.props.userProfile.profession}</p>
              : <p className="text-secondary">(Not available)</p>
              }
            </div>

            <div className="mt-2">
              <label className="mr-2"><u>About</u></label>
              {this.props.userProfile.about
              ? <p className="text-dark">{this.props.userProfile.about}</p>
              : <p className="text-secondary">(Not available)</p>
              }
            </div>

            {this.props.userAddress.toLowerCase() === this.props.account.toLowerCase()
            ? <div className="mt-4">
                <ProfileModifyForm
                  userAddress={this.props.userAddress}
                  profileData={this.props.userProfile}
                  modifyProfile={this.props.modifyProfile}
                />
                <br />
                <br />
              </div> 
            : <span></span>
            }
          </div>

          : <div id="profile-loader" className="text-center mt-4 mb-4"><p>Loading...</p></div>
        }

        <br />
        <h2>Recent posts</h2>
        <hr />
        {this.props.loading ?
          <div id="posts-loader" className="text-center mt-5"><p>Loading...</p></div> :

          <div id="recent-posts" className="mb-5">
          { Object.values(this.props.posts)
            .filter((post) => post["author"].toLowerCase() === this.props.userAddress.toLowerCase())
            .sort((a,b) => b["timestamp"] - a["timestamp"])
            .map((post, key) => {
                return(
                  <Post
                    account={this.props.account}
                    post={post}
                    key={key}
                    username={this.props.userProfile["displayName"]}
                    modifyPost={this.props.modifyPost}
                    tipPost={this.props.tipPost}
                  />
                );
            })
          }
          </div>
        }

      </div>
    );
  }
}

export default User;
