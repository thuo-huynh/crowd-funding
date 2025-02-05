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

    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;
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
     * @param _owner The owner of the campaign.
     * @param _title The title of the campaign.
     * @param _description A description of the campaign.
     * @param _target The target amount to raise for the campaign.
     * @param _deadline The deadline (timestamp) for the campaign.
     * @param _image The image associated with the campaign.
     * @return The campaign ID.
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

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    /**
     * @dev Allows users to donate to a campaign with ERC20 tokens.
     * @param _campaignId The ID of the campaign to donate to.
     * @param _amount The amount of ERC20 tokens to donate.
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

        token.safeTransfer(campaign.owner, _amount);
    }

    /**
     * @dev Returns the list of donators and their donations for a specific campaign.
     * @param _campaignId The ID of the campaign.
     * @return The donators and their donations.
     */
    function getDonators(uint256 _campaignId) public view returns (address[] memory, uint256[] memory) {
        require(_campaignId < numberOfCampaigns, "Invalid campaign ID");
        return (campaigns[_campaignId].donators, campaigns[_campaignId].donations);
    }

    /**
     * @dev Returns a list of all campaigns.
     * @return A list of all campaigns.
     */
    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }

        return allCampaigns;
    }
}
