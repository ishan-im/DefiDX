const erc20ABI = ["function decimals() public view returns (uint8)"];
// it will return the address of the liquidity pool contract
const factoryABI = ["function getPair(address tokenA, address tokenB) external view returns (address pair)"];

const pairABI = [
    "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
    "function token0() external view returns (address)",
    "function token1() external view returns (address)"
]

const routerABI = [
    "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)"
]

module.exports = {
    erc20ABI,
    factoryABI,
    pairABI,
    routerABI
}