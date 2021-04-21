// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

contract UsersProfileManager {

    struct Birthday {
        uint8 day;
        uint8 month;
        uint16 year;
    }

    struct Profile {
        string displayName;
        string name;
        Birthday birthday;
        string gender;
        string profession;
        string about;
    }

    mapping(address => Profile) public profiles;

    function setProfile(
        address _user,
        string memory _displayName,
        string memory _name,
        uint8 _day,
        uint8 _month,
        uint16 _year,
        string memory _gender,
        string memory _profession,
        string memory _about)
    public {
        
        require(msg.sender == _user, "You can't edit other's profile.");

        Profile memory _profile = Profile(
            _displayName,
            _name,
            Birthday(_day, _month, _year),
            _gender,
            _profession,
            _about);
        profiles[_user] = _profile;
    }
}
