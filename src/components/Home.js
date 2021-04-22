import React, {Component} from 'react';
import PostCreateForm from './PostCreateForm';
import Post from './Post';

class Home extends Component {

  render() {
    return (
      <>
        { this.props.loading ?

          <div id="loader" className="text-center mt-5"><p>Loading...</p></div> :

          <div>
            <PostCreateForm createPost={this.props.createPost} />

            { Object.values(this.props.posts)
              .sort((a,b) => b["tip"] - a["tip"])
              .map((post, key) => {
                return(<Post
                        account={this.props.account}
                        post={post}
                        key={key}
                        username={this.props.userProfiles[post["author"].toLowerCase()]["displayName"]}
                        modifyPost={this.props.modifyPost}
                        tipPost={this.props.tipPost}
                      />
                    )
                })
            }
          </div>
        }
      </>
    );
  }
}

export default Home;
