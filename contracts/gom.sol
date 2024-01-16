// SPDX-License-Identifier: MIT

//      ##
//   ########   ######    #######  ##     ## 
//  ##  ##  ## ##    ##  ##     ## ###   ### 
//  ##  ##     ##        ##     ## #### #### 
//   ########  ##   #### ##     ## ## ### ## 
//      ##  ## ##    ##  ##     ## ##     ## 
//  ##  ##  ## ##    ##  ##     ## ##     ## 
//   ########   ######    #######  ##     ## 
//      ##




pragma solidity ^0.8.20;



import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract GOM is ERC20, Ownable(msg.sender) {
    // Added state variable for restricting GOMs
    // MAXBUY prevents any wallet receiving more than 1%  of GOM in early trading.
    bool public MAXBUY = true;
    uint256 public constant packSize = 1000000 ether;
    address public liquidityPool;

    // Mint the totalSupply (GOM) to the deployer
    constructor() ERC20("BUBBLEGOM", "GOM") {
        _mint(msg.sender, 100000000 ether);
    }

    // Function to take off max buy
    function packSizeOff() external onlyOwner {
        MAXBUY = false;
    }

    // Define the LP address to enable trading!
    function setLiquidityPool(address _liquidityPool) external onlyOwner {
        liquidityPool = _liquidityPool;
    }

    // Override _update function to include max buy logic (previously _beforeTokenTransfer)
    function _update(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        super._update(from, to, amount);
        // If liquidityPool is address(0) we've not yet enabled trading. Liquidity Loading....
        if(liquidityPool == address(0)) {
            require(from == owner() || to == owner(), "Patience - Nobody chewing this GOM yet");
            return;
        }
        // Allow deployer (owner) to send/receive any amount and the liquidityPool to receive any amount.
        // This allows for loading of the LP, and for people to sell tokens into the LP 
        if (MAXBUY && from != owner() && to != liquidityPool) {
            // Require that a receiving wallet will not hold more than 1% of supply after a transfer whilst MAXBUY is on
            require(
                balanceOf(to) <= packSize,
                "You can't chew all this GOM"
            );
        }
    }
    // Renounce the contract and pass ownership to address(0) to lock the contract forever more.
    function renounceTokenOwnership() public onlyOwner {
        renounceOwnership();
    }
}
// $GOM is a meme token with no intrinsic value or expectation of financial return.  The token is for entertainment purposes only.
