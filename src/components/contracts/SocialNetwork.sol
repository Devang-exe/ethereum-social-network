// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

contract SocialNetwork {

    struct Post {
        uint postId;
        string content;
        address author;
        uint timestamp;
        uint tip;
    }

    mapping (uint => Post) public posts;

    uint public postCount;

    event PostCreated(
        uint postId,
        string content,
        address author
    );

    event PostModified(
        uint postId,
        string oldContent,
        string newContent,
        address author
    );

    event PostTipped(
        uint postId,
        string content,
        address author,
        address tipper,
        uint tipAmount
    );

    modifier postIsValid(uint postId) {
        require(postId > 0 && postId <= postCount, "Invalid post ID");
        _;
    }

    modifier onlyAuthor(uint postId) {
        require(msg.sender == posts[postId].author, "You are not the creator of the post");
        _;
    }

    modifier postNotEmpty(string memory _content) {
        require(bytes(_content).length > 0, "Empty posts are not allowed");
        _;
    }

    function createPost(string memory _postContent) public postNotEmpty(_postContent) {
        Post memory _newPost = Post(++postCount, _postContent, msg.sender, block.timestamp, 0);
        posts[postCount] = _newPost;

        emit PostCreated(_newPost.postId, _newPost.content, _newPost.author);
    }

    function modifyPost(uint _postId, string memory _postContent)
    public
    postIsValid(_postId)
    onlyAuthor(_postId)
    postNotEmpty(_postContent) {

        Post memory _post = posts[_postId];
        string memory _oldContent = _post.content;
        _post.content = _postContent;
        _post.timestamp = block.timestamp;
        _post.tip = 0;
        posts[_postId] = _post;

        emit PostModified(_postId, _oldContent, _postContent, msg.sender);
    }

    function tipPost(uint _postId) public payable postIsValid(_postId) {

        Post memory _post = posts[_postId];
        _post.tip += msg.value;
        payable(_post.author).transfer(msg.value);
        posts[_postId] = _post;

        emit PostTipped(_postId, _post.content, _post.author, msg.sender, msg.value);
    }

}
