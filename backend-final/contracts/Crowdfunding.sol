//SPDX-License-Identifier:UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import './Project.sol';

contract Crowdfunding {
    using SafeMath for uint256;

    // List of existing projects
    Project[] private allProjects;

    // Event that will be emitted whenever a new project is started
    event ProjectStarted(
        address contractAddress,
        address projectStarter,
        string projectTitle,
        string projectDesc,
        uint256 deadline,
        uint256 goalAmount
    );

    function startProject(
        string calldata title,
        string calldata description,
        uint durationInDays,
        uint amountToRaise
    ) external {
        uint raiseUntil = block.timestamp.add(durationInDays.mul(1 days));
        Project newProject = new Project(payable(msg.sender), title, description, raiseUntil, amountToRaise);
        allProjects.push(newProject);
        emit ProjectStarted(
            address(newProject),
            msg.sender,
            title,
            description,
            raiseUntil,
            amountToRaise
        );
    }                                                                                                                                   

    function returnAllProjects() external view returns(Project[] memory){
        return allProjects;
    }
}