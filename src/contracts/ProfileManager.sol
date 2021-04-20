// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

contract UsersProfileManager {

    struct Profile {
        string name;
        uint8 age;
        string gender;
        string profession;
        string about;
    }

    mapping(address => Profile) public profiles;

    function setProfile(
        address _user,
        string memory _name,
        uint8 _age,
        string memory _gender,
        string memory _profession,
        string memory _about)
    public {
        
        require(msg.sender == _user, "You can't edit others' profile.");

        Profile memory _profile = Profile(
            _name,
            _age,
            _gender,
            _profession,
            _about);
        profiles[_user] = _profile;
    }
}
