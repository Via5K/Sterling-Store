// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

contract Voting {
    mapping(string => uint256) private voteCount; //this will count the product and its vote!
    mapping(address => string) public votedFor; //this will keep the record of which person voted for what!
    mapping(address => bool) public hasVoted; //if the person has voted or not?
    mapping(string => uint256) public pastWinners; //this will contain the list of all the past voting results.

    string[] participants;

    // modifier eligible(address _from) {
    //     require(_from);
    //     _;
    // }
    modifier validVote(address _from) {
        require(hasVoted[_from] == false, "You have already Voted!!");
        _;
    }

    // Add the items that you want voting on or options for voting.
    function addParticipants(string memory _contestant) private {
        participants.push(_contestant);
    }

    function addVoteCount(string memory _item, address _from)
        public
        validVote(_from)
        returns (bool)
    {
        votedFor[_from] = _item;
        voteCount[_item] += 1;
        hasVoted[_from] = true;
        return true;
    }

    // this will send the result and how many votes it recieved...
    function checkResult() private returns (string memory, uint256) {
        uint256 ans = 0;
        string memory winner = "";
        for (uint256 i = 0; i < participants.length; i++) {
            if (ans < voteCount[participants[i]]) {
                ans = voteCount[participants[i]];
                winner = participants[i];
            }
        }
        // this makes sure that party with no name does not get entereed in the map.
        if (
            keccak256(abi.encodePacked(winner)) ==
            keccak256(abi.encodePacked(""))
        ) {
            return (winner, ans);
        }
        pastWinners[winner] = ans; //update in past winners.
        return (winner, ans);
    }
}
