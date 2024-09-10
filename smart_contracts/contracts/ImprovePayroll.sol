// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract ImprovePayroll {
    struct BusinessEntity {
        address entityAddress;
        string entityName;
        uint256 treasury;
    }

    struct Freelancer {
        address freelancerAddress;
        address entityAddress;
        uint256 dailyRateWei;
        uint256 daysWorked;
        string projectDescription;
    }

    mapping(address => BusinessEntity) public businessEntities;
    mapping(address => Freelancer) public freelancers;

    event BusinessEntityAdded(address indexed entityAddress, string entityName);
    event BusinessEntityFunded(address indexed entityAddress, uint256 amount);
    event FreelancerAdded(address indexed freelancerAddress, address indexed entityAddress, uint256 dailyRateWei, string projectDescription);
    event DaysWorkedUpdated(address indexed freelancerAddress, uint256 daysWorked);
    event PayoutMade(address indexed freelancerAddress, uint256 amount);

    function addBusinessEntity(string memory _entityName) public {
        businessEntities[msg.sender] = BusinessEntity({
            entityAddress: msg.sender,
            entityName: _entityName,
            treasury: 0
        });
        emit BusinessEntityAdded(msg.sender, _entityName);
    }

    function fundBusinessEntity() public payable {
        BusinessEntity storage entity = businessEntities[msg.sender];
        entity.treasury += msg.value;
        emit BusinessEntityFunded(msg.sender, msg.value);
    }

    function addFreelancer(address _freelancerAddress, uint256 _dailyRateWei, string memory _projectDescription) public {
        freelancers[_freelancerAddress] = Freelancer({
            freelancerAddress: _freelancerAddress,
            entityAddress: msg.sender,
            dailyRateWei: _dailyRateWei,
            daysWorked: 0,
            projectDescription: _projectDescription
        });
        emit FreelancerAdded(_freelancerAddress, msg.sender, _dailyRateWei, _projectDescription);
    }

    function updateDaysWorked(address _freelancerAddress, uint256 _daysWorked) public {
        Freelancer storage freelancer = freelancers[_freelancerAddress];
        freelancer.daysWorked = _daysWorked;
        emit DaysWorkedUpdated(_freelancerAddress, _daysWorked);
    }

    function payout(address _freelancerAddress) public {
        Freelancer storage freelancer = freelancers[_freelancerAddress];
        BusinessEntity storage entity = businessEntities[freelancer.entityAddress];

        uint256 payoutAmount = freelancer.daysWorked * freelancer.dailyRateWei;

        require(entity.treasury >= payoutAmount, "Insufficient funds in business entity treasury");
        require(address(this).balance >= payoutAmount, "Insufficient ETH balance in contract");

        freelancer.daysWorked = 0;
        entity.treasury -= payoutAmount;
        payable(freelancer.freelancerAddress).transfer(payoutAmount);
        emit PayoutMade(_freelancerAddress, payoutAmount);
    }

    // Add receive function to accept Ether
    receive() external payable {}

    // Function to get the details of a business entity
    function getBusinessEntity(address entityAddress) public view returns (BusinessEntity memory) {
        return businessEntities[entityAddress];
    }

    // Function to get the details of a freelancer
    function getFreelancer(address freelancerAddress) public view returns (Freelancer memory) {
        return freelancers[freelancerAddress];
    }
}