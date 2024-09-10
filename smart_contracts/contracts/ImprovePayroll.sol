// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ImprovePayroll is Ownable {
    struct BusinessEntity {
        address entityAddress;
        string entityName;
        uint256 treasury;
        bool isRegistered;
    }

    struct Freelancer {
        address freelancerAddress;
        address entityAddress;
        uint256 dailyRateWei;
        uint256 daysWorked;
        string projectDescription;
        bool isRegistered;
    }

    mapping(address => BusinessEntity) public businessEntities;
    mapping(address => Freelancer) public freelancers;
    mapping(address => IERC20) public acceptedTokens;

    uint256 public platformFeePercentage = 1; // 1% platform fee
    uint256 public constant MAX_FEE_PERCENTAGE = 5; // 5% max fee

    event BusinessEntityAdded(address indexed entityAddress, string entityName);
    event BusinessEntityFunded(address indexed entityAddress, uint256 amount, address tokenAddress);
    event FreelancerAdded(address indexed freelancerAddress, address indexed entityAddress, uint256 dailyRateWei, string projectDescription);
    event DaysWorkedUpdated(address indexed freelancerAddress, uint256 daysWorked);
    event PayoutMade(address indexed freelancerAddress, uint256 amount, address tokenAddress);
    event TokenAdded(address tokenAddress);
    event TokenRemoved(address tokenAddress);
    event PlatformFeeUpdated(uint256 newFeePercentage);


    constructor(address initialOwner) Ownable(initialOwner) {
       
    }

    modifier onlyRegisteredEntity() {
        require(businessEntities[msg.sender].isRegistered, "Not a registered business entity");
        _;
    }

    modifier onlyRegisteredFreelancer() {
        require(freelancers[msg.sender].isRegistered, "Not a registered freelancer");
        _;
    }

    function addBusinessEntity(string memory _entityName) public {
        require(!businessEntities[msg.sender].isRegistered, "Entity already registered");
        businessEntities[msg.sender] = BusinessEntity({
            entityAddress: msg.sender,
            entityName: _entityName,
            treasury: 0,
            isRegistered: true
        });
        emit BusinessEntityAdded(msg.sender, _entityName);
    }

    function fundBusinessEntity(uint256 _amount, address _tokenAddress) public onlyRegisteredEntity {
        require(acceptedTokens[_tokenAddress] != IERC20(address(0)), "Token not accepted");
        require(acceptedTokens[_tokenAddress].transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        BusinessEntity storage entity = businessEntities[msg.sender];
        entity.treasury += _amount;
        emit BusinessEntityFunded(msg.sender, _amount, _tokenAddress);
    }

    function addFreelancer(address _freelancerAddress, uint256 _dailyRateWei, string memory _projectDescription) public onlyRegisteredEntity {
        require(!freelancers[_freelancerAddress].isRegistered, "Freelancer already registered");
        freelancers[_freelancerAddress] = Freelancer({
            freelancerAddress: _freelancerAddress,
            entityAddress: msg.sender,
            dailyRateWei: _dailyRateWei,
            daysWorked: 0,
            projectDescription: _projectDescription,
            isRegistered: true
        });
        emit FreelancerAdded(_freelancerAddress, msg.sender, _dailyRateWei, _projectDescription);
    }

    function updateDaysWorked(uint256 _daysWorked) public onlyRegisteredFreelancer {
        Freelancer storage freelancer = freelancers[msg.sender];
        freelancer.daysWorked = _daysWorked;
        emit DaysWorkedUpdated(msg.sender, _daysWorked);
    }

    function payout(address _tokenAddress) public onlyRegisteredFreelancer {
        Freelancer storage freelancer = freelancers[msg.sender];
        BusinessEntity storage entity = businessEntities[freelancer.entityAddress];

        uint256 payoutAmount = freelancer.daysWorked * freelancer.dailyRateWei;
        uint256 platformFee = (payoutAmount * platformFeePercentage) / 100;
        uint256 finalPayoutAmount = payoutAmount - platformFee;

        require(entity.treasury >= payoutAmount, "Insufficient funds in business entity treasury");
        require(acceptedTokens[_tokenAddress] != IERC20(address(0)), "Token not accepted");

        freelancer.daysWorked = 0;
        entity.treasury -= payoutAmount;

        require(acceptedTokens[_tokenAddress].transfer(freelancer.freelancerAddress, finalPayoutAmount), "Transfer to freelancer failed");
        require(acceptedTokens[_tokenAddress].transfer(owner(), platformFee), "Transfer of platform fee failed");

        emit PayoutMade(msg.sender, finalPayoutAmount, _tokenAddress);
    }

    function addAcceptedToken(address _tokenAddress) public onlyOwner {
        acceptedTokens[_tokenAddress] = IERC20(_tokenAddress);
        emit TokenAdded(_tokenAddress);
    }

    function removeAcceptedToken(address _tokenAddress) public onlyOwner {
        delete acceptedTokens[_tokenAddress];
        emit TokenRemoved(_tokenAddress);
    }

    function updatePlatformFee(uint256 _newFeePercentage) public onlyOwner {
        require(_newFeePercentage <= MAX_FEE_PERCENTAGE, "Fee percentage too high");
        platformFeePercentage = _newFeePercentage;
        emit PlatformFeeUpdated(_newFeePercentage);
    }

    // Function to get the details of a business entity
    function getBusinessEntity(address entityAddress) public view returns (BusinessEntity memory) {
        return businessEntities[entityAddress];
    }

    // Function to get the details of a freelancer
    function getFreelancer(address freelancerAddress) public view returns (Freelancer memory) {
        return freelancers[freelancerAddress];
    }
}