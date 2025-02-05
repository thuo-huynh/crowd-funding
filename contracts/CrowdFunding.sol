// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import OpenZeppelin utilities
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title CrowdFunding
 * @dev A crowdfunding contract using ERC20 tokens.
 */
contract CrowdFunding is ReentrancyGuard {
    using SafeERC20 for IERC20;

    event CampaignCreated(uint256 indexed campaignId, address indexed owner, string title, uint256 target, uint256 deadline);
    event DonationReceived(uint256 indexed campaignId, address indexed donor, uint256 amount);
    event FundsWithdrawn(uint256 indexed campaignId, address indexed owner, uint256 amount);
    event RefundIssued(uint256 indexed campaignId, address indexed donor, uint256 amount);

    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        bool fundsWithdrawn;
        bool refunded;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => uint256)) public donations;
    uint256 public numberOfCampaigns = 0;
    IERC20 public token;

    /**
     * @dev Constructor to set the ERC20 token used for donations.
     * @param _token Address of the ERC20 token.
     */
    constructor(address _token) {
        require(_token != address(0), "Invalid token address");
        token = IERC20(_token);
    }

    /**
     * @dev Creates a new crowdfunding campaign.
     */
    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        require(_owner != address(0), "Invalid owner address");
        require(_target > 0, "Target must be greater than 0");
        require(_deadline > block.timestamp, "The deadline should be a date in the future.");

        Campaign storage campaign = campaigns[numberOfCampaigns];
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.fundsWithdrawn = false;
        campaign.refunded = false;

        emit CampaignCreated(numberOfCampaigns, _owner, _title, _target, _deadline);

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    /**
     * @dev Allows users to donate to a campaign with ERC20 tokens.
     */
    function donateToCampaign(uint256 _campaignId, uint256 _amount) public nonReentrant {
        require(_campaignId < numberOfCampaigns, "Invalid campaign ID");
        require(_amount > 0, "Donation amount must be greater than 0");

        Campaign storage campaign = campaigns[_campaignId];
        require(block.timestamp < campaign.deadline, "Campaign has ended");

        token.safeTransferFrom(msg.sender, address(this), _amount);

        campaign.donators.push(msg.sender);
        campaign.donations.push(_amount);
        campaign.amountCollected += _amount;
        donations[_campaignId][msg.sender] += _amount;

        emit DonationReceived(_campaignId, msg.sender, _amount);
    }

    /**
     * @dev Allows the campaign owner to withdraw funds if the target is met.
     */
    function withdrawFunds(uint256 _campaignId) public nonReentrant {
        require(_campaignId < numberOfCampaigns, "Invalid campaign ID");
        Campaign storage campaign = campaigns[_campaignId];

        require(msg.sender == campaign.owner, "Only campaign owner can withdraw");
        require(block.timestamp > campaign.deadline, "Campaign deadline not reached");
        require(campaign.amountCollected >= campaign.target, "Target not met");
        require(!campaign.fundsWithdrawn, "Funds already withdrawn");

        campaign.fundsWithdrawn = true;

        token.safeTransfer(campaign.owner, campaign.amountCollected);
        emit FundsWithdrawn(_campaignId, campaign.owner, campaign.amountCollected);
    }

    /**
     * @dev Allows donors to claim a refund if the campaign fails.
     */
    function refund(uint256 _campaignId) public nonReentrant {
        require(_campaignId < numberOfCampaigns, "Invalid campaign ID");
        Campaign storage campaign = campaigns[_campaignId];

        require(block.timestamp > campaign.deadline, "Campaign still active");
        require(campaign.amountCollected < campaign.target, "Target was met");
        require(!campaign.refunded, "Refunds already processed");

        uint256 donatedAmount = donations[_campaignId][msg.sender];
        require(donatedAmount > 0, "No donations to refund");

        // Reset donation record before sending refund
        donations[_campaignId][msg.sender] = 0;
        token.safeTransfer(msg.sender, donatedAmount);

        emit RefundIssued(_campaignId, msg.sender, donatedAmount);
    }

    /**
     * @dev Returns the list of donators and their donations for a specific campaign.
     */
    function getDonators(uint256 _campaignId) public view returns (address[] memory, uint256[] memory) {
        require(_campaignId < numberOfCampaigns, "Invalid campaign ID");
        return (campaigns[_campaignId].donators, campaigns[_campaignId].donations);
    }

    /**
     * @dev Returns details of a specific campaign.
     */
    function getCampaignDetails(uint256 _campaignId) public view returns (
        address owner,
        string memory title,
        string memory description,
        uint256 target,
        uint256 deadline,
        uint256 amountCollected,
        string memory image,
        bool fundsWithdrawn,
        bool refunded
    ) {
        require(_campaignId < numberOfCampaigns, "Invalid campaign ID");

        Campaign storage campaign = campaigns[_campaignId];

        return (
            campaign.owner,
            campaign.title,
            campaign.description,
            campaign.target,
            campaign.deadline,
            campaign.amountCollected,
            campaign.image,
            campaign.fundsWithdrawn,
            campaign.refunded
        );
    }

    /**
     * @dev Returns a list of all campaigns.
     */
    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }

        return allCampaigns;
    }
}
