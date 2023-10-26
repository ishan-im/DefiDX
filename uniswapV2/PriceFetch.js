const ethers = require('ethers');

const {
	routerAddress,
	factoryAddress,
	fromAddress,
	toAddress,
} = require('./AddressList.js');

const { erc20ABI, factoryABI, pairABI, routerABI } = require('./AbiInfo.js');


const provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/8LnblEI1j7KhAQ1kNC8IkZzi9lR-2nLg");

const factoryInstance = new ethers.Contract(factoryAddress, factoryABI, provider);

const routerInstance = new ethers.Contract(routerAddress, routerABI, provider);

const priceFetch = async (humanFormat) => {

	const token1 = new ethers.Contract(fromAddress, erc20ABI, provider);

	const token2 = new ethers.Contract(toAddress, erc20ABI, provider);

	const decimal1 = await token1.decimals();

	const decimal2 = await token2.decimals();

	const amountIn = ethers.utils.parseUnits(humanFormat, decimal1).toString();

	const amountOut = await routerInstance.getAmountsOut(amountIn, [fromAddress, toAddress]);

	const humanOutput = ethers.utils.formatUnits(amountOut[1].toString(), decimal2);

	console.log(`Price of ${humanFormat} ${fromAddress} or WETH is ${humanOutput} ${toAddress} or DAI`);

}

priceFetch("1")

